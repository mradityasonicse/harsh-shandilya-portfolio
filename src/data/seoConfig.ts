import { PERSONAL_CONFIG } from './personalConfig';

/**
 * =======================================================================
 * CENTRALIZED SEO CONFIGURATION & METADATA ARCHITECTURE
 * =======================================================================
 * ⚠️ ACTION BEFORE DEPLOYMENT:
 * Set SITE_BASE_URL to your final production domain, e.g.:
 *   "https://harshshandilya.com" or "https://harshkumar.dev"
 * Or set the environment variable VITE_SITE_URL at build time.
 * =======================================================================
 */
export const SITE_BASE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  PERSONAL_CONFIG.siteUrl ||
  'https://YOUR_DOMAIN_HERE.com'
).replace(/\/+$/, '');

export const SEO_METADATA = {
  defaultTitle: 'Harsh Kumar Shandilya — Cybersecurity & Software Developer | Portfolio',
  titleTemplate: '%s | Harsh Kumar Shandilya',
  description:
    "Official portfolio of Harsh Kumar Shandilya — Cybersecurity Analyst, Software Developer, Google Student Ambassador '26, and Student Builder Group Leader at AWS SBG RCET.",
  canonicalUrl: `${SITE_BASE_URL}/`,
  siteName: 'Harsh Kumar Shandilya Portfolio',
  author: 'Harsh Kumar Shandilya',
  locale: 'en_US',
  ogImage: `${SITE_BASE_URL}/harsh-cutout.png`,
  ogImageAlt: 'Harsh Kumar Shandilya — Cybersecurity & Software Developer Portfolio Poster',
  themeColor: '#173f32',
  twitterHandle: '@hackthesparrow',
  keywords: [
    'Harsh Kumar Shandilya',
    'Cybersecurity',
    'Software Developer',
    'Google Student Ambassador 2026',
    'AWS Student Builder Group RCET',
    'B.Tech CSE Cyber Security',
    'Java Developer',
    'Kali Linux',
    'Wireshark Packet Analysis',
    'Penetration Testing',
    'Python',
    'React Portfolio',
    'Rungta University'
  ],
};

/**
 * Section-specific titles and descriptions for active navigation updates
 */
export const SECTION_SEO: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Harsh Kumar Shandilya — Cybersecurity & Software Developer | Portfolio',
    description:
      "B.Tech CSE (Cyber Security) at Rungta University, Google Student Ambassador '26, and Student Builder Group Leader at AWS SBG RCET.",
  },
  about: {
    title: 'About & Engineering Background | Harsh Kumar Shandilya',
    description:
      'Learn about Harsh Kumar Shandilya’s background in defensive cybersecurity, software development, academic focus, and student tech leadership.',
  },
  skills: {
    title: 'Technical Skills & Competencies | Harsh Kumar Shandilya',
    description:
      'Core competencies across Java, C, Python, Kali Linux, Wireshark packet analysis, penetration testing, AWS cloud, and MySQL.',
  },
  projects: {
    title: 'Featured Projects & System Architecture | Harsh Kumar Shandilya',
    description:
      'Engineered projects including File Compression Simulator (Huffman & RLE), Interactive Web Suite, and Network Security Audit Labs.',
  },
  experience: {
    title: 'Experience, Leadership & Certifications | Harsh Kumar Shandilya',
    description:
      'Tenure as Google Student Ambassador 2026, AWS Student Builder Group Leader, and verified credentials in cybersecurity, ML, and Java.',
  },
  resume: {
    title: 'Resume & Verified Credentials | Harsh Kumar Shandilya',
    description:
      'View and download Harsh Kumar Shandilya’s complete resume, university education details, and industry-accredited certifications.',
  },
  contact: {
    title: 'Contact & Collaboration Inquiry | Harsh Kumar Shandilya',
    description:
      'Get in touch with Harsh Kumar Shandilya for software engineering internships, cybersecurity opportunities, or student developer initiatives.',
  },
};

/**
 * Generates Schema.org JSON-LD Graph uniting Person, WebSite, and CreativeWork items
 * using strictly verified details present in the codebase.
 */
export function generateStructuredData(baseUrl: string = SITE_BASE_URL) {
  const profile = PERSONAL_CONFIG;
  const cleanUrl = baseUrl.replace(/\/+$/, '');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebSite Schema
      {
        '@type': 'WebSite',
        '@id': `${cleanUrl}/#website`,
        url: `${cleanUrl}/`,
        name: SEO_METADATA.siteName,
        description: SEO_METADATA.description,
        inLanguage: 'en-US',
        publisher: {
          '@id': `${cleanUrl}/#person`,
        },
      },

      // 2. Person Schema (Primary entity)
      {
        '@type': 'Person',
        '@id': `${cleanUrl}/#person`,
        name: profile.name,
        alternateName: [profile.moniker, 'Harsh Shandilya'],
        url: `${cleanUrl}/`,
        image: {
          '@type': 'ImageObject',
          url: `${cleanUrl}/harsh-cutout.png`,
          caption: `${profile.name} - ${profile.role}`,
        },
        jobTitle: profile.role,
        description: profile.tagline,
        email: `mailto:${profile.email}`,
        telephone: profile.phone || undefined,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bhilai',
          addressRegion: 'Chhattisgarh',
          addressCountry: 'IN',
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: profile.education.institution,
          description: profile.education.degree,
        },
        sameAs: [
          profile.githubUrl,
          profile.linkedinUrl,
          profile.twitterUrl !== 'https://x.com' ? profile.twitterUrl : undefined,
        ].filter(Boolean),
        knowsAbout: [
          'Java Programming',
          'Cybersecurity',
          'Linux Administration',
          'Kali Linux',
          'Wireshark Network Analysis',
          'Penetration Testing Fundamentals',
          'Algorithms & Data Structures',
          'AWS Cloud Fundamentals',
          'Frontend Development with React',
          'Community Leadership',
        ],
        hasCredential: profile.achievements.map((item) => ({
          '@type': 'EducationalOccupationalCredential',
          name: item.title,
          credentialCategory: item.category,
          recognizedBy: {
            '@type': 'Organization',
            name: item.issuer,
          },
          url: item.credentialUrl,
        })),
      },

      // 3. CreativeWork / SoftwareSourceCode Schemas for Projects
      ...profile.projects.map((proj) => ({
        '@type': proj.type === 'Java & Algorithms' || proj.type === 'Frontend Engineering'
          ? 'SoftwareSourceCode'
          : 'CreativeWork',
        '@id': `${cleanUrl}/#project-${proj.id}`,
        name: proj.title,
        headline: proj.tagline,
        description: proj.description,
        creator: {
          '@id': `${cleanUrl}/#person`,
        },
        programmingLanguage: proj.techStack.join(', '),
        codeRepository: proj.githubUrl,
        url: proj.demoUrl || proj.githubUrl,
      })),
    ],
  };
}
