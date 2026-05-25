// ============================================================
// CENTRALIZED PROFILE CONFIGURATION
// All personal details live here. Edit this file ONLY.
// Every component imports from this config.
// ============================================================

export const PROFILE = {
    // --- Identity ---
    name: 'Avinash Reddy',
    fullName: 'Avinash Reddy Kommareddy',
    role: 'Senior Flutter Engineer',
    tagline: 'Senior Flutter Engineer | Technical Lead | Mobile Architect',
    headline: 'Building Enterprise-Grade Cross-Platform Applications',
    description: 'Results-driven Senior Flutter Engineer with 7+ years of experience architecting and delivering high-performance cross-platform mobile, web, and desktop applications. Currently building mission-critical B2B aviation software for Hyderabad International Airport at OTSI. Demonstrated expertise in clean architecture, SOLID principles, and scalable state management across enterprise projects spanning aviation, fintech, marine operations, healthcare, and education.',
    shortBio: 'Senior Flutter Engineer | 7+ Years | Enterprise Scale | Aviation, Banking, Marine, EdTech',
    location: 'Hyderabad, India',
    yearsOfExperience: 7,
    availability: 'Open to Senior / Lead / Architect roles',
    philosophy: 'Ship systems that scale. Write code that communicates. Review with precision. Lead through example.',

    // --- Contact ---
    email: 'avinash.kommareddybe@gmail.com',
    phone: '+91 7358489100',

    // --- Social Links ---
    github: 'https://github.com/AvinashK123-A',
    linkedin: 'https://www.linkedin.com/in/avinash-reddy-0826b0222/',
    twitter: '',
    medium: '',

    // --- Portfolio & Resume ---
    portfolioUrl: 'https://portfolio-xi-three-4uo4n9c.netlify.app',
    resumeUrl: '/resume/Avinash_Reddy_Resume.pdf',

    // --- Profile Image ---
    profileImage: 'https://avatars.githubusercontent.com/u/AvinashK123-A?v=4',
    profileImageAlt: 'Avinash Reddy Kommareddy - Senior Flutter Engineer',

    // --- SEO / Open Graph ---
    siteTitle: 'Avinash Reddy Kommareddy | Senior Flutter Engineer',
    siteDescription: 'Senior Flutter Engineer with 7+ years of experience building enterprise-grade mobile applications across aviation, banking, marine operations, education and healthcare.',
    siteKeywords: 'Avinash Reddy Kommareddy, Flutter Developer, Senior Flutter Engineer, Mobile Architect, Technical Lead, Flutter, Dart, Clean Architecture, Hyderabad, India',
    canonicalUrl: 'https://portfolio-xi-three-4uo4n9c.netlify.app',
    ogImage: 'https://portfolio-xi-three-4uo4n9c.netlify.app/og-image.png',
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  ] as const;

// CTA Button links
export const CTA_LINKS = {
    viewResume: '/resume/Avinash_Reddy_Resume.pdf',
    downloadResume: '/resume/Avinash_Reddy_Resume.pdf',
    githubProfile: 'https://github.com/AvinashK123-A',
    linkedin: 'https://www.linkedin.com/in/avinash-reddy-0826b0222/',
    contactSection: '#contact',
    projectsSection: '#projects',
} as const;

export default PROFILE;
