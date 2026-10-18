import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectsSection from '@/sections/ProjectsSection';
import { projects } from '@/data/portfolio';

describe('ProjectsSection', () => {
  it('features scaffold_studio with its pub.dev and GitHub links', () => {
    render(<ProjectsSection />);
    const featured = screen.getByTestId('featured-project');
    expect(within(featured).getByRole('heading', { name: 'scaffold_studio' })).toBeTruthy();
    expect(
      within(featured)
        .getByRole('link', { name: /pub\.dev/ })
        .getAttribute('href'),
    ).toBe('https://pub.dev/packages/scaffold_studio');
    expect(
      within(featured)
        .getByRole('link', { name: /Source/ })
        .getAttribute('href'),
    ).toBe('https://github.com/AvinashK123-A/scaffold_studio');
  });

  it('renders every project exactly once', () => {
    render(<ProjectsSection />);
    for (const project of projects) {
      expect(screen.getAllByRole('heading', { name: project.title })).toHaveLength(1);
    }
  });

  it('opens every external link safely in a new tab', () => {
    render(<ProjectsSection />);
    const external = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href')?.startsWith('http'));
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.textContent).toContain('(opens in a new tab)');
    }
  });

  it('has no resume call-to-action', () => {
    render(<ProjectsSection />);
    expect(screen.queryByRole('link', { name: /resume/i })).toBeNull();
  });
});
