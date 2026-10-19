export type Language = 'en' | 'ar';

export interface Translations {
  nav: {
    home: string;
    services: string;
    whyNoir: string;
    projects: string;
    process: string;
    about: string;
    contact: string;
    letsBuild: string;
    systemStatus: string;
    tagline: string;
    replayIntro: string;
    sound: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3: string;
    secondaryTagline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    stats: {
      stat1Value: string;
      stat1Label: string;
      stat2Value: string;
      stat2Label: string;
      stat3Value: string;
      stat3Label: string;
    };
    mascotIdent: string;
    neuralLink: string;
    mascotTagline: string;
    mascotDesc: string;
  };
  services: {
    eyebrow: string;
    titleMain: string;
    titleSub: string;
    intro: string;
    initScope: string;
    items: {
      number: string;
      title: string;
      subtitle: string;
      description: string;
      deliverables: string[];
      tech: string[];
    }[];
  };
  difference: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    intro: string;
    agencyTitle: string;
    agencySubtitle: string;
    agencyTag: string;
    agencyPoints: string[];
    noirTitle: string;
    noirSubtitle: string;
    noirTag: string;
    noirPoints: string[];
    principles: {
      title: string;
      summary: string;
      metric: string;
    }[];
  };
  projects: {
    eyebrow: string;
    titleMain: string;
    titleSub: string;
    conceptNote: string;
    conceptLab: string;
    viewBlueprint: string;
    fullArchReady: string;
    categories: string[];
    items: {
      id: string;
      title: string;
      codename: string;
      category: string;
      headline: string;
      description: string;
      challenge: string;
      solution: string;
      impactMetrics: { label: string; value: string }[];
      architectureStack: { layer: string; tech: string }[];
    }[];
    modal: {
      conceptProject: string;
      categoryLabel: string;
      execSummary: string;
      challengeTitle: string;
      solutionTitle: string;
      performanceBenchmarks: string;
      systemStack: string;
      harnessTitle: string;
      harnessButton: string;
      harnessTesting: string;
      harnessPrompt: string;
      footerNote: string;
      buildSimilar: string;
    };
  };
  process: {
    eyebrow: string;
    titleMain: string;
    titleSub: string;
    intro: string;
    keyDeliverable: string;
    steps: {
      step: string;
      name: string;
      subtitle: string;
      description: string;
      details: string;
      deliverable: string;
    }[];
  };
  brandStory: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3: string;
    supportingText: string;
    cta: string;
    watermark: string;
  };
  about: {
    eyebrow: string;
    titleMain: string;
    titleSub: string;
    intro: string;
    missionEyebrow: string;
    missionText: string;
    pillars: {
      step: string;
      title: string;
      desc: string;
    }[];
    mascotTitle: string;
    mascotDesc: string;
    aiTitleEyebrow: string;
    aiHeadline: string;
    aiIntro: string;
    aiPlaceholder: string;
    aiCategoryLabel: string;
    aiSubmitButton: string;
    aiSubmitting: string;
    aiPoweredBy: string;
    aiExecVision: string;
    aiTechStack: string;
    aiAdvantage: string;
  };
  contact: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    intro: string;
    fullName: string;
    email: string;
    company: string;
    projectCategory: string;
    estimatedBudget: string;
    description: string;
    descriptionHint: string;
    optional: string;
    submit: string;
    submitting: string;
    successEyebrow: string;
    successTitle: string;
    referenceLabel: string;
    anotherInquiry: string;
    channelsTitle: string;
    channelInquiries: string;
    channelPhone: string;
    channelHq: string;
    ndaTitle: string;
    ndaDesc: string;
    slaLabel: string;
    slaValue: string;
    budgetOptions: { value: string; label: string }[];
  };
  footer: {
    tagline: string;
    desc: string;
    status: string;
    navTitle: string;
    disciplinesTitle: string;
    disciplines: string[];
    copyright: string;
    disclaimer: string;
    backToTop: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      whyNoir: 'Why NOIR',
      projects: 'Projects',
      process: 'Process',
      about: 'About',
      contact: 'Contact',
      letsBuild: 'LET’S BUILD',
      systemStatus: 'SYS // OPERATIONAL',
      tagline: "We Build What's Next",
      replayIntro: 'REPLAY INTRO',
      sound: 'SOUND',
    },
    hero: {
      eyebrow: 'NOIR TECHNOLOGIES // 2026 CODING ENGINE',
      headlineLine1: 'WE DON’T FOLLOW',
      headlineLine2: 'THE FUTURE.',
      headlineLine3: 'WE BUILD IT.',
      secondaryTagline: 'ENGINEERED BEYOND EXPECTATIONS.',
      supportingText:
        'From intelligent AI systems to powerful digital experiences, we transform ambitious ideas into technology that moves businesses forward.',
      primaryCta: 'START A PROJECT',
      secondaryCta: 'EXPLORE OUR WORK',
      stats: {
        stat1Value: '0.0%',
        stat1Label: 'Generic Templates',
        stat2Value: '99.99%',
        stat2Label: 'Uptime SLA Standard',
        stat3Value: '<25ms',
        stat3Label: 'Hot-Path Latency',
      },
      mascotIdent: 'MASCOT_IDENT // APEX_URSOID',
      neuralLink: 'NEURAL_LINK: ACTIVE',
      mascotTagline: 'POWER. INTELLIGENCE. PRECISION.',
      mascotDesc: 'Engineered to master complexity.',
    },
    services: {
      eyebrow: 'CAPABILITIES & ARCHITECTURES',
      titleMain: 'ENGINEERED FOR',
      titleSub: 'WHAT’S NEXT.',
      intro:
        'Engineered from ground truth. We build hardened software designed for extreme performance, security, and enterprise longevity.',
      initScope: 'INITIALIZE SCOPE',
      items: [
        {
          number: '01',
          title: 'Software Development',
          subtitle: 'Full-Cycle Engineering',
          description:
            'Custom web applications, mission-critical business systems, scalable platforms, and enterprise-grade software engineered with zero bloat and uncompromising reliability.',
          deliverables: ['Custom Web Apps', 'Enterprise SaaS', 'High-Frequency APIs', 'Microservices'],
          tech: ['React / Next.js', 'TypeScript', 'Node.js / Go', 'PostgreSQL'],
        },
        {
          number: '02',
          title: 'AI & Machine Learning',
          subtitle: 'Autonomous Intelligence',
          description:
            'Production AI systems, multi-agent workflows, intelligent predictive engines, fine-tuned LLM pipelines, and automated intelligence that compounds business advantage.',
          deliverables: ['Autonomous Agents', 'Predictive Analytics', 'LLM Integrations', 'RAG Pipelines'],
          tech: ['Gemini 3.8 SDK', 'Vector Stores', 'PyTorch', 'Agentic Workflows'],
        },
        {
          number: '03',
          title: 'Web Design & Development',
          subtitle: 'Next-Gen Digital Presence',
          description:
            'High-conversion responsive websites, cinematic landing experiences, and interactive web platforms designed to captivate visitors and reinforce elite brand authority.',
          deliverables: ['Cinematic Landing Pages', 'Interactive 3D Web', 'Design Systems', 'Core Web Vitals 100'],
          tech: ['Tailwind CSS', 'WebGL / Canvas', 'Motion Systems', 'Vite / Edge'],
        },
        {
          number: '04',
          title: 'Mobile App Development',
          subtitle: 'Native & Cross-Platform',
          description:
            'High-performance mobile applications built for fluid user interaction, biometric security, offline resilience, and rapid scaling across iOS and Android ecosystems.',
          deliverables: ['iOS & Android Apps', 'Offline Sync', 'Biometric Auth', 'Push Orchestration'],
          tech: ['React Native', 'Kotlin / Swift', 'Edge Caching', 'Local SQLite'],
        },
        {
          number: '05',
          title: 'UI/UX Design',
          subtitle: 'Human-Centered Mastery',
          description:
            'Cyberpunk precision meets ergonomic usability. We design high-fidelity design systems, interactive prototypes, and intuitive software interfaces that eliminate cognitive friction.',
          deliverables: ['Product Architecture', 'Interactive Wireframing', 'Atomic Design Systems', 'Friction Audits'],
          tech: ['Figma Precision', 'Design Tokens', 'User Journey Maps', 'Micro-interactions'],
        },
        {
          number: '06',
          title: 'Cloud & Digital Solutions',
          subtitle: 'Resilient Infrastructure',
          description:
            'Fortified backend architectures, automated CI/CD pipelines, container orchestration, low-latency database sharding, and elastic cloud infrastructure that never blinks.',
          deliverables: ['Cloud Migration', 'Zero-Downtime CI/CD', 'Database Sharding', 'Threat Defense'],
          tech: ['Kubernetes / Docker', 'Terraform', 'Serverless Edge', 'Redis Clusters'],
        },
      ],
    },
    difference: {
      eyebrow: 'OUR ENGINEERING CONSTITUTION',
      titleMain: 'BUILT DIFFERENT.',
      titleHighlight: 'BUILT TO LAST.',
      intro:
        'Most digital products collapse under scaling pressure or turn into unmaintainable spaghetti. NOIR engineers with militaristic discipline, refusing the shortcuts common in generic software shops.',
      agencyTitle: 'Generic Web & App Agencies',
      agencySubtitle: 'Standard Path',
      agencyTag: 'Fragile',
      agencyPoints: [
        'Copy-paste open-source templates and heavy plugin overhead.',
        'Premature coding without stress-testing architecture blueprints.',
        'Superficial "AI wrapper" features with high token waste and hallucinations.',
        'Security treated as an afterthought right before production deploy.',
      ],
      noirTitle: 'NOIR Technologies Engineering',
      noirSubtitle: 'The Apex Standard',
      noirTag: 'Hardened',
      noirPoints: [
        'Bespoke high-performance codebases engineered specifically for your domain.',
        'Formal architectural modeling, schema contracts, and latency benchmarking.',
        'Grounded multi-agent intelligence with deterministic JSON outputs.',
        'Zero-trust cryptographic isolation and automated vulnerability fuzzing.',
      ],
      principles: [
        {
          title: 'Strategic Thinking Before Development',
          summary: 'We interrogate assumptions and model failure states before writing the first line of code.',
          metric: '100% Roadmap Alignment',
        },
        {
          title: 'Clean, Maintainable Code',
          summary: 'Strict typing, modular cohesion, and zero technical debt compromises. Your future engineers will thank you.',
          metric: 'Zero-Bloat Guarantee',
        },
        {
          title: 'Security-Conscious Engineering',
          summary: 'Zero-trust perimeter modeling, end-to-end cryptographic integrity, and OWASP Top 10 hardening by default.',
          metric: 'Bank-Grade Hardening',
        },
        {
          title: 'Scalable Architecture',
          summary: 'Distributed systems built to transition from 10k to 10M concurrent users without re-architecting the core.',
          metric: 'Elastic Concurrency',
        },
        {
          title: 'Performance-Focused Applications',
          summary: 'Optimized memory allocation, tree-shaken bundles, and sub-second cold starts across global edge points.',
          metric: 'Sub-50ms Edge SLA',
        },
        {
          title: 'Human-Centered Design',
          summary: 'Cyberpunk visual aesthetics balanced with effortless ergonomic simplicity that drives user retention.',
          metric: 'Near-Zero Cognitive Load',
        },
        {
          title: 'AI-Driven Innovation Where It Matters',
          summary: 'We deploy generative AI and autonomous agents only where they deliver measurable ROI, never as vanity gimmicks.',
          metric: 'Pragmatic Machine Learning',
        },
      ],
    },
    projects: {
      eyebrow: 'ENGINEERING SHOWCASE // CONCEPT LAB',
      titleMain: 'IDEAS, ENGINEERED',
      titleSub: 'INTO REALITY.',
      conceptNote: 'Demonstrating NOIR Architectural Standards',
      conceptLab: 'Concept Lab',
      viewBlueprint: 'VIEW BLUEPRINT',
      fullArchReady: 'FULL ARCHITECTURE READY',
      categories: [
        'All Projects',
        'AI & Autonomous Systems',
        'SaaS & FinTech',
        'E-Commerce & 3D Web',
        'Mobile Applications',
        'Enterprise SaaS',
      ],
      items: [
        {
          id: 'proj_kronos',
          title: 'Project KRONOS',
          codename: 'KRONOS-V4',
          category: 'AI & Autonomous Systems',
          headline: 'Autonomous Multi-Agent Reasoning & Execution Engine',
          description:
            'A decentralized multi-agent cognitive architecture capable of autonomous research, task decomposition, and code generation with sub-100ms reasoning verification cycles.',
          challenge:
            'Standard LLM pipelines suffer from hallucination cascade when executing complex multi-step workflows without consensus validation.',
          solution:
            'NOIR engineered a dual-layer cognitive validator with deterministic schema verification and Byzantine-fault-tolerant agent consensus.',
          impactMetrics: [
            { label: 'Reasoning Latency', value: '<85ms' },
            { label: 'Token Efficiency', value: '+42%' },
            { label: 'Validation Pass Rate', value: '99.98%' },
            { label: 'Concurrent Agents', value: '5,000+' },
          ],
          architectureStack: [
            { layer: 'Agent Orchestration', tech: 'Rust + Actor Framework' },
            { layer: 'LLM Reasoning', tech: 'Gemini 3.8 Flash SDK' },
            { layer: 'Knowledge Retrieval', tech: 'Qdrant Vector Cluster' },
            { layer: 'Telemetry Bus', tech: 'Apache Kafka / gRPC' },
          ],
        },
        {
          id: 'proj_vortex',
          title: 'Project VORTEX',
          codename: 'VORTEX-TRADER',
          category: 'SaaS & FinTech',
          headline: 'Ultra-Low Latency Algorithmic Trading Terminal',
          description:
            'High-throughput financial analytics workstation rendering 100,000 order book updates per second with WebGL accelerated depth charts and institutional-grade risk auditing.',
          challenge:
            'Conventional DOM-based market dashboards freeze and stutter during high volatility spikes due to main-thread rendering bottlenecks.',
          solution:
            'Built with custom WebGL canvas pipelines and Web Workers, decoupling real-time binary WebSocket ingestion from UI paint cycles.',
          impactMetrics: [
            { label: 'Frame Rate at Peak', value: '60 FPS' },
            { label: 'WebSocket Throughput', value: '100k evt/s' },
            { label: 'Order Execution Lag', value: '<4.2ms' },
            { label: 'Memory Footprint', value: '<85MB' },
          ],
          architectureStack: [
            { layer: 'Frontend Renderer', tech: 'Custom WebGL / Canvas2D' },
            { layer: 'Client State', tech: 'SharedArrayBuffer Workers' },
            { layer: 'Trading Gateway', tech: 'Go (Zero-Alloc Websocket)' },
            { layer: 'Time-Series DB', tech: 'ClickHouse' },
          ],
        },
        {
          id: 'proj_aura',
          title: 'Project AURA',
          codename: 'AURA-SPATIAL',
          category: 'E-Commerce & 3D Web',
          headline: 'Next-Gen Spatial Commerce & Real-Time 3D Configurator',
          description:
            'Photorealistic browser-native product customizer supporting dynamic physical lighting, procedural material shading, and instantaneous checkout synchronization.',
          challenge:
            'Heavy 3D models typically result in 10-15 second load times and severe drop-off rates on mobile devices.',
          solution:
            'Developed an automated mesh-decimation pipeline with KTX2 texture compression, reducing asset payloads from 90MB to 3.8MB with zero visual degradation.',
          impactMetrics: [
            { label: 'Initial Asset Load', value: '1.2s' },
            { label: 'Conversion Lift', value: '+38%' },
            { label: 'Mobile Adherence', value: '94%' },
            { label: 'Payload Reduction', value: '-96%' },
          ],
          architectureStack: [
            { layer: 'Spatial Engine', tech: 'Three.js / WebGL 2.0' },
            { layer: 'Compression Pipeline', tech: 'Draco + KTX2 Basis' },
            { layer: 'Checkout Core', tech: 'React 19 + Edge Functions' },
            { layer: 'CDN Asset Edge', tech: 'Cloudflare Workers R2' },
          ],
        },
        {
          id: 'proj_spectre',
          title: 'Project SPECTRE',
          codename: 'SPECTRE-OPS',
          category: 'Business Systems & Cloud',
          headline: 'Zero-Trust Fleet Orchestration & Threat Detection',
          description:
            'Enterprise server monitoring and edge node manager providing real-time cryptographic audit trails, anomaly detection, and automated failover routing.',
          challenge:
            'Distributed multi-cloud deployments suffer from fragmented observability and delayed breach detection windows.',
          solution:
            'Implemented lightweight eBPF kernel probes communicating over mTLS tunnels to an autonomous security policy coordinator.',
          impactMetrics: [
            { label: 'Probe CPU Overhead', value: '<0.3%' },
            { label: 'Threat Mitigation', value: '<300ms' },
            { label: 'Monitored Nodes', value: '12,000+' },
            { label: 'False Positives', value: '<0.01%' },
          ],
          architectureStack: [
            { layer: 'Kernel Telemetry', tech: 'Rust + eBPF Probes' },
            { layer: 'Edge Mesh', tech: 'WireGuard mTLS' },
            { layer: 'Audit Storage', tech: 'PostgreSQL + TimescaleDB' },
            { layer: 'Dashboard Core', tech: 'React + Tailwind + WebSockets' },
          ],
        },
        {
          id: 'proj_pulse',
          title: 'Project PULSE',
          codename: 'PULSE-BIO',
          category: 'Mobile Applications',
          headline: 'Predictive Bio-Metric Health Telemetry Ecosystem',
          description:
            'Cross-platform mobile application providing real-time physiological signal analysis, circadian rhythm optimization, and local-first end-to-end encrypted storage.',
          challenge:
            'Strict HIPAA compliance and battery constraints make continuous biometric analysis difficult on consumer smartphones.',
          solution:
            'Quantized on-device neural models processing sensor bursts locally with zero unencrypted raw data leaving the device sandbox.',
          impactMetrics: [
            { label: 'On-Device Model Size', value: '18MB' },
            { label: 'Battery Impact/Day', value: '<2.1%' },
            { label: 'Signal Accuracy', value: '99.4%' },
            { label: 'Zero-Knowledge Sync', value: '100%' },
          ],
          architectureStack: [
            { layer: 'Mobile Shell', tech: 'React Native / Swift Bridges' },
            { layer: 'Local Inference', tech: 'ONNX Runtime Mobile' },
            { layer: 'Encrypted Storage', tech: 'SQLCipher AES-256' },
            { layer: 'Secure Gateway', tech: 'Node.js + Zero-Knowledge Vault' },
          ],
        },
        {
          id: 'proj_synapse',
          title: 'Project SYNAPSE',
          codename: 'SYNAPSE-GRAPH',
          category: 'Enterprise SaaS',
          headline: 'Collaborative Semantic Knowledge Graph & Workflow Engine',
          description:
            'Enterprise intelligence platform mapping cross-departmental documentation, codebase dependencies, and strategic objectives into a queryable semantic vector graph.',
          challenge:
            'Organizational knowledge silos create duplicate engineering work and lost tribal knowledge across expanding companies.',
          solution:
            'Automated bidirectional sync connectors indexing Git repositories, Notion docs, and ticket queues into an active semantic graph.',
          impactMetrics: [
            { label: 'Query Response', value: '<110ms' },
            { label: 'Search Relevance', value: '98.7%' },
            { label: 'Onboarding Velocity', value: '+65%' },
            { label: 'Indexed Nodes', value: '1.4M+' },
          ],
          architectureStack: [
            { layer: 'Knowledge Graph', tech: 'Neo4j Enterprise' },
            { layer: 'Vector Retrieval', tech: 'Pinecone / Gemini Embeddings' },
            { layer: 'Real-Time Sync', tech: 'TypeScript / Node.js' },
            { layer: 'Interactive Canvas', tech: 'React Flow + Custom Shaders' },
          ],
        },
      ],
      modal: {
        conceptProject: 'Concept Project',
        categoryLabel: 'CATEGORY:',
        execSummary: 'EXECUTIVE SUMMARY',
        challengeTitle: '01 // THE TECHNICAL CHALLENGE',
        solutionTitle: '02 // THE NOIR ARCHITECTURAL SOLUTION',
        performanceBenchmarks: 'PERFORMANCE BENCHMARKS',
        systemStack: 'SYSTEM ARCHITECTURE STACK',
        harnessTitle: 'INTERACTIVE ARCHITECTURE HARNESS TEST',
        harnessButton: 'RUN BENCHMARK',
        harnessTesting: 'TESTING...',
        harnessPrompt: 'Press "RUN BENCHMARK" to verify cryptographic handshake and SLA response.',
        footerNote: 'Concept Project by NOIR Technologies Labs.',
        buildSimilar: 'BUILD SIMILAR SYSTEM',
      },
    },
    process: {
      eyebrow: 'ENGINEERING LIFECYCLE',
      titleMain: 'FROM FIRST IDEA',
      titleSub: 'TO FINAL PRODUCT.',
      intro: 'Militaristic execution. Transparent sprints. No black-box guesswork.',
      keyDeliverable: 'KEY DELIVERABLE',
      steps: [
        {
          step: '01',
          name: 'DISCOVER',
          subtitle: 'Strategic Extraction',
          description: 'Understand the client’s goals, audience, and core business problem.',
          details:
            'We run intensive discovery sessions to interrogate assumptions, identify technical bottlenecks, and map regulatory requirements before any infrastructure is provisioned.',
          deliverable: 'Technical Requirements Document & Risk Matrix',
        },
        {
          step: '02',
          name: 'DESIGN',
          subtitle: 'Architectural Modeling',
          description: 'Plan the experience, architecture, and interface.',
          details:
            'Our architects craft database schemas, state machines, API contracts, and high-fidelity ergonomic interface design systems with precision token variables.',
          deliverable: 'Interactive Figma Prototypes & System Blueprints',
        },
        {
          step: '03',
          name: 'DEVELOP',
          subtitle: 'Hardened Implementation',
          description: 'Build, integrate, test, and optimize the product.',
          details:
            'Clean, modular code written in modern TypeScript, Rust, or Go. Continuous integration benchmarks verify zero-vulnerability security and sub-50ms execution speed.',
          deliverable: 'Production Codebase with Automated Test Suites',
        },
        {
          step: '04',
          name: 'LAUNCH',
          subtitle: 'Autonomous Deployment',
          description: 'Deploy the application, verify functionality, and support future improvements.',
          details:
            'Zero-downtime blue/green deployment orchestration, automated telemetry alarms, and post-launch optimization sprints to ensure lasting operational dominance.',
          deliverable: 'Global Edge Cloud Deployment & Telemetry Dashboard',
        },
      ],
    },
    brandStory: {
      eyebrow: 'THE NOIR CREED',
      headlineLine1: 'YOUR VISION.',
      headlineLine2: 'OUR CODE.',
      headlineLine3: 'NO LIMITS.',
      supportingText: 'Great technology doesn’t happen by accident. It is designed, engineered, and built with purpose.',
      cta: 'HAVE AN IDEA? LET’S BUILD IT.',
      watermark: 'NOIR TECHNOLOGIES // GLOBAL ARCHITECTURE & APPLIED AI',
    },
    about: {
      eyebrow: 'THE COMPANY & IDENTITY',
      titleMain: 'ABOUT NOIR —',
      titleSub: 'PRECISION ENGINEERING',
      intro: 'A software development company built on the premise that elegance and raw power are inseparable.',
      missionEyebrow: 'OUR MISSION',
      missionText: '“To transform complex challenges into elegant, reliable, and intelligent software.”',
      pillars: [
        {
          step: '01 // Mission & Vision',
          title: 'Zero Technical Debt',
          desc: 'We exist to eliminate the fragility and churn endemic to modern software projects by deploying hardened architectural foundations from day zero.',
        },
        {
          step: '02 // Philosophy',
          title: 'Militaristic Simplicity',
          desc: 'Every dependency is audited. Every database query is indexed. We prefer concise, expressive code over bloated third-party frameworks.',
        },
        {
          step: '03 // Innovation',
          title: 'Autonomous Intelligence',
          desc: 'We engineer production-grade multi-agent reasoning, semantic vector pipelines, and real-time edge processing for modern enterprise clients.',
        },
        {
          step: '04 // Collaboration',
          title: 'Direct Engineer Access',
          desc: 'No junior account liaisons or bureaucratic delays. You interface directly with principal system architects who write and review your code.',
        },
      ],
      mascotTitle: 'THE NOIR MASCOT',
      mascotDesc:
        'The black bear represents quiet strength, razor-sharp intelligence, unyielding focus, and the power to conquer technical resistance.',
      aiTitleEyebrow: 'LIVE AI ARCHITECTURAL CONSULTATION',
      aiHeadline: 'TEST OUR ARCHITECTURAL REASONING',
      aiIntro:
        'Describe a product vision, technical bottleneck, or high-level idea. Our server-side AI architect will formulate an instant technical blueprint and tech stack recommendation.',
      aiPlaceholder: 'e.g. Real-time predictive anomaly detection engine for high-volume transactions...',
      aiCategoryLabel: 'Category',
      aiSubmitButton: 'GENERATE TECHNICAL BLUEPRINT',
      aiSubmitting: 'SYNTHESIZING ARCHITECTURE SPEC...',
      aiPoweredBy: 'Powered by Gemini 3.8 Flash',
      aiExecVision: 'EXECUTIVE ARCHITECTURE VISION',
      aiTechStack: 'RECOMMENDED HIGH-VELOCITY TECH STACK',
      aiAdvantage: 'THE NOIR ENGINEERING ADVANTAGE',
    },
    contact: {
      eyebrow: 'DISPATCH INITIATION',
      titleMain: 'LET’S BUILD SOMETHING',
      titleHighlight: 'EXTRAORDINARY.',
      intro:
        'Direct your project specifications to our principal engineering desk. We respond within 24 hours with an actionable roadmap.',
      fullName: 'Full Name',
      email: 'Email Address',
      company: 'Company Name',
      projectCategory: 'Project Category',
      estimatedBudget: 'Estimated Budget',
      description: 'Project Description & Requirements',
      descriptionHint: 'Minimum 15 characters. Strict client confidentiality guaranteed.',
      optional: '(Optional)',
      submit: 'DISPATCH PROJECT INQUIRY',
      submitting: 'DISPATCHING ENCRYPTED TRANSMISSION...',
      successEyebrow: 'TRANSMISSION LOGGED TO SECURE DATABASE',
      successTitle: 'INQUIRY DISPATCHED SUCCESSFULLY',
      referenceLabel: 'REFERENCE ID:',
      anotherInquiry: 'TRANSMIT ANOTHER INQUIRY',
      channelsTitle: 'OFFICIAL CHANNELS',
      channelInquiries: 'Inquiries & RFPs',
      channelPhone: 'Encrypted Direct Line',
      channelHq: 'Engineering HQ',
      ndaTitle: 'NON-DISCLOSURE & INTELLECTUAL PROPERTY',
      ndaDesc:
        'All submitted concepts and intellectual property are protected under automatic mutual confidentiality. We never share proprietary architecture designs or client briefs.',
      slaLabel: 'RESPONSE SLA GUARANTEE:',
      slaValue: '< 24 HOURS',
      budgetOptions: [
        { value: '<$25,000', label: '< $25,000 (Discovery & Prototype)' },
        { value: '$25,000 - $50,000', label: '$25,000 - $50,000 (Targeted MVP / Core Module)' },
        { value: '$50,000 - $100,000', label: '$50,000 - $100,000 (Complete Production System)' },
        { value: '$100,000+', label: '$100,000+ (Enterprise Multi-Agent Platform)' },
        { value: 'Flexible / Discussion', label: 'Flexible / Strategic Retainer' },
      ],
    },
    footer: {
      tagline: 'WE BUILD WHAT’S NEXT.',
      desc: 'An elite software development and artificial intelligence company. We build high-velocity digital architectures and mission-critical systems designed to withstand the future.',
      status: 'GLOBAL CLUSTER // ALL SYSTEMS SECURE',
      navTitle: 'NAVIGATION',
      disciplinesTitle: 'ENGINEERING DISCIPLINES',
      disciplines: [
        '01 — Custom Software & Web Systems',
        '02 — Autonomous Multi-Agent AI',
        '03 — Low-Latency FinTech & Trading Interfaces',
        '04 — Spatial 3D Web & Immersive Commerce',
        '05 — Zero-Trust Edge Infrastructure',
        '06 — Mission-Critical Mobile Ecosystems',
      ],
      copyright: `© ${new Date().getFullYear()} NOIR Technologies. All rights reserved.`,
      disclaimer: 'Portfolio concept projects clearly designated for architecture demonstration.',
      backToTop: 'BACK TO TOP',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      whyNoir: 'لماذا نوار',
      projects: 'المشاريع',
      process: 'منهجية العمل',
      about: 'عن الشركة',
      contact: 'تواصل معنا',
      letsBuild: 'لنبدأ البناء',
      systemStatus: 'النظام // قيد العمل بنجاح',
      tagline: 'نحن نبني ما هو قادم',
      replayIntro: 'إعادة المقدمة',
      sound: 'الصوت',
    },
    hero: {
      eyebrow: 'تقنيات نوار // محرك البرمجة المتقدم 2026',
      headlineLine1: 'نحن لا نتبع',
      headlineLine2: 'المستقبل.',
      headlineLine3: 'بل نصنعه بأيدينا.',
      secondaryTagline: 'هندسة تفوق كل التوقعات.',
      supportingText:
        'من أنظمة الذكاء الاصطناعي الذاتية إلى المنصات الرقمية المتطورة، نحول أفكارك الطموحة إلى بنية برمجية تقود أعمالك نحو الريادة.',
      primaryCta: 'ابدأ مشروعك الآن',
      secondaryCta: 'استكشف أعمالنا',
      stats: {
        stat1Value: '0.0%',
        stat1Label: 'قوالب جاهزة (كود أصيل 100%)',
        stat2Value: '99.99%',
        stat2Label: 'معيار استمرارية التشغيل SLA',
        stat3Value: '<25ms',
        stat3Label: 'زمن الاستجابة السريع',
      },
      mascotIdent: 'التميمة // الدب الأسود الخارق',
      neuralLink: 'الربط العصبي: نشط',
      mascotTagline: 'القوة. الذكاء. الدقة المتناهية.',
      mascotDesc: 'هندسة صلبة للسيطرة على التعقيد البرمجي.',
    },
    services: {
      eyebrow: 'القدرات الهندسية والأنظمة',
      titleMain: 'هندسة متقدمة',
      titleSub: 'لما هو قادم.',
      intro:
        'هندسة تنطلق من الأسس الراسخة. نطور برمجيات فائقة القوة صممت للأداء الاستثنائي، والأمان المشدد، والبقاء المستدام.',
      initScope: 'تحديد النطاق الفني',
      items: [
        {
          number: '01',
          title: 'تطوير البرمجيات المخصصة',
          subtitle: 'هندسة شاملة للدورة الكاملة',
          description:
            'تطبيقات ويب متقدمة، وأنظمة تشغيل الأعمال الحيوية، ومنصات قابلة للتوسع، وبرمجيات مؤسسية مطورة دون أي ترهل برمجي وبموثوقية حاسمة.',
          deliverables: ['تطبيقات ويب مخصصة', 'منصات سحابية SaaS', 'واجهات برمجية فائقة السرعة', 'معماريات الخدمات الدقيقة'],
          tech: ['React / Next.js', 'TypeScript', 'Node.js / Go', 'PostgreSQL'],
        },
        {
          number: '02',
          title: 'الذكاء الاصطناعي وتعلم الآلة',
          subtitle: 'الأنظمة الذكية المستقلة',
          description:
            'أنظمة ذكاء اصطناعي إنتاجية، ووكلاء متعددين ذاتيي العمل، ومحركات تنبؤ ذكية، وخطوط معالجة النماذج اللغوية الدقيقة التي تصنع فارقاً تنافسياً حقيقياً.',
          deliverables: ['وكلاء ذكاء اصطناعي ذاتيون', 'تحليلات تنبؤية', 'دمج النماذج اللغوية LLMs', 'خطوط بيانات متجهة RAG'],
          tech: ['Gemini 3.8 SDK', 'Vector Stores', 'PyTorch', 'Agentic Workflows'],
        },
        {
          number: '03',
          title: 'تصميم وتطوير مواقع الويب',
          subtitle: 'تجارب رقمية من الجيل القادم',
          description:
            'مواقع تفاعلية سينمائية سريعة التحميل، وصفحات هبوط تعزز هوية العلامة التجارية وتحقق أعلى معدلات التحويل للعملاء المتميزين.',
          deliverables: ['صفحات هبوط سينمائية', 'مواقع ثلاثية الأبعاد تفاعلية', 'أنظمة تصميم رقمية', 'معايير سرعة قياسية 100%'],
          tech: ['Tailwind CSS', 'WebGL / Canvas', 'أنظمة حركة Motion', 'Vite / Edge'],
        },
        {
          number: '04',
          title: 'تطوير تطبيقات الجوال',
          subtitle: 'تطبيقات أصلية وعابرة للمنصات',
          description:
            'تطبيقات جوال عالية الأداء مبنية لتفاعل سلس، وأمان بيومتري فائق، وقدرة على العمل دون اتصال مع توسع سريع عبر بيئات iOS و Android.',
          deliverables: ['تطبيقات iOS و Android', 'مزامنة أوفلاين ذكية', 'مصادقة بيومترية', 'إشعارات لحظية مبرمجة'],
          tech: ['React Native', 'Kotlin / Swift', 'Edge Caching', 'Local SQLite'],
        },
        {
          number: '05',
          title: 'تصميم واجهات وتجربة المستخدم UI/UX',
          subtitle: 'إتقان محوره الإنسان',
          description:
            'تلاقي دقة السايبربانك العصرية مع أقصى درجات السهولة والراحة. نصمم أنظمة متطورة وبروتوتايب تفاعلي يقضي على أي ارتباك لدى المستخدم.',
          deliverables: ['معمارية المنتجات', 'مخططات تفاعلية Wireframes', 'أنظمة تصميم ذرية Atomic', 'تدقيق سلاسة الاستخدام'],
          tech: ['Figma Precision', 'Design Tokens', 'خرائط رحلة المستخدم', 'تفاعلات دقيقة'],
        },
        {
          number: '06',
          title: 'الحلول السحابية والرقمية',
          subtitle: 'بنية تحتية فولاذية لا تتوقف',
          description:
            'معماريات خلفية محصنة، وأتمتة مسارات النشر والدمج المستمر CI/CD، وتجزئة قواعد البيانات ذات الكمون المنخفض لحماية مطلقة وأداء لا يتعثر.',
          deliverables: ['الترحيل السحابي الآمن', 'نشر تلقائي بدون توقف', 'تجزئة قواعد البيانات', 'الدفاع ضد التهديدات السيبرانية'],
          tech: ['Kubernetes / Docker', 'Terraform', 'حوسبة الحافة Serverless', 'Redis Clusters'],
        },
      ],
    },
    difference: {
      eyebrow: 'دستورنا الهندسي الصارم',
      titleMain: 'بنيت بشكل مختلف.',
      titleHighlight: 'بنيت لتدوم.',
      intro:
        'معظم المنتجات الرقمية تنهار تحت ضغط التوسع أو تتحول إلى فوضى برمجية مستعصية على الصيانة. في نوار، نبرمج بانضباط صارم ونرفض المسارات المختصرة المعتادة في الشركات التقليدية.',
      agencyTitle: 'الشركات والوكالات التقليدية',
      agencySubtitle: 'المسار الشائع',
      agencyTag: 'هشة وقابلة للانهيار',
      agencyPoints: [
        'نسخ ولصق قوالب مفتوحة المصدر مع إضافات برمجية ثقيلة وغير ضرورية.',
        'الشروع المتسرع في البرمجة دون إجهاد واختبار مخططات المعمارية.',
        'ميزات ذكاء اصطناعي سطحية تستهلك الكثير من التكلفة وتولد أخطاء وهلوسات.',
        'معاملة الأمان الرقمي كأمر ثانوي يتم الالتفات إليه في اللحظة الأخيرة.',
      ],
      noirTitle: 'هندسة تقنيات نوار',
      noirSubtitle: 'المعيار الأرقى',
      noirTag: 'محصنة فولاذياً',
      noirPoints: [
        'قواعد برمجية مصممة خصيصاً لاحتياجات مجالك بأعلى سرعة وكفاءة ممكنة.',
        'نمذجة معمارية رسمية، وعقود بيانات موحدة، وقياس دقيق لزمن الاستجابة.',
        'ذكاء اصطناعي متعدد الوكلاء مبني على بيانات حقيقية وبمخرجات JSON محكمة.',
        'عزل تشفيري صفري الثقة وفحص استباقي مؤتمت لجميع الثغرات.',
      ],
      principles: [
        {
          title: 'التفكير الاستراتيجي قبل كتابة أي كود',
          summary: 'نفكك الفرضيات ونضع نماذج لكافة حالات الفشل المحتملة قبل كتابة السطر البرمجي الأول.',
          metric: 'توافق 100% مع أهداف المشروع',
        },
        {
          title: 'كود نظيف وسهل الصيانة للأبد',
          summary: 'كود صريح، وأنماط معيارية، وصفر ديون تقنية مؤجلة، حتى يثني مهندسو مستقبلك على اختياراتنا.',
          metric: 'ضمان التحرر من الترهل البرمجي',
        },
        {
          title: 'هندسة واعية بالأمان في أدق تفاصيلها',
          summary: 'نمذجة أمنية صفرية الثقة، وسلامة تشفير شاملة من طرف إلى طرف، وتحصين حسب معايير OWASP القياسية.',
          metric: 'تحصين بمستوى أمان البنوك',
        },
        {
          title: 'معمارية قابلة للتوسع المليوني',
          summary: 'أنظمة موزعة مصممة للانتقال من 10 آلاف إلى 10 ملايين مستخدم متزامن دون الحاجة لإعادة كتابة النظام الأساسي.',
          metric: 'توسع مرن وفوري',
        },
        {
          title: 'تطبيقات تركز على السرعة الفائقة',
          summary: 'إدارة ذاكرة ذكية، وحزم برمجية خفيفة، وبدء تشغيل فوري عبر نقاط الحافة السحابية حول العالم.',
          metric: 'استجابة أقل من 50 مللي ثانية',
        },
        {
          title: 'تصميم محوره راحة الإنسان',
          summary: 'جماليات سايبربانك سينمائية متوازنة مع سهولة مريحة لا تسبب أي إرهاق ذهني وتدعم ولاء المستخدمين.',
          metric: 'عبء إدراكي يقارب الصفر',
        },
        {
          title: 'ابتكار بالذكاء الاصطناعي حيث يصنع قيمة فعلية',
          summary: 'نوظف الذكاء الاصطناعي التوليدي والوكلاء المستقلين فقط حيث يقدمون عائداً ملموساً وليس كعرض شكلي عابر.',
          metric: 'تعلم آلي واقعي وعملي',
        },
      ],
    },
    projects: {
      eyebrow: 'معرض الإنجازات الهندسية // مختبر المفاهيم',
      titleMain: 'أفكار، تُهندس',
      titleSub: 'لتتحول إلى واقع.',
      conceptNote: 'استعراض لمعايير نوار المعمارية الفائقة',
      conceptLab: 'مختبر المفاهيم',
      viewBlueprint: 'عرض المخطط الهندسي',
      fullArchReady: 'المعمارية التقنية الكاملة جاهزة',
      categories: [
        'جميع المشاريع',
        'الذكاء الاصطناعي والأنظمة الذاتية',
        'المنصات السحابية والتقنية المالية',
        'التجارة الرقمية والويب ثلاثي الأبعاد',
        'تطبيقات الجوال المتقدمة',
        'البرمجيات المؤسسية الكبرى',
      ],
      items: [
        {
          id: 'proj_kronos',
          title: 'مشروع كرونوس KRONOS',
          codename: 'KRONOS-V4',
          category: 'الذكاء الاصطناعي والأنظمة الذاتية',
          headline: 'محرك استنتاج وتنفيذ ذاتي متعدد الوكلاء',
          description:
            'معمارية معرفية لامركزية تضم وكلاء أذكياء قادرين على البحث التلقائي، وتفكيك المهام المعقدة، وإنتاج الكود مع دورات تدقيق لا تتجاوز 100 مللي ثانية.',
          challenge:
            'تعاني خطوط الذكاء الاصطناعي الشائعة من توالي الهلوسات عند تنفيذ مهام معقدة متعددة المراحل دون تحقق جمعي.',
          solution:
            'ابتكرت نوار مدققاً إدراكياً ثنائي الطبقة مع فحص حتمي للعقود وتوافق بين الوكلاء متسامح مع الأخطاء البيزنطية.',
          impactMetrics: [
            { label: 'زمن استجابة الاستنتاج', value: '<85ms' },
            { label: 'كفاءة استهلاك التوكنز', value: '+42%' },
            { label: 'معدل اجتياز التحقق', value: '99.98%' },
            { label: 'وكلاء متزامنون', value: '5,000+' },
          ],
          architectureStack: [
            { layer: 'تنسيق الوكلاء', tech: 'Rust + Actor Framework' },
            { layer: 'استدلال النماذج', tech: 'Gemini 3.8 Flash SDK' },
            { layer: 'استرجاع المعرفة', tech: 'Qdrant Vector Cluster' },
            { layer: 'ناقل البيانات', tech: 'Apache Kafka / gRPC' },
          ],
        },
        {
          id: 'proj_vortex',
          title: 'مشروع فورتكس VORTEX',
          codename: 'VORTEX-TRADER',
          category: 'المنصات السحابية والتقنية المالية',
          headline: 'محطة تداول خوارزمية فائقة السرعة بالغة الدقة',
          description:
            'منصة تحليلات مالية هائلة تعالج 100,000 تحديث لدفتر الأوامر في الثانية بواسطة رسوم بيانية مسرعة بـ WebGL وتدقيق مخاطر مؤسسي.',
          challenge:
            'تتجمد لوحات التداول التقليدية المعتمدة على الـ DOM العادي خلال فترات التقلبات العالية بسبب عنق زجاجة المعالجة أحادية الخيط.',
          solution:
            'بناء خطوط معالجة مخصصة عبر WebGL وعمال الويب المستقلين، مما فصل استقبال تدفق بيانات الـ WebSockets عن دورات رسم واجهة المستخدم.',
          impactMetrics: [
            { label: 'معدل الإطارات في الذروة', value: '60 FPS' },
            { label: 'تدفق الـ WebSockets', value: '100k evt/s' },
            { label: 'تأخر تنفيذ الصفقات', value: '<4.2ms' },
            { label: 'استهلاك الذاكرة', value: '<85MB' },
          ],
          architectureStack: [
            { layer: 'محرك العرض الرسومي', tech: 'Custom WebGL / Canvas2D' },
            { layer: 'إدارة الحالة', tech: 'SharedArrayBuffer Workers' },
            { layer: 'بوابة التداول', tech: 'Go (Zero-Alloc Websocket)' },
            { layer: 'قاعدة بيانات السلاسل', tech: 'ClickHouse' },
          ],
        },
        {
          id: 'proj_aura',
          title: 'مشروع أورا AURA',
          codename: 'AURA-SPATIAL',
          category: 'التجارة الرقمية والويب ثلاثي الأبعاد',
          headline: 'منصة تجارة مكانية ومحدد منتجات تفاعلي ثلاثي الأبعاد',
          description:
            'مخصص منتجات فوتوغرافي واقعي يعمل مباشرة داخل المتصفح، مع إضاءة فيزيائية حيوية وتظليل مواد إجرائي ومزامنة دفع فورية.',
          challenge:
            'النماذج ثلاثية الأبعاد الثقيلة تؤدي عادة إلى أوقات تحميل تمتد إلى 15 ثانية وهروب مستخدمي الهواتف.',
          solution:
            'تطوير خط معالجة لتقليص حجم الشبكات مع ضغط KTX2، مما خفض حجم الملفات من 90 ميغابايت إلى 3.8 ميغابايت دون أدنى تنازل في الجودة البصرية.',
          impactMetrics: [
            { label: 'سرعة التحميل الأولى', value: '1.2s' },
            { label: 'زيادة معدل التحويل', value: '+38%' },
            { label: 'استقرار الأجهزة الذكية', value: '94%' },
            { label: 'نسبة تقليص الحجم', value: '-96%' },
          ],
          architectureStack: [
            { layer: 'المحرك المكاني', tech: 'Three.js / WebGL 2.0' },
            { layer: 'خطوط الضغط', tech: 'Draco + KTX2 Basis' },
            { layer: 'نواة الدفع', tech: 'React 19 + Edge Functions' },
            { layer: 'شبكة توزيع المحتوى', tech: 'Cloudflare Workers R2' },
          ],
        },
        {
          id: 'proj_spectre',
          title: 'مشروع سبكتر SPECTRE',
          codename: 'SPECTRE-OPS',
          category: 'البرمجيات المؤسسية الكبرى',
          headline: 'إدارة أسراب الخوادم صفرية الثقة وكشف التهديدات',
          description:
            'نظام مراقبة لخوادم المؤسسات وعقد الحافة يوفر مسارات تدقيق تشفيرية لحظية، ورصد الشذوذ الأمني، وتوجيه التحويل التلقائي للأعطال.',
          challenge:
            'البيئات السحابية الهجينة الموزعة تعاني من تشتت المراقبة وتأخر كشف الاختراقات الأمنية.',
          solution:
            'تطبيق مجسات eBPF خفيفة الوزن على مستوى نواة النظام تتواصل عبر أنفاق mTLS مع منسق أمني ذكي ومستقل.',
          impactMetrics: [
            { label: 'استهلاك المعالج', value: '<0.3%' },
            { label: 'سرعة تحييد التهديد', value: '<300ms' },
            { label: 'العقد المراقبة', value: '12,000+' },
            { label: 'معدل الإنذارات الخاطئة', value: '<0.01%' },
          ],
          architectureStack: [
            { layer: 'تتبع النواة', tech: 'Rust + eBPF Probes' },
            { layer: 'شبكة الحافة', tech: 'WireGuard mTLS' },
            { layer: 'تخزين التدقيق', tech: 'PostgreSQL + TimescaleDB' },
            { layer: 'لوحة القيادة', tech: 'React + Tailwind + WebSockets' },
          ],
        },
        {
          id: 'proj_pulse',
          title: 'مشروع بولس PULSE',
          codename: 'PULSE-BIO',
          category: 'تطبيقات الجوال المتقدمة',
          headline: 'منظومة قياسات صحية وتنبؤ حيوي ذكي للهواتف',
          description:
            'تطبيق جوال عابر للمنصات يوفر تحليلاً حياً للإشارات الفسيولوجية، وضبط الإيقاع اليومي، مع تخزين مشفر طرفاً لطرف ومحلي أولاً.',
          challenge:
            'الامتثال الصارم لقوانين الخصوصية الصحية وقيود بطارية الهواتف يجعلان التحليل البيومتري المستمر شديد الصعوبة.',
          solution:
            'نماذج عصبية محلية مكممة تعالج البيانات الحيوية على الهاتف مباشرة دون أن تخرج أي بيانات غير مشفرة من الجهاز.',
          impactMetrics: [
            { label: 'حجم النموذج المدمج', value: '18MB' },
            { label: 'استهلاك البطارية/يوم', value: '<2.1%' },
            { label: 'دقة تصنيف الإشارة', value: '99.4%' },
            { label: 'مزامنة صفرية المعرفة', value: '100%' },
          ],
          architectureStack: [
            { layer: 'هيكل الجوال', tech: 'React Native / Swift Bridges' },
            { layer: 'الاستدلال المحلي', tech: 'ONNX Runtime Mobile' },
            { layer: 'التخزين المشفر', tech: 'SQLCipher AES-256' },
            { layer: 'البوابة الآمنة', tech: 'Node.js + Zero-Knowledge Vault' },
          ],
        },
        {
          id: 'proj_synapse',
          title: 'مشروع سينابس SYNAPSE',
          codename: 'SYNAPSE-GRAPH',
          category: 'البرمجيات المؤسسية الكبرى',
          headline: 'محرك الرسوم البيانية المعرفية التعاونية وتدفق العمل',
          description:
            'منصة استخبارات مؤسسية تربط توثيق الأقسام المختلفة والتبعيات البرمجية والأهداف الاستراتيجية في رسم بياني دلالي متصل وقابل للاستعلام.',
          challenge:
            'تتسبب الجزر المعزولة داخل الشركات في تكرار العمل البرمجي وضياع المعرفة المؤسسية الحيوية مع التوسع.',
          solution:
            'موصلات مزامنة تلقائية ثنائية الاتجاه تفهرس مستودعات Git ومستندات العمل وتذاكر المهام في شبكة متجهة نشطة.',
          impactMetrics: [
            { label: 'زمن استجابة الاستعلام', value: '<110ms' },
            { label: 'دقة نتائج البحث', value: '98.7%' },
            { label: 'تسريع تدريب الموظفين', value: '+65%' },
            { label: 'العقد المفهرسة', value: '1.4M+' },
          ],
          architectureStack: [
            { layer: 'الرسم المعرفي', tech: 'Neo4j Enterprise' },
            { layer: 'البحث المتجه', tech: 'Pinecone / Gemini Embeddings' },
            { layer: 'المزامنة الحية', tech: 'TypeScript / Node.js' },
            { layer: 'اللوحة التفاعلية', tech: 'React Flow + Custom Shaders' },
          ],
        },
      ],
      modal: {
        conceptProject: 'مشروع استعراضي',
        categoryLabel: 'التصنيف:',
        execSummary: 'الملخص التنفيذي',
        challengeTitle: '01 // التحدي الهندسي الأساسي',
        solutionTitle: '02 // الحل المعماري من نوار',
        performanceBenchmarks: 'مؤشرات الأداء القياسية',
        systemStack: 'المكدس التكنولوجي والمعماري للنظام',
        harnessTitle: 'اختبار محاكاة المعمارية التفاعلي',
        harnessButton: 'تشغيل الفحص القياسي',
        harnessTesting: 'جاري فحص المعمارية...',
        harnessPrompt: 'اضغط على "تشغيل الفحص القياسي" للتحقق من المصافحة التشفيرية ومعدل الاستجابة.',
        footerNote: 'مشروع مفاهيمي من مختبرات تقنيات نوار.',
        buildSimilar: 'طلب بناء نظام مماثل',
      },
    },
    process: {
      eyebrow: 'دورة حياة الهندسة البرمجية',
      titleMain: 'من الفكرة الأولى',
      titleSub: 'إلى المنتج النهائي.',
      intro: 'تنفيذ دقيق. مراحل واضحة المعالم. بلا غموض أو تخمينات عشوائية.',
      keyDeliverable: 'المخرج الأساسي للمرحلة',
      steps: [
        {
          step: '01',
          name: 'الاستكشاف',
          subtitle: 'الاستخلاص الاستراتيجي',
          description: 'فهم أهداف العميل، وجمهوره المستهدف، وعمق المشكلة التجارية.',
          details:
            'نعقد ورش عمل استكشافية مكثفة لتفكيك الفرضيات، وتحديد العوائق التقنية، ورسم المتطلبات التنظيمية بدقة قبل حجز أي موارد برمجية.',
          deliverable: 'وثيقة المتطلبات الفنية ومصفوفة تقييم المخاطر',
        },
        {
          step: '02',
          name: 'التصميم',
          subtitle: 'النمذجة المعمارية',
          description: 'تخطيط التجربة الشاملة، والمعمارية البرمجية، وتصميم الواجهة.',
          details:
            'يبتكر مهندسونا مخططات قواعد البيانات، وآلات الحالات، وعقود الـ APIs، وأنظمة تصميم مريحة وذكية بأعلى دقة قياسية.',
          deliverable: 'نماذج فيجما تفاعلية والمخطط الهيكلي للنظام',
        },
        {
          step: '03',
          name: 'التطوير',
          subtitle: 'التنفيذ البرمجي المحصن',
          description: 'بناء المنتج، وربطه، واختباره، وتحسين أدائه لأقصى حد.',
          details:
            'كود نظيف ووحداتي مكتوب بلغات TypeScript أو Rust أو Go الحديثة، مع اختبارات أتمتة مستمرة تضمن خلوه من الثغرات وسرعة استجابة مذهلة.',
          deliverable: 'قاعدة برمجية إنتاجية مع أجنحة اختبارات مؤتمتة',
        },
        {
          step: '04',
          name: 'الإطلاق',
          subtitle: 'النشر الذاتي المستقر',
          description: 'نشر التطبيق، والتأكد من كافة وظائفه، ودعم التطورات المستقبلية.',
          details:
            'نشر سحابي ذكي بلا أي انقطاع Blue/Green، مع مجسات رصد وإنذار فورية لضمان تفوق تشغيلي مستدام وثابت.',
          deliverable: 'نشر سحابي عالمي ولوحة قيادة وتتبع لحظية',
        },
      ],
    },
    brandStory: {
      eyebrow: 'ميثاق نوار',
      headlineLine1: 'رؤيتك.',
      headlineLine2: 'كودنا البرمجي.',
      headlineLine3: 'بلا أي حدود.',
      supportingText: 'التقنيات العظيمة لا تولد بالصدفة، بل تُصمم وتُهندس وتُبنى بعزم وغاية واضحة.',
      cta: 'لديك فكرة طموحة؟ لنقم ببنائها سوياً.',
      watermark: 'تقنيات نوار // معمارية الأنظمة العالمية والذكاء الاصطناعي التطبيقي',
    },
    about: {
      eyebrow: 'الشركة وهوية العلامة',
      titleMain: 'عن نوار —',
      titleSub: 'الهندسة فائقة الدقة',
      intro: 'شركة برمجيات تأسست على قناعة راسخة بأن الأناقة الرفيعة والقوة الخام هما جوهر واحد لا ينفصل.',
      missionEyebrow: 'رسالتنا',
      missionText: '“تحويل التحديات البرمجية المعقدة إلى برمجيات أنيقة، فائقة الموثوقية، وشديدة الذكاء.”',
      pillars: [
        {
          step: '01 // الرؤية والرسالة',
          title: 'صفر ديون تقنية',
          desc: 'نحن هنا للقضاء على الهشاشة والارتباك السائد في المشاريع البرمجية الحديثة عبر غرس قواعد معمارية صلبة منذ اليوم الأول.',
        },
        {
          step: '02 // الفلسفة الهندسية',
          title: 'البساطة الحاسمة الصارمة',
          desc: 'كل مكتبة يتم تدقيقها، وكل استعلام مفهرس بدقة. نفضل الكود البرمجي الصريح والواضح على الأطر البرمجية المتضخمة والهشة.',
        },
        {
          step: '03 // الابتكار المستمر',
          title: 'الذكاء المستقل الحقيقي',
          desc: 'نهندس أنظمة وكلاء ذكاء اصطناعي متعددين، وقنوات بيانات متجهة فائقة السرعة، ومعالجة حافة حية تخدم الشركات الكبرى.',
        },
        {
          step: '04 // أسلوب التعاون',
          title: 'تواصل مباشر مع كبار المهندسين',
          desc: 'بلا وسطاء حسابات أو تعقيدات إدارية تبطئ العمل. تتحدث وتتواصل مباشرة مع كبار مهندسي المعمارية الذين يكتبون ويراجعون نظامك.',
        },
      ],
      mascotTitle: 'تميمة نوار الرسمية',
      mascotDesc:
        'يجسد الدب الأسود القوة الهادئة، والذكاء الحاد، والتركيز الراسخ، والقدرة الفائقة على قهر أي مقاومة تقنية في طريق النجاح.',
      aiTitleEyebrow: 'استشارة معمارية حية بالذكاء الاصطناعي',
      aiHeadline: 'اختبر ذكاءنا المعماري والتحليلي مباشرة',
      aiIntro:
        'صف فكرتك التقنية أو التحدي الذي تواجهه شركتك، وسيقوم مهندس المعمارية الافتراضي المدعوم بالذكاء الاصطناعي السحابي بإنتاج مخطط تقني ومكدس مقترح فوراً.',
      aiPlaceholder: 'مثال: محرك للتنبؤ ورصد العمليات المشبوهة لحظياً في منصة تداول عالية التردد...',
      aiCategoryLabel: 'التصنيف',
      aiSubmitButton: 'توليد المخطط المعماري الهندسي',
      aiSubmitting: 'جاري صياغة المواصفات المعمارية...',
      aiPoweredBy: 'مدعوم بنموذج Gemini 3.8 Flash',
      aiExecVision: 'الرؤية المعمارية التنفيذية',
      aiTechStack: 'المكدس التكنولوجي المقترح فائق السرعة',
      aiAdvantage: 'الميزة الهندسية الاستثنائية لنوار',
    },
    contact: {
      eyebrow: 'إرسال واستقبال طلبات المشاريع',
      titleMain: 'دعنا نبني شيئاً',
      titleHighlight: 'استثنائياً حقاً.',
      intro:
        'أرسل مواصفات مشروعك مباشرة إلى مكتب الهندسة الرئيسي لدينا. سنرد عليك خلال أقل من 24 ساعة بخارطة طريق فنية وتنفيذية دقيقة.',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      company: 'اسم الشركة',
      projectCategory: 'تصنيف المشروع',
      estimatedBudget: 'الميزانية التقديرية',
      description: 'وصف المشروع ومتطلباته الفنية',
      descriptionHint: '15 حرفاً على الأقل. نحافظ على سرية تامة ومطلقة لجميع بياناتك.',
      optional: '(اختياري)',
      submit: 'إرسال طلب المشروع الآن',
      submitting: 'جاري تشفير وإرسال الطلب بأمان...',
      successEyebrow: 'تم تسجيل الطلب في قاعدة البيانات المشفرة',
      successTitle: 'تم استلام طلب مشروعك بنجاح',
      referenceLabel: 'رقم المرجع التعريفي:',
      anotherInquiry: 'إرسال طلب استفسار جديد',
      channelsTitle: 'القنوات الرسمية المعتمدة',
      channelInquiries: 'الاستفسارات والمناقصات RFPs',
      channelPhone: 'الخط الهاتفي المشفر المباشر',
      channelHq: 'المقر الرئيسي للهندسة',
      ndaTitle: 'حماية الملكية الفكرية واتفاقية عدم الإفصاح',
      ndaDesc:
        'كافة الأفكار والمفاهيم المقدمة محمية تلقائياً بموجب سرية متبادلة صارمة. لن نقوم بمشاركة أي مخططات معمارية أو معلومات تخص مشروعك إطلاقاً.',
      slaLabel: 'ضمان سرعة الرد الرسمية:',
      slaValue: 'أقل من 24 ساعة',
      budgetOptions: [
        { value: '<$25,000', label: 'أقل من 25,000 دولار (استكشاف ونموذج أولي)' },
        { value: '$25,000 - $50,000', label: '25,000$ - 50,000$ (إصدار أولي فعال MVP)' },
        { value: '$50,000 - $100,000', label: '50,000$ - 100,000$ (نظام إنتاجي متكامل)' },
        { value: '$100,000+', label: '100,000$ فأكثر (منصة مؤسسية ضخمة متعددة الوكلاء)' },
        { value: 'Flexible / Discussion', label: 'مرنة / شراكة استشارية مستمرة' },
      ],
    },
    footer: {
      tagline: 'نحن نبني ما هو قادم.',
      desc: 'شركة برمجيات وذكاء اصطناعي رائدة. نبني معماريات رقمية فائقة السرعة وأنظمة حيوية صُممت للصمود في مواجهة تحديات المستقبل.',
      status: 'الخوادم العالمية // كافة الأنظمة مؤمنة بالكامل',
      navTitle: 'روابط التنقل',
      disciplinesTitle: 'التخصصات الهندسية',
      disciplines: [
        '01 — البرمجيات المخصصة وأنظمة الويب',
        '02 — الذكاء الاصطناعي المستقل متعدد الوكلاء',
        '03 — واجهات التداول والتقنيات المالية فائقة السرعة',
        '04 — الويب المكاني ثلاثي الأبعاد والتجارة التفاعلية',
        '05 — البنية التحتية للحافة صفرية الثقة',
        '06 — تطبيقات الجوال للمهام الحيوية المعقدة',
      ],
      copyright: `© ${new Date().getFullYear()} تقنيات نوار NOIR Technologies. جميع الحقوق محفوظة.`,
      disclaimer: 'المشاريع المفاهيمية المعروضة صُممت خصيصاً كاستعراض عملي للمعايير الهندسية.',
      backToTop: 'العودة للأعلى',
    },
  },
};
