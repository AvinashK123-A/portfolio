import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navbar from '@/components/Navbar';
import { navLinks, profile } from '@/data/portfolio';
import { withResume } from './withResume';

describe('Navbar', () => {
  it('renders a main navigation with every section link', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const link of navLinks) {
      // Desktop list is always rendered; the mobile copy is hidden until opened.
      expect(within(nav).getByRole('link', { name: link.label })).toHaveProperty('hash', link.href);
    }
  });

  it('toggles the mobile menu and keeps aria-expanded in sync', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole('button', { name: 'Open menu' });
    const menu = document.getElementById(button.getAttribute('aria-controls')!)!;

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(menu.hidden).toBe(true);

    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.getAttribute('aria-label')).toBe('Close menu');
    expect(menu.hidden).toBe(false);
    expect(within(menu).getAllByRole('link')).toHaveLength(navLinks.length);

    // Choosing a destination closes the menu.
    await user.click(within(menu).getByRole('link', { name: 'Projects' }));
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(menu.hidden).toBe(true);
  });

  it('closes the mobile menu with Escape', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole('button', { name: 'Open menu' });
    await user.click(button);
    await user.keyboard('{Escape}');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('hides the resume button when no resume is configured', () => {
    expect(profile.resumeUrl).toBeNull();
    render(<Navbar />);
    expect(screen.queryByRole('link', { name: /resume/i, hidden: true })).toBeNull();
  });

  describe('with a resume configured', () => {
    withResume('/resume/cv.pdf');
    it('shows a download link to it', () => {
      render(<Navbar />);
      const link = screen.getByRole('link', { name: 'Resume' });
      expect(link.getAttribute('href')).toBe('/resume/cv.pdf');
      expect(link.hasAttribute('download')).toBe(true);
    });
  });
});
