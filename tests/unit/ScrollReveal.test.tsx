import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ScrollReveal from '@/components/ScrollReveal';
import { reveal, revealGroup } from '@/components/reveal';
import { ManualIntersectionObserver, installManualIntersectionObserver } from './browserMocks';

installManualIntersectionObserver();

function Page() {
  return (
    <>
      <section data-testid="group" {...revealGroup}>
        <div data-testid="a" {...reveal('up')} />
        <div data-testid="b" {...reveal('left', { delay: 0.2 })} />
      </section>
      <div data-testid="single" {...reveal('scale', { duration: 0.3 })} />
      <ScrollReveal />
    </>
  );
}

describe('reveal()', () => {
  it('returns the data attribute and timing variables', () => {
    expect(reveal('up')).toEqual({ 'data-reveal': 'up', style: {} });
    expect(reveal('bar', { delay: 0.25, duration: 1 }, { color: 'red' })).toEqual({
      'data-reveal': 'bar',
      style: { color: 'red', '--reveal-delay': '0.25s', '--reveal-duration': '1s' },
    });
  });
});

describe('ScrollReveal', () => {
  it('observes groups and standalone elements, not elements inside a group', () => {
    const { getByTestId } = render(<Page />);
    const [observer] = ManualIntersectionObserver.instances;
    expect([...observer.observed]).toEqual([getByTestId('group'), getByTestId('single')]);
    expect(observer.rootMargin).toBe('0px 0px -80px 0px');
  });

  it('reveals every element of a group together, once', () => {
    const { getByTestId } = render(<Page />);
    const [observer] = ManualIntersectionObserver.instances;
    const group = getByTestId('group');

    observer.trigger(group, false);
    expect(getByTestId('a').hasAttribute('data-revealed')).toBe(false);

    observer.trigger(group);
    expect(getByTestId('a').hasAttribute('data-revealed')).toBe(true);
    expect(getByTestId('b').hasAttribute('data-revealed')).toBe(true);
    expect(getByTestId('single').hasAttribute('data-revealed')).toBe(false);
    expect(observer.observed.has(group)).toBe(false);

    observer.trigger(getByTestId('single'));
    expect(getByTestId('single').hasAttribute('data-revealed')).toBe(true);
  });

  it('disconnects on unmount', () => {
    const { unmount } = render(<Page />);
    const [observer] = ManualIntersectionObserver.instances;
    unmount();
    expect(observer.disconnected).toBe(true);
  });

  it('reveals everything at once when IntersectionObserver is unavailable', () => {
    const original = globalThis.IntersectionObserver;
    // @ts-expect-error simulating an old browser
    delete globalThis.IntersectionObserver;
    try {
      const { getByTestId } = render(<Page />);
      for (const id of ['a', 'b', 'single']) {
        expect(getByTestId(id).hasAttribute('data-revealed')).toBe(true);
      }
    } finally {
      globalThis.IntersectionObserver = original;
    }
  });
});
