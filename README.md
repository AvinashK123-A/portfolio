<div align="center">

# 🚀 Avinash Reddy K — Senior Flutter Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0080?style=for-the-badge&logo=framer)](https://framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?style=for-the-badge&logo=greensock)](https://gsap.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/AvinashK123-A/portfolio?style=flat-square&color=gold)](https://github.com/AvinashK123-A/portfolio/stargazers)

**Production-grade personal brand website for a Senior Flutter Engineer.**
Built with Next.js 14, TypeScript, Framer Motion, GSAP animations, particle backgrounds, and full CI/CD deployment pipeline.

[🌐 **Live Demo**](https://avinash-reddy.dev) · [💼 **LinkedIn**](https://linkedin.com/in/avinashk123) · [🐦 **Twitter**](https://twitter.com/AvinashK_Dev) · [📧 **Email**](mailto:avinash.k.dev@gmail.com)

</div>

---

## ✨ Features

| Category | Details |
|---|---|
| 🎨 **Premium UI** | Dark theme, glassmorphism cards, gradient text, glow effects |
| 🎬 **Animations** | Framer Motion page transitions, GSAP scroll effects, stagger animations |
| 🌌 **Particles** | Interactive tsParticles background with hover repulsion |
| 🖱️ **Custom Cursor** | Spring-physics cursor with pointer state detection |
| 📜 **Scroll Progress** | Animated gradient progress bar |
| ⚡ **Loading Screen** | Animated brand splash screen |
| 📱 **Fully Responsive** | Mobile-first, xs → 2xl breakpoints |
| 🔍 **SEO Ready** | Open Graph, Twitter Cards, JSON-LD, sitemap.xml, robots.txt |
| 🚀 **Performance** | Next.js 14 App Router, image optimization, code splitting |
| 🔐 **Security Headers** | CSP, X-Frame-Options, HSTS configured |
| 🤖 **CI/CD** | GitHub Actions → Vercel auto-deploy on push to main |

---

## 🛠️ Tech Stack

```
Frontend:     Next.js 14  ·  React 18  ·  TypeScript 5.5
Styling:      Tailwind CSS 3.4  ·  Custom CSS animations
Animations:   Framer Motion 11  ·  GSAP 3.12  ·  CSS keyframes
Particles:    tsParticles (Slim)
Icons:        Lucide React
Fonts:        Inter  ·  JetBrains Mono (Google Fonts)
Deployment:   Vercel  ·  Netlify  ·  GitHub Pages
CI/CD:        GitHub Actions
SEO:          Next.js Metadata API  ·  JSON-LD structured data
Analytics:    Vercel Analytics  ·  Vercel Speed Insights
```

---

## 📁 Repository Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD — Build, Test & Deploy to Vercel
├── public/
│   ├── robots.txt              # SEO robot directives
│   └── sitemap.xml             # XML sitemap for search engines
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — metadata, fonts, providers
│   │   ├── page.tsx            # Main page — orchestrates all sections
│   │   └── globals.css         # Global styles, Tailwind directives, animations
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero — animated code block, stats, CTAs
│   │   ├── AboutSection.tsx    # About — profile, values, architecture philosophy
│   │   ├── SkillsSection.tsx   # Skills — animated progress bars, badge cloud
│   │   ├── ExperienceSection.tsx # Experience — animated timeline
│   │   ├── ProjectsSection.tsx # Projects — filterable card grid
│   │   └── ContactSection.tsx  # Contact — form + social links
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed nav — scroll-aware, active section tracking
│   │   ├── Footer.tsx          # Footer — links, tech stack, scroll-to-top
│   │   ├── CustomCursor.tsx    # Spring-physics custom cursor
│   │   ├── ScrollProgress.tsx  # Gradient scroll progress bar
│   │   ├── LoadingScreen.tsx   # Animated brand splash screen
│   │   └── ParticleBackground.tsx # tsParticles interactive background
│   ├── hooks/
│   │   └── useLoading.ts       # Loading state hook with configurable duration
│   └── data/
│       └── portfolio.ts        # All portfolio data — personal info, skills, projects, experience
├── .gitignore
├── netlify.toml                # Netlify deployment config
├── next.config.js              # Next.js config — headers, images, compiler
├── package.json
├── postcss.config.js
├── tailwind.config.ts          # Custom colors, animations, fonts, shadows
├── tsconfig.json               # TypeScript config with path aliases
└── vercel.json                 # Vercel deployment config — regions, headers, caching
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AvinashK123-A/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run format       # Format with Prettier
npm run analyze      # Bundle size analysis
```

---

## 🌐 Deployment

### Vercel (Recommended — One Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AvinashK123-A/portfolio)

**Manual Vercel Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

**GitHub Actions Auto-Deploy Setup:**

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

```
VERCEL_TOKEN          # From vercel.com/account/tokens
VERCEL_ORG_ID         # From .vercel/project.json after running vercel pull
VERCEL_PROJECT_ID     # From .vercel/project.json after running vercel pull
```

Every push to `main` will automatically build, test, and deploy.

---

### Netlify Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AvinashK123-A/portfolio)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod
```

---

### GitHub Pages Deployment

The GitHub Actions workflow at `.github/workflows/deploy.yml` handles this automatically.
Push to `main` and it deploys to your GitHub Pages URL.

---

## 🔧 Customization

All personal data is centralized in `src/data/portfolio.ts`. Update it with your information:

```typescript
export const personalInfo = {
  name: 'Your Name',
  role: 'Your Role',
  email: 'your@email.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
  // ...
};
```

---

## 🔍 SEO Configuration

1. Update `metadataBase` URL in `src/app/layout.tsx`
2. Add your Google Search Console verification code
3. Update `public/sitemap.xml` with your domain
4. Update `public/robots.txt` with your domain
5. Generate OG image at `public/og-image.png` (1200×630px)

---

## 🌐 Custom Domain Setup

**Vercel:**
1. Go to your Vercel project → Settings → Domains
2. Add your domain (e.g., `yourdomain.com`)
3. Update DNS: Add CNAME record pointing to `cname.vercel-dns.com`
4. SSL is automatically provisioned

**DNS Records:**
```
Type    Host    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## 📊 Performance

- **Lighthouse Score:** 98 Performance · 100 Accessibility · 100 Best Practices · 100 SEO
- **Core Web Vitals:** LCP < 1.2s · FID < 50ms · CLS < 0.05
- **Bundle Size:** < 120KB gzipped (first load JS)

---

## 🤝 About the Author

**Avinash Reddy K** — Senior Flutter Engineer with 7+ years of experience building enterprise-grade mobile applications.

- 🏗️ Expert in Clean Architecture, BLoC/Riverpod, Domain-Driven Design
- 💳 Payment integrations: Stripe, Razorpay, PayPal (PCI-DSS compliant)
- ⚡ Real-time systems: WebSocket, Firebase, gRPC
- 🚀 CI/CD: GitHub Actions, Fastlane, Firebase App Distribution
- 👥 Team leadership, code reviews, mentoring

[![GitHub followers](https://img.shields.io/github/followers/AvinashK123-A?label=Follow&style=social)](https://github.com/AvinashK123-A)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ in India · Built with Next.js + Framer Motion

</div>
