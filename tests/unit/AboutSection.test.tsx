import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutSection from '@/sections/AboutSection';
import { profile } from '@/data/portfolio';

describe('AboutSection (hero)', () => {
  it('renders the name as the only h1', () => {
    render(<AboutSection />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toContain(profile.name);
  });

  it('shows the avatar with descriptive alt text', () => {
    render(<AboutSection />);
    const img = screen.getByRole('img', { name: profile.avatarAlt });
    expect(img.getAttribute('src')).toBe(profile.avatarUrl);
  });

  it('hides the resume button when no resume is configured', () => {
    render(<AboutSection />);
    expect(screen.queryByRole('link', { name: /resume/i })).toBeNull();
  });
});
