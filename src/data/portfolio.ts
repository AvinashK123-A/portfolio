// ============================================================
// SINGLE SOURCE OF TRUTH FOR SITE CONTENT
// Every section, the page metadata, the Open Graph image, robots.txt
// and sitemap.xml read from this file. Edit content here only.
// ============================================================

export interface Profile {
  /** Short display name (navbar, footer). */
  name: string;
  fullName: string;
  /** Initials used for the logo and the avatar fallback. */
  initials: string;
  role: string;
  /** Rotating role titles in the hero. The first one is shown when motion is reduced. */
  roles: readonly string[];
  /** Hero paragraph. */
  summary: string;
  location: string;
  yearsOfExperience: number;
  availability: string;
  email: string;
  /** Kept for reference; not rendered anywhere on the site. */
  phone: string;
  githubUsername: string;
  github: string;
  linkedin: string;
  /** Canonical production URL (no trailing slash). */
  siteUrl: string;
  /**
   * Resume link. Leave `null` to hide every resume button.
   * To publish one, put the PDF in `public/resume/` and set e.g.
   * '/resume/Avinash_Reddy_Resume.pdf' (see README "Adding a resume").
   */
  resumeUrl: string | null;
  avatarUrl: string;
  avatarAlt: string;
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
}

/** Years of professional experience (since Jun 2019). Used in every "N+ years" string. */
const YEARS = 7;

export const profile: Profile = {
  name: 'Avinash Reddy',
  fullName: 'Avinash Reddy Kommareddy',
  initials: 'ARK',
  role: 'Senior Flutter Engineer',
  roles: [
    'Senior Flutter Engineer',
    'Technical Lead',
    'Mobile Architect',
    'Enterprise App Specialist',
  ],
  summary: `${YEARS}+ years of experience building enterprise-grade cross-platform applications across aviation, banking, marine operations, education and healthcare domains. Specialized in Flutter architecture, scalable systems, real-time applications and leading engineering teams.`,
  location: 'Hyderabad, India',
  yearsOfExperience: YEARS,
  availability: 'Open to Senior / Lead / Architect roles',
  email: 'avinash.kommareddybe@gmail.com',
  phone: '+91 7358489100',
  githubUsername: 'AvinashK123-A',
  github: 'https://github.com/AvinashK123-A',
  linkedin: 'https://www.linkedin.com/in/avinash-reddy-0826b0222/',
  siteUrl: 'https://portfolio-xi-three-4uo4n9c.netlify.app',
  resumeUrl: null,
  avatarUrl: 'https://github.com/AvinashK123-A.png?size=640',
  avatarAlt: 'Portrait of Avinash Reddy Kommareddy',
  seo: {
    title: 'Avinash Reddy Kommareddy | Senior Flutter Engineer',
    description: `Senior Flutter Engineer with ${YEARS}+ years of experience building enterprise-grade mobile applications across aviation, banking, marine operations, education and healthcare.`,
    keywords: [
      'Avinash Reddy Kommareddy',
      'Flutter Developer',
      'Senior Flutter Engineer',
      'Mobile Architect',
      'Technical Lead',
      'Flutter',
      'Dart',
      'Clean Architecture',
      'Hyderabad',
      'India',
    ],
  },
};

export interface NavLink {
  label: string;
  href: `#${string}`;
}

/** In-page navigation, in the same order as the sections on the page. */
export const navLinks: readonly NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export const stats: readonly Stat[] = [
  { value: profile.yearsOfExperience, suffix: '+', label: 'Years Experience', icon: '🚀' },
  { value: 500, suffix: 'K+', label: 'Users Impacted', icon: '👥' },
  { value: 10, suffix: '+', label: 'Team Members Mentored', icon: '🎯' },
  { value: 50, suffix: '+', label: 'Institutions Served', icon: '🏛️' },
];

export interface Skill {
  name: string;
  /** Self-assessed proficiency, 0-100. */
  level: number;
  color?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: readonly Skill[];
}

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'mobile',
    label: 'Mobile & UI',
    icon: '📱',
    skills: [
      { name: 'Flutter', level: 98, color: '#54C5F8' },
      { name: 'Dart', level: 97, color: '#0175C2' },
      { name: 'iOS (Swift/ObjC)', level: 75, color: '#FA7343' },
      { name: 'Android (Kotlin)', level: 78, color: '#7F52FF' },
    ],
  },
  {
    id: 'state-management',
    label: 'State Management',
    icon: '🔄',
    skills: [
      { name: 'BLoC / Cubit', level: 97, color: '#7B96FF' },
      { name: 'Riverpod', level: 92, color: '#56EEF4' },
      { name: 'GetX', level: 90, color: '#8ED081' },
      { name: 'Provider', level: 88, color: '#5667FF' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    icon: '⚡',
    skills: [
      { name: 'Firebase', level: 93, color: '#FFCA28' },
      { name: 'REST APIs', level: 96, color: '#00C7B7' },
      { name: 'WebSocket / gRPC', level: 85, color: '#5667FF' },
      { name: 'Node.js', level: 70, color: '#68A063' },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: '🏗️',
    skills: [
      { name: 'Clean Architecture', level: 97 },
      { name: 'SOLID Principles', level: 95 },
      { name: 'Domain-Driven Design', level: 88 },
      { name: 'TDD', level: 85 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: '🚀',
    skills: [
      { name: 'GitHub Actions', level: 88, color: '#2088FF' },
      { name: 'Fastlane', level: 83, color: '#00F200' },
      { name: 'Codemagic', level: 85, color: '#FFCA28' },
      { name: 'Docker', level: 68, color: '#2496ED' },
    ],
  },
];

export const tools: readonly string[] = [
  'Git',
  'Xcode',
  'Android Studio',
  'VS Code',
  'Postman',
  'Charles Proxy',
  'Firebase',
  'Figma',
  'Jira',
  'Azure',
];

export interface Experience {
  id: string;
  /** Short company name shown prominently. */
  company: string;
  /** Legal name / engagement details shown underneath. */
  fullCompany: string;
  title: string;
  period: string;
  location: string;
  current: boolean;
  description: string;
  tags: readonly string[];
  /** Detailed bullet points. Not rendered yet; kept for a future "details" view. */
  achievements: readonly string[];
}

export const experience: readonly Experience[] = [
  {
    id: 'otsi',
    company: 'OTSI',
    fullCompany: 'Object Technology Solutions Inc.',
    title: 'Senior Flutter Engineer',
    period: 'Aug 2025 – Present',
    location: 'Hyderabad, India',
    current: true,
    description:
      'Building mission-critical B2B aviation software for Hyderabad International Airport involving real-time monitoring, airport operations, flight scheduling and enterprise workflows.',
    tags: ['Flutter', 'Real-Time Systems', 'B2B', 'Aviation', 'Enterprise'],
    achievements: [
      'Architecting scalable modular codebase for complex aviation workflows including flight scheduling and gate management',
      'Implementing real-time data synchronization and push notification systems for instant updates across operations',
      'Collaborating with cross-functional teams to deliver a robust enterprise-grade aviation platform',
      'Ensuring high reliability and sub-second response times for airport-critical systems',
    ],
  },
  {
    id: 'allshore',
    company: 'Allshore Technologies',
    fullCompany: 'Allshore Technologies',
    title: 'Technical Lead',
    period: 'Nov 2024 – Jul 2025',
    location: 'Hyderabad, India',
    current: false,
    description:
      'Led scalable Flutter architecture, payment integrations, real-time communication and optimized app performance.',
    tags: ['Flutter', 'GetX', 'WebSockets', 'Stripe', 'PayPal', 'Apple Pay'],
    achievements: [
      'Architected modular Flutter codebase using GetX and SOLID principles, reducing feature development time by ~30%',
      'Engineered real-time appointment booking, push notifications, and live chat using WebSockets and Firebase',
      'Integrated Stripe, PayPal, and Apple Pay processing 1,000+ monthly payments with zero downtime',
      'Optimized app performance, reducing initial load time by 40% and achieving consistent 60fps rendering',
    ],
  },
  {
    id: 'iguru',
    company: 'iGuru Portal Services',
    fullCompany: 'iGuru Portal Services',
    title: 'Technical Lead',
    period: 'Sep 2023 – Oct 2024',
    location: 'Hyderabad, India',
    current: false,
    description:
      'Built school management ecosystem with attendance, GPS tracking and payment solutions deployed across 50+ institutions.',
    tags: ['Flutter', 'Firebase', 'GPS Tracking', 'Razorpay', 'School ERP'],
    achievements: [
      'Led development of iGuruERP deployed across 50+ institutions nationwide',
      'Integrated real-time student tracking, GPS-based bus tracking, and Razorpay payment gateway',
      'Spearheaded cross-functional collaboration reducing production bugs by 35%',
      'Managed app publishing achieving 4.2+ star ratings on Google Play and App Store',
    ],
  },
  {
    id: 'aramco',
    company: 'Saudi Aramco',
    fullCompany: 'Saudi Aramco (via Shras IT Solutions)',
    title: 'Senior Flutter Developer',
    period: 'Jan 2023 – Sep 2023',
    location: 'Dammam, Saudi Arabia',
    current: false,
    description:
      'Built offline-first marine operations system for vessel tracking, crew management, pier & rig operations in low-connectivity environments.',
    tags: ['Flutter', 'Hive DB', 'Offline-First', 'Marine Ops', 'BLoC'],
    achievements: [
      'Built mission-critical marine operations platform for vessel tracking and crew management',
      'Designed offline-first architecture using Flutter and Hive DB for uninterrupted functionality',
      'Developed financial modules for miscellaneous payments, meals & accommodation workflows',
      "Delivered full application lifecycle meeting Aramco's stringent enterprise security standards",
    ],
  },
  {
    id: 'cbq',
    company: 'Commercial Bank of Qatar',
    fullCompany: 'Commercial Bank of Qatar (via Nair Systems)',
    title: 'Flutter Developer',
    period: 'Apr 2021 – Dec 2022',
    location: 'Al Wakrah, Qatar',
    current: false,
    description:
      'Built retail banking features serving 500K+ users including loans, deposits, insurance, international transfers and wealth management with biometric security.',
    tags: ['Flutter', 'Biometric Auth', 'REST APIs', 'Banking', 'SSL Pinning'],
    achievements: [
      'Developed and maintained retail internet banking application serving 500K+ customers',
      'Built international money transfer and bill payment features with REST API integration',
      'Designed UI/UX enhancements with reusable Flutter components, reducing development cycles by 25%',
      'Ensured banking-grade security with biometric authentication, SSL pinning, and encrypted local storage',
    ],
  },
  {
    id: 'walltech',
    company: 'Walltech Software',
    fullCompany: 'Walltech Software Solutions Pvt. Ltd.',
    title: 'Mobile App Developer',
    period: 'Jun 2019 – Mar 2021',
    location: 'Bangalore, India',
    current: false,
    description:
      'Worked on hybrid ecommerce and on-demand applications including VR Deliver and Doorstep Hub, improving native performance through Flutter hybrid framework.',
    tags: ['Flutter', 'React Native', 'E-Commerce', 'On-Demand', 'Firebase'],
    achievements: [
      'Contributed to re-development of VR Deliver (e-commerce) and Doorstep Hub (on-demand services)',
      'Performed application debugging, performance profiling, and continuous optimization',
      'Improved crash rates and overall user retention across deployed applications',
    ],
  },
];

export interface ProjectLinks {
  /** Source repository. */
  github?: string;
  /** Published package page (e.g. pub.dev). */
  package?: string;
  /** Live demo. */
  demo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: readonly string[];
  category: string;
  /** 'open-source' projects have public code; 'client' projects are employer/client work. */
  kind: 'open-source' | 'client';
  featured: boolean;
  links: ProjectLinks;
}

export const projects: readonly Project[] = [
  {
    id: 'scaffold-studio',
    title: 'scaffold_studio',
    description:
      'Published Flutter package that provides a responsive app shell: navigation adapts between a bottom bar, a navigation rail and a sidebar depending on screen size. Includes 10 app bar styles, 7 bottom bar styles, Material 3 theming and accessible common widgets, with no dependencies beyond the Flutter SDK.',
    tech: ['Flutter', 'Dart', 'Material 3', 'Responsive Layout', 'Accessibility'],
    category: 'Flutter Package',
    kind: 'open-source',
    featured: true,
    links: {
      package: 'https://pub.dev/packages/scaffold_studio',
      github: 'https://github.com/AvinashK123-A/scaffold_studio',
    },
  },
  {
    id: 'streamx',
    title: 'StreamX',
    description:
      'Netflix-style streaming app demo built with GetX and Clean Architecture. It runs on mock data, so it showcases UI, navigation and project structure rather than a real streaming backend.',
    tech: ['Flutter', 'GetX', 'Clean Architecture', 'Mock Data'],
    category: 'Demo App',
    kind: 'open-source',
    featured: false,
    links: {
      github: 'https://github.com/AvinashK123-A/streamx',
    },
  },
  {
    id: 'hyd-airport',
    title: 'Hyderabad International Airport (HYD)',
    description:
      'B2B aviation platform for real-time flight monitoring, ground operations, and airport operational control. Mission-critical, offline-resilient, enterprise-grade system.',
    tech: ['Flutter', 'Real-Time Systems', 'WebSockets', 'Firebase', 'Clean Architecture', 'BLoC'],
    category: 'Enterprise',
    kind: 'client',
    featured: false,
    links: {},
  },
  {
    id: 'cbq-banking',
    title: 'CBQ Retail Banking App',
    description:
      'Full-service retail internet banking application for 500K+ customers covering loans, international transfers, insurance, and wealth management with biometric security.',
    tech: ['Flutter', 'BLoC', 'Biometric Auth', 'REST APIs', 'SSL Pinning'],
    category: 'Finance',
    kind: 'client',
    featured: false,
    links: {},
  },
  {
    id: 'iguru',
    title: 'iGuruERP & iGuruPrep',
    description:
      'Leading school management software deployed across 50+ institutions featuring attendance, fee management, GPS bus tracking, academic performance tracking, and parent portals.',
    tech: ['Flutter', 'Firebase', 'GPS Tracking', 'Razorpay', 'BLoC'],
    category: 'EdTech',
    kind: 'client',
    featured: false,
    links: {},
  },
  {
    id: 'aramco-marine',
    title: 'Saudi Aramco Marine Ops',
    description:
      'Offline-first vessel & crew management platform for enterprise marine operations including pier management, rig operations, and financial workflows in low-connectivity environments.',
    tech: ['Flutter', 'Hive DB', 'Offline-First', 'REST APIs'],
    category: 'Enterprise',
    kind: 'client',
    featured: false,
    links: {},
  },
  {
    id: 'massagebook',
    title: 'MassageBook',
    description:
      'Practice management platform for massage therapists covering appointment scheduling, staff management, subscription billing (Stripe/PayPal/Apple Pay), and marketing tools.',
    tech: ['Flutter', 'Stripe', 'PayPal', 'Apple Pay', 'WebSockets', 'Firebase'],
    category: 'Healthcare',
    kind: 'client',
    featured: false,
    links: {},
  },
  {
    id: 'vr-deliver',
    title: 'VR Deliver & Doorstep Hub',
    description:
      'E-commerce and on-demand services platforms rebuilt with Flutter hybrid framework for improved native performance and scalability.',
    tech: ['Flutter', 'React Native', 'Firebase', 'REST APIs'],
    category: 'E-Commerce',
    kind: 'client',
    featured: false,
    links: {},
  },
];
