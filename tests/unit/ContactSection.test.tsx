import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactSection from '@/sections/ContactSection';
import { profile } from '@/data/portfolio';
import { withResume } from './withResume';

describe('ContactSection', () => {
  it('links to email, GitHub and LinkedIn from the content module', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { level: 2, name: /get in touch/i })).toBeTruthy();
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain(`mailto:${profile.email}`);
    expect(hrefs).toContain(profile.github);
    expect(hrefs).toContain(profile.linkedin);
  });

  it('opens external links with rel="noopener noreferrer"', () => {
    render(<ContactSection />);
    for (const link of screen.getAllByRole('link')) {
      if (link.getAttribute('target') === '_blank') {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }
    }
  });

  it('hides the resume button when no resume is configured', () => {
    render(<ContactSection />);
    expect(screen.queryByRole('link', { name: /resume/i })).toBeNull();
  });

  describe('with a resume configured', () => {
    withResume();
    it('shows the resume button', () => {
      render(<ContactSection />);
      expect(screen.getByRole('link', { name: /download resume/i }).getAttribute('href')).toBe(
        '/resume/test.pdf',
      );
    });
  });
});
