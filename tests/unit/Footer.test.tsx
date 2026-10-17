import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from '@/components/Footer';
import { navLinks, profile } from '@/data/portfolio';
import { withResume } from './withResume';

describe('Footer', () => {
  it('has a labelled footer navigation using real anchors', () => {
    render(<Footer />);
    const nav = screen.getByRole('navigation', { name: 'Navigation' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual(navLinks.map((l) => l.href));
  });

  it('shows the copyright with the current year and full name', () => {
    render(<Footer />);
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()} ${profile.fullName}`)),
    ).toBeTruthy();
  });

  it('links to GitHub, LinkedIn and email', () => {
    render(<Footer />);
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining([profile.github, profile.linkedin, `mailto:${profile.email}`]),
    );
  });

  it('hides the resume link when no resume is configured', () => {
    render(<Footer />);
    expect(screen.queryByRole('link', { name: /resume/i })).toBeNull();
  });

  describe('with a resume configured', () => {
    withResume();
    it('shows the resume link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /download resume/i })).toBeTruthy();
    });
  });
});
