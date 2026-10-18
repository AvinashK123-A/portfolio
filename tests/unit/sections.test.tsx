import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Avatar from '@/components/Avatar';
import ExperienceSection from '@/sections/ExperienceSection';
import SkillsSection from '@/sections/SkillsSection';
import { experience, profile, skillCategories, tools } from '@/data/portfolio';

describe('Avatar', () => {
  it('falls back to the initials when the image fails to load', () => {
    render(<Avatar src={profile.avatarUrl} alt={profile.avatarAlt} initials="ARK" />);
    const img = screen.getByRole('img', { name: profile.avatarAlt });
    expect(img.tagName).toBe('IMG');
    fireEvent.error(img);
    const fallback = screen.getByRole('img', { name: profile.avatarAlt });
    expect(fallback.tagName).toBe('DIV');
    expect(fallback.textContent).toBe('ARK');
  });
});

describe('SkillsSection', () => {
  it('renders every skill as a labelled meter with its level', () => {
    render(<SkillsSection />);
    expect(screen.getByRole('heading', { level: 2, name: 'Technical Expertise' })).toBeTruthy();
    for (const category of skillCategories) {
      expect(
        screen.getByRole('heading', { level: 3, name: new RegExp(category.label) }),
      ).toBeTruthy();
      for (const skill of category.skills) {
        const meter = screen.getByRole('meter', { name: `${skill.name} proficiency` });
        expect(meter.getAttribute('aria-valuenow')).toBe(String(skill.level));
        const bar = meter.firstElementChild as HTMLElement;
        expect(bar.dataset.reveal).toBe('bar');
        expect(bar.style.getPropertyValue('--level')).toBe(`${skill.level}%`);
      }
    }
  });

  it('lists the tools and reveals the section as one group', () => {
    const { container } = render(<SkillsSection />);
    const toolList = screen.getByRole('heading', { name: /Tools & Platforms/ }).nextElementSibling!;
    expect(
      within(toolList as HTMLElement)
        .getAllByRole('listitem')
        .map((li) => li.textContent),
    ).toEqual([...tools]);
    expect(container.querySelector('section')!.hasAttribute('data-reveal-group')).toBe(true);
  });
});

describe('ExperienceSection', () => {
  it('renders the timeline newest first with period, location and tags', () => {
    const { container } = render(<ExperienceSection />);
    const cards = [...container.querySelector('ol')!.children] as HTMLElement[];
    expect(cards).toHaveLength(experience.length);
    experience.forEach((entry, i) => {
      const card = within(cards[i]);
      expect(card.getByRole('heading', { level: 3, name: entry.title })).toBeTruthy();
      expect(card.getByText(entry.period)).toBeTruthy();
      expect(card.getByText(entry.location)).toBeTruthy();
      for (const tag of entry.tags) expect(card.getByText(tag)).toBeTruthy();
    });
  });

  it('marks only the current role and alternates the card sides', () => {
    const { container } = render(<ExperienceSection />);
    expect(screen.getAllByText('Current')).toHaveLength(1);
    const sides = [...container.querySelectorAll('article')].map((a) => a.dataset.reveal);
    expect(sides.slice(0, 3)).toEqual(['left', 'right', 'left']);
  });
});
