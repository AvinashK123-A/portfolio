// ============================================================
// CENTRALIZED PROFILE CONFIGURATION
// All personal details live here. Edit this file ONLY.
// Every component imports from this config.
// ============================================================

export const PROFILE = {
  // --- Identity ---
  name: 'Avinash Reddy',
  fullName: 'Avinash Reddy K',
  role: 'Senior Software Engineer',
  tagline: 'Flutter & Mobile Engineer',
  headline: 'Building Production-Scale Mobile Experiences',
  description: 'Senior Flutter Engineer with 7+ years of experience architecting and shipping enterprise-grade mobile applications. Expert in Clean Architecture, real-time systems, payment integrations, and leading high-performance teams.',
  shortBio: 'Senior Flutter Engineer | 7+ Years | Clean Architecture | Real-Time Systems',
  location: 'India',
  yearsOfExperience: 7,
  availability: 'Open to Senior / Lead / Architect roles',
  philosophy: 'Ship systems that scale. Write code that communicates. Review with precision. Lead through example.',

  // --- Contact ---
  email: 'avinashreddy@gmail.com',

  // --- Social Links (ALL CORRECT - verified) ---
  github: 'https://github.com/AvinashK123-A',
  linkedin: 'https://www.linkedin.com/in/avinash-reddy-0826b0222/',
  twitter: '',
  medium: '',

  // --- Portfolio & Resume ---
  portfolioUrl: 'https://avinashk123-a-portfolio.vercel.app',
  resumeUrl: '/resume.pdf',

  // --- Profile Image ---
  profileImage: 'https://avatars.githubusercontent.com/u/AvinashK123-A?v=4',
  profileImageAlt: 'Avinash Reddy - Senior Software Engineer',

  // --- SEO / Open Graph ---
  siteTitle: 'Avinash Reddy | Senior Software Engineer',
  siteDescription: 'Senior Flutter Engineer with 7+ years of experience. Expert in Clean Architecture, real-time mobile systems, payment integrations, and enterprise-grade applications.',
  siteKeywords: 'Avinash Reddy, Flutter Developer, Senior Software Engineer, Mobile Engineer, Flutter, Dart, Clean Architecture, India',
  canonicalUrl: 'https://avinashk123-a-portfolio.vercel.app',
  ogImage: 'https://avinashk123-a-portfolio.vercel.app/og-image.png',
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

// CTA Button links
export const CTA_LINKS = {
  viewResume: '/resume.pdf',
  downloadResume: '/resume.pdf',
  githubProfile: 'https://github.com/AvinashK123-A',
  linkedin: 'https://www.linkedin.com/in/avinash-reddy-0826b0222/',
  contactSection: '#contact',
  projectsSection: '#projects',
} as const;

export default PROFILE;
