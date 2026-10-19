import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

app.use(express.json());

// Initialize Google GenAI
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Ensure database directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface ProjectInquiry {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  company?: string;
  projectType: string;
  estimatedBudget?: string;
  description: string;
  submittedAt: string;
  status: 'RECEIVED' | 'IN_REVIEW' | 'PROPOSAL_GENERATING' | 'DISPATCHED';
}

function loadInquiries(): ProjectInquiry[] {
  if (!fs.existsSync(INQUIRIES_FILE)) {
    const initial: ProjectInquiry[] = [
      {
        id: 'inq_demo_1',
        referenceCode: 'NOIR-8821',
        fullName: 'Alexander Wright',
        email: 'a.wright@vortexcap.io',
        company: 'Vortex Capital',
        projectType: 'AI & Machine Learning',
        estimatedBudget: '$50,000 - $100,000',
        description: 'Need an autonomous market surveillance engine with real-time risk classification and sub-millisecond anomaly detection.',
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'IN_REVIEW',
      },
    ];
    saveInquiries(initial);
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveInquiries(data: ProjectInquiry[]) {
  const tmp = `${INQUIRIES_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmp, INQUIRIES_FILE);
}

// In-memory rate limiting map for contact submissions
const submissionIps = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000 * 5; // 5 minutes
  const limit = 5; // max 5 submissions per 5 minutes

  const timestamps = (submissionIps.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) {
    return false;
  }
  timestamps.push(now);
  submissionIps.set(ip, timestamps);
  return true;
}

// ----------------------------------------------------------------------
// Project Inquiry Endpoints
// ----------------------------------------------------------------------
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({ error: 'Submission rate limit reached. Please wait before transmitting another inquiry.' });
      return;
    }

    const { fullName, email, company, projectType, estimatedBudget, description } = req.body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ error: 'Please provide a valid full name.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please provide a valid corporate or personal email address.' });
      return;
    }

    if (!projectType || typeof projectType !== 'string') {
      res.status(400).json({ error: 'Please select a primary project category.' });
      return;
    }

    if (!description || typeof description !== 'string' || description.trim().length < 15) {
      res.status(400).json({ error: 'Please describe your project scope (minimum 15 characters).' });
      return;
    }

    const inquiries = loadInquiries();
    const hex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const referenceCode = `NOIR-${hex}`;
    const newInquiry: ProjectInquiry = {
      id: 'inq_' + crypto.randomUUID(),
      referenceCode,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : undefined,
      projectType: projectType.trim(),
      estimatedBudget: estimatedBudget || 'Flexible / Discussion',
      description: description.trim(),
      submittedAt: new Date().toISOString(),
      status: 'RECEIVED',
    };

    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    res.status(201).json({
      success: true,
      referenceCode: newInquiry.referenceCode,
      message: 'Transmission received. Our engineering leads will review your architecture specifications within 24 hours.',
    });
  } catch (err: any) {
    console.error('Inquiry error:', err);
    res.status(500).json({ error: 'Internal system fault while recording inquiry. Please retry.' });
  }
});

app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = loadInquiries();
  // Return sanitized view (mask email for privacy in public demo)
  const sanitized = inquiries.map((i) => ({
    referenceCode: i.referenceCode,
    company: i.company || 'Confidential Enterprise',
    projectType: i.projectType,
    submittedAt: i.submittedAt,
    status: i.status,
  }));
  res.json({ inquiries: sanitized });
});

// ----------------------------------------------------------------------
// AI Architectural Consultation Endpoint
// ----------------------------------------------------------------------
app.post('/api/ai/architect', async (req: Request, res: Response) => {
  try {
    const { idea, projectType, targetTimeline, language = 'en' } = req.body;
    if (!idea || typeof idea !== 'string' || idea.trim().length < 5) {
      res.status(400).json({ error: 'Please describe the project idea or problem statement.' });
      return;
    }

    const isArabic = language === 'ar';

    const systemInstruction = `You are NOIR Technologies' Principal Software Architect AI.
Company identity: NOIR Technologies ("WE BUILD WHAT'S NEXT").
We build elite custom software, autonomous AI systems, high-frequency web platforms, and enterprise cloud solutions.
Persona: Authoritative, razor-sharp, technically sophisticated, zero fluff, disciplined, inspired by cyberpunk engineering excellence.
${isArabic ? 'IMPORTANT: Output all textual explanations, overviews, rationale, and deliverables in professional Arabic (العربية الفصحى التقنية)، while keeping standard engineering acronyms and framework names (e.g. Next.js, Rust, PostgreSQL, Docker) in English or transliterated.' : ''}
Evaluate the user's vision and output a structured technical blueprint including:
1. architectureOverview: A 2-sentence executive technical vision.
2. recommendedTechStack: array of 4-6 specific modern technologies with rationale (e.g. Next.js, Rust/Go microservices, PostgreSQL/ClickHouse, Gemini 3.8 Flash, Kubernetes).
3. phaseEstimates: array of 3-4 development phases with durations (e.g. Discovery & Threat Modeling, Core Engine & API, Hardening & Load Testing).
4. keyEngineeringChallenges: array of 2-3 critical risks to solve (e.g. latency, security, concurrency).
5. noirAdvantage: Why NOIR's engineering standard eliminates technical debt for this project.`;

    if (ai) {
      const prompt = `Client Idea: "${idea.trim()}"
Category: ${projectType || 'Software Development / AI'}
Timeline Horizon: ${targetTimeline || 'Standard 8-12 weeks'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              architectureOverview: { type: Type.STRING },
              recommendedTechStack: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    layer: { type: Type.STRING },
                    technology: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                  },
                  required: ['layer', 'technology', 'rationale'],
                },
              },
              phaseEstimates: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    weeks: { type: Type.STRING },
                    deliverables: { type: Type.STRING },
                  },
                  required: ['phase', 'weeks', 'deliverables'],
                },
              },
              keyEngineeringChallenges: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              noirAdvantage: { type: Type.STRING },
            },
            required: [
              'architectureOverview',
              'recommendedTechStack',
              'phaseEstimates',
              'keyEngineeringChallenges',
              'noirAdvantage',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ blueprint: parsed });
      return;
    }

    // Heuristic blueprint fallback if Gemini API key not yet provided
    if (isArabic) {
      res.json({
        blueprint: {
          architectureOverview: `معمارية سحابية أصلية مدفوعة بالأحداث ومصممة لزمن استجابة أقل من 50 مللي ثانية، وتوافرية فائقة، مع تعزيز ذاتي بالذكاء الاصطناعي مخصص لفكرة "${idea.slice(0, 40)}..."`,
          recommendedTechStack: [
            {
              layer: 'الواجهة والحافة السحابية',
              technology: 'React 19 + TypeScript + Vite / Next.js',
              rationale: 'سرعة تصيير لا تقبل المساومة، وتنميط كود صارم، وانعدام تام لأي ترهل برمجي.',
            },
            {
              layer: 'طبقة المعالجة والواجهات البرمجية',
              technology: 'Node.js / Go Microservices + gRPC',
              rationale: 'إنتاجية تزامنية فائقة السرعة مع استهلاك ذاكرة دقيق ومحسوب.',
            },
            {
              layer: 'محرك الذكاء الاصطناعي',
              technology: 'Gemini 3.8 Flash SDK + Structured Schemas',
              rationale: 'أعلى سرعات استدلال عالمية ومخرجات بيانات محكمة وخالية من الهلوسة.',
            },
            {
              layer: 'التخزين المستدام والذاكرة المؤقتة',
              technology: 'PostgreSQL (Prisma ORM) + Redis Cluster',
              rationale: 'ضمانات عمليات ACID مصرفية وتخزين مؤقت فائق في أجزاء من المللي ثانية.',
            },
          ],
          phaseEstimates: [
            {
              phase: 'المرحلة 01: المعمارية ونمذجة التهديدات',
              weeks: 'أسبوعان',
              deliverables: 'مخططات النظام، وموازنات زمن الاستجابة، وتدقيق المحيط الأمني.',
            },
            {
              phase: 'المرحلة 02: النواة واستيعاب البيانات',
              weeks: '4 أسابيع',
              deliverables: 'عقود الـ APIs، وترحيل قواعد البيانات، ودمج خطوط الذكاء الاصطناعي.',
            },
            {
              phase: 'المرحلة 03: صياغة الواجهات والتلميع التفاعلي',
              weeks: '3 أسابيع',
              deliverables: 'جماليات سايبربانك سينمائية، وسهولة تصفح كاملة وتوافق مع الأجهزة الذكية.',
            },
            {
              phase: 'المرحلة 04: اختبارات الإجهاد والنشر بلا توقف',
              weeks: 'أسبوعان',
              deliverables: 'اختبارات هندسة الفوضى، ونشر الحاويات السحابية، والتحقق الشامل من الإطلاق.',
            },
          ],
          keyEngineeringChallenges: [
            'فرض العزل التشفيري المشدد وسياسات انعدام الثقة Zero-Trust في حالة السكون وأثناء النقل.',
            'منع هلوسات نماذج الذكاء الاصطناعي عبر التدقيق التخطيطي الحتمي والربط المعرفي.',
            'توسيع نطاق القراءات المتزامنة الضخمة دون أي تباطؤ في عمليات الكتابة.',
          ],
          noirAdvantage:
            'مهندسو نوار يبنون أنظمة مصممة لتحمل 10 أضعاف ذروة الاستخدام منذ اليوم الأول، رافضين القوالب الرديئة لصالح كود محصن ميدانياً.',
        },
      });
      return;
    }

    res.json({
      blueprint: {
        architectureOverview: `A cloud-native, event-driven architecture engineered for sub-50ms latency, high availability, and autonomous AI augmentation tailored for "${idea.slice(0, 40)}..."`,
        recommendedTechStack: [
          {
            layer: 'Frontend & Edge',
            technology: 'React 19 + TypeScript + Vite / Next.js',
            rationale: 'Uncompromising render speed, type safety, and zero-bundle bloat.',
          },
          {
            layer: 'Compute & API',
            technology: 'Node.js / Go Microservices + gRPC',
            rationale: 'High-throughput concurrency with strict memory bounds.',
          },
          {
            layer: 'Intelligence Engine',
            technology: 'Gemini 3.8 Flash SDK + Structured Schemas',
            rationale: 'State-of-the-art inference speed and deterministic typed outputs.',
          },
          {
            layer: 'Persistence & Cache',
            technology: 'PostgreSQL (Prisma ORM) + Redis Cluster',
            rationale: 'ACID transactional guarantees with sub-millisecond hot-path caching.',
          },
        ],
        phaseEstimates: [
          {
            phase: 'Phase 01: Architecture & Threat Model',
            weeks: '2 Weeks',
            deliverables: 'System schemas, latency budgets, security perimeter audit.',
          },
          {
            phase: 'Phase 02: Core Engine & Data Ingestion',
            weeks: '4 Weeks',
            deliverables: 'API contracts, database migrations, AI pipeline integration.',
          },
          {
            phase: 'Phase 03: UI Synthesis & Interactive Polish',
            weeks: '3 Weeks',
            deliverables: 'Cyberpunk cinematic aesthetic, keyboard accessibility, mobile responsive.',
          },
          {
            phase: 'Phase 04: Stress Testing & Zero-Downtime Deployment',
            weeks: '2 Weeks',
            deliverables: 'Chaos engineering benchmarks, container orchestration, launch verification.',
          },
        ],
        keyEngineeringChallenges: [
          'Ensuring strict data isolation and zero-trust encryption at rest and in transit.',
          'Preventing AI hallucination via deterministic schema validation and grounding.',
          'Scaling peak concurrent reads without degradation of write locks.',
        ],
        noirAdvantage:
          'NOIR engineers build systems designed to withstand 10x traffic spikes from day one, refusing low-quality templates in favor of battle-tested code.',
      },
    });
  } catch (err: any) {
    console.error('AI architect error:', err);
    res.status(500).json({ error: 'Failed to generate technical blueprint: ' + err.message });
  }
});

// ----------------------------------------------------------------------
// Vite Middleware & Static Serving
// ----------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NOIR Technologies] Server running on port ${PORT}`);
  });
}

startServer();
