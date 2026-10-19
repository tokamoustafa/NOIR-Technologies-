# NOIR TECHNOLOGIES — FUTURE BUILT IN CODE

> **“WE DON’T FOLLOW THE FUTURE. WE BUILD IT.”**
> An elite software development and AI engineering company website inspired by cinematic cyberpunk aesthetics, mysterious black bear mascot imagery, and a black-and-crimson visual identity.

---

## 1. Visual Identity & Color Palette

The design strictly follows the black, crimson, and neon-red identity:
- **Pure Black:** `#050505`
- **Obsidian:** `#0A0A0A`
- **Dark Crimson:** `#450000`
- **Blood Red:** `#8B0000`
- **Neon Red:** `#FF1E2D`
- **Soft White:** `#F5F5F5`
- **Muted Gray:** `#858585`

No foreign gradients (blue, green, purple) are used anywhere in the application.

---

## 2. Core Architecture & Feature Matrix

- **Cinematic Hero:**
  - Featuring the photorealistic black bear mascot with piercing neon-red glowing eyes and crimson rim lighting (`/src/assets/images/noir_bear_hero_1792407106900.jpg`).
  - Interactive mouse parallax tracking and ambient floating crimson embers canvas.
- **Services (What We Build):**
  - 01 Software Development
  - 02 AI & Machine Learning
  - 03 Web Design & Development
  - 04 Mobile App Development
  - 05 UI/UX Design
  - 06 Cloud & Digital Solutions
- **The NOIR Difference:**
  - "BUILT DIFFERENT. BUILT TO LAST."
  - Strategic comparison matrix and 7 core engineering principles.
- **Projects & Portfolio Showcase:**
  - Concept lab projects (Project KRONOS, VORTEX, AURA, SPECTRE, PULSE, SYNAPSE).
  - Interactive Architectural Blueprint Modal with live sandbox benchmark test simulator.
- **How We Work:**
  - 4-step lifecycle (Discover, Design, Develop, Launch) with desktop horizontal timeline and mobile vertical layout.
- **Advertising-Style Brand Story:**
  - Full-width cinematic climax featuring the wide panoramic bear in crimson smoke (`/src/assets/images/noir_bear_focus_1792407107496.jpg`).
- **About & Live AI Architectural Consultant:**
  - Company mission, pillars, and mascot emblem (`/src/assets/images/noir_bear_portrait_1792407107262.jpg`).
  - Interactive server-side Gemini 3.8 Flash technical consultation engine that formulates instant blueprints.
- **Project Inquiry & Contact Desk:**
  - Connected to backend `POST /api/inquiries`.
  - Rate-limited, field-validated, generates unique reference code (`NOIR-XXXX`), persists to `data/inquiries.json`.

---

## 3. Environment Variables

Create `.env` using `.env.example`:

```bash
# GEMINI_API_KEY: Optional. Powers the server-side AI Architectural Consultant
# In AI Studio, this is automatically injected at runtime.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# PORT: Port to bind Express server (default: 3000)
PORT=3000
```

---

## 4. Setup & Running

```bash
# Install dependencies
npm install

# Start full-stack development server (Express + Vite)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 5. PostgreSQL & Prisma Migration Path

To migrate from the local JSON store (`data/inquiries.json`) to PostgreSQL with Prisma:

1. Install Prisma:
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```
2. Define `schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model ProjectInquiry {
     id              String   @id @default(uuid())
     referenceCode   String   @unique
     fullName        String
     email           String
     company         String?
     projectType     String
     estimatedBudget String?
     description     String
     submittedAt     DateTime @default(now())
     status          String   @default("RECEIVED")
   }
   ```
3. Run migration:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Replace `loadInquiries()` and `saveInquiries()` in `server.ts` with `prisma.projectInquiry.create()`.
