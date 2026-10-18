import { describe, expect, it } from 'vitest';
import {
  experience,
  navLinks,
  profile,
  projects,
  skillCategories,
  stats,
  tools,
} from '@/data/portfolio';

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

/** Every link on the site must be absolute https, an in-page anchor, mailto, or a root-relative path. */
const isAllowedHref = (value: string) =>
  isHttpsUrl(value) ||
  /^#[a-z][\w-]*$/.test(value) ||
  value.startsWith('mailto:') ||
  /^\/[\w./-]+$/.test(value);

const duplicates = (values: readonly string[]) =>
  values.filter((value, index) => values.indexOf(value) !== index);

describe('profile', () => {
  it('has all required text fields filled in', () => {
    const required = [
      profile.name,
      profile.fullName,
      profile.initials,
      profile.role,
      profile.summary,
      profile.location,
      profile.availability,
      profile.email,
      profile.githubUsername,
      profile.avatarAlt,
      profile.seo.title,
      profile.seo.description,
    ];
    for (const value of required) expect(value.trim()).not.toBe('');
    expect(profile.roles.length).toBeGreaterThan(0);
    expect(profile.seo.keywords.length).toBeGreaterThan(0);
    expect(profile.yearsOfExperience).toBeGreaterThan(0);
  });

  it('uses absolute https URLs for external profiles', () => {
    for (const url of [profile.github, profile.linkedin, profile.avatarUrl]) {
      expect(isHttpsUrl(url), url).toBe(true);
    }
    expect(profile.github).toBe(`https://github.com/${profile.githubUsername}`);
  });

  it('has a plausible email address', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('contains no phone number anywhere in the content', () => {
    const everything = JSON.stringify({
      profile,
      navLinks,
      stats,
      skillCategories,
      tools,
      experience,
      projects,
    });
    expect(everything).not.toMatch(/\+?\d[\d\s().-]{8,}\d/);
    expect(Object.keys(profile)).not.toContain('phone');
  });

  it('only allows a root-relative or https resume URL when one is set', () => {
    if (profile.resumeUrl !== null) expect(isAllowedHref(profile.resumeUrl)).toBe(true);
  });

  it('keeps the "N+ years" copy in sync with yearsOfExperience', () => {
    const years = `${profile.yearsOfExperience}+ years`;
    expect(profile.summary).toContain(years);
    expect(profile.seo.description).toContain(years);
    expect(stats.find((s) => s.label === 'Years Experience')?.value).toBe(
      profile.yearsOfExperience,
    );
  });
});

describe('navigation', () => {
  it('links to in-page anchors with unique targets', () => {
    for (const link of navLinks) {
      expect(link.label.trim()).not.toBe('');
      expect(link.href).toMatch(/^#[a-z][\w-]*$/);
    }
    expect(duplicates(navLinks.map((l) => l.href))).toEqual([]);
  });
});

describe('projects', () => {
  it('have unique ids and titles', () => {
    expect(duplicates(projects.map((p) => p.id))).toEqual([]);
    expect(duplicates(projects.map((p) => p.title))).toEqual([]);
  });

  it('have the required fields filled in', () => {
    for (const project of projects) {
      expect(project.id).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.trim()).not.toBe('');
      expect(project.description.trim().length).toBeGreaterThan(40);
      expect(project.category.trim()).not.toBe('');
      expect(project.tech.length).toBeGreaterThan(0);
      expect(duplicates(project.tech)).toEqual([]);
    }
  });

  it('only use absolute https links', () => {
    for (const project of projects) {
      for (const url of Object.values(project.links)) {
        if (url !== undefined) expect(isHttpsUrl(url), `${project.id}: ${url}`).toBe(true);
      }
    }
  });

  it('open-source projects link to their public source', () => {
    for (const project of projects.filter((p) => p.kind === 'open-source')) {
      expect(project.links.github, project.id).toMatch(
        new RegExp(`^https://github\\.com/${profile.githubUsername}/`),
      );
    }
  });

  it('feature scaffold_studio first, with its pub.dev page', () => {
    expect(projects[0].id).toBe('scaffold-studio');
    expect(projects[0].featured).toBe(true);
    expect(projects[0].links.package).toBe('https://pub.dev/packages/scaffold_studio');
    expect(projects[0].links.github).toBe('https://github.com/AvinashK123-A/scaffold_studio');
    expect(projects.filter((p) => p.featured)).toHaveLength(1);
  });

  it('do not make compliance or scale claims that cannot be verified', () => {
    const banned = [
      /HIPAA/i,
      /PCI[- ]?DSS/i,
      /PSD2/i,
      /production[- ]tested/i,
      /12,000\+/,
      /5,000\+ concurrent/i,
    ];
    for (const project of projects) {
      for (const pattern of banned) {
        expect(project.description, `${project.id} matches ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it('describe StreamX honestly as a mock-data demo', () => {
    const streamx = projects.find((p) => p.id === 'streamx');
    expect(streamx?.description).toMatch(/mock data/i);
    expect(streamx?.description).toMatch(/GetX/);
    expect(streamx?.description).toMatch(/Clean Architecture/);
  });
});

describe('experience', () => {
  it('has unique ids and complete entries', () => {
    expect(duplicates(experience.map((e) => e.id))).toEqual([]);
    for (const entry of experience) {
      for (const value of [
        entry.company,
        entry.fullCompany,
        entry.title,
        entry.period,
        entry.location,
        entry.description,
      ]) {
        expect(value.trim(), entry.id).not.toBe('');
      }
      expect(entry.tags.length).toBeGreaterThan(0);
    }
  });

  it('has exactly one current role, listed first', () => {
    expect(experience.filter((e) => e.current)).toHaveLength(1);
    expect(experience[0].current).toBe(true);
    expect(experience[0].period).toMatch(/Present$/);
  });
});

describe('skills', () => {
  it('have unique categories and levels between 0 and 100', () => {
    expect(duplicates(skillCategories.map((c) => c.id))).toEqual([]);
    for (const category of skillCategories) {
      expect(category.skills.length).toBeGreaterThan(0);
      for (const skill of category.skills) {
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      }
    }
    expect(duplicates(tools)).toEqual([]);
  });
});
