import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AnimatedCounter from '@/components/AnimatedCounter';
import HeroParallax from '@/components/HeroParallax';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import RoleSwitcher from '@/components/RoleSwitcher';
import TimelineProgress from '@/components/TimelineProgress';
import {
  ManualIntersectionObserver,
  mockMatchMedia,
  installManualIntersectionObserver,
} from './browserMocks';

installManualIntersectionObserver();

let reduceMotion = false;
let finePointer = true;
const media = mockMatchMedia((query) => {
  if (query.includes('prefers-reduced-motion: reduce')) return reduceMotion;
  if (query.includes('pointer: fine')) return finePointer && !reduceMotion;
  return false;
});

beforeEach(() => {
  reduceMotion = false;
  finePointer = true;
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

const rect = (top: number, height: number, left = 0, width = 0) =>
  ({ top, height, left, width, bottom: top + height, right: left + width }) as DOMRect;

describe('AnimatedCounter', () => {
  it('is server-rendered with the final value and counts up once in view', () => {
    const { container } = render(<AnimatedCounter value={50} suffix="+" />);
    const visible = container.querySelector('[aria-hidden="true"]')!;
    expect(screen.getByText('50+', { selector: '.sr-only' })).toBeTruthy();
    expect(visible.textContent).toBe('50+');

    const [observer] = ManualIntersectionObserver.instances;
    observer.trigger(visible, false);
    expect(visible.textContent).toBe('50+');
    observer.trigger(visible);
    expect(visible.textContent).toBe('0+');
    expect(observer.disconnected).toBe(true);

    act(() => vi.advanceTimersByTime(900));
    const mid = Number.parseInt(visible.textContent!, 10);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(50);

    act(() => vi.advanceTimersByTime(2000));
    expect(visible.textContent).toBe('50+');
  });

  it('does not animate when motion is reduced', () => {
    reduceMotion = true;
    render(<AnimatedCounter value={7} suffix="+" />);
    expect(ManualIntersectionObserver.instances).toHaveLength(0);
  });
});

describe('RoleSwitcher', () => {
  const roles = ['Engineer', 'Lead', 'Architect'];
  const opacities = (container: HTMLElement) =>
    [...container.querySelectorAll('[aria-hidden="true"] > p')].map(
      (p) => (p as HTMLElement).style.opacity,
    );

  it('lists every role for screen readers and rotates the visible one', () => {
    const { container } = render(<RoleSwitcher roles={roles} />);
    expect(screen.getByText('Engineer, Lead, Architect')).toBeTruthy();
    expect(opacities(container)).toEqual(['1', '0', '0']);
    act(() => vi.advanceTimersByTime(2500));
    expect(opacities(container)).toEqual(['0', '1', '0']);
    act(() => vi.advanceTimersByTime(5000));
    expect(opacities(container)).toEqual(['1', '0', '0']);
  });

  it('stays on the first role when motion is reduced', () => {
    reduceMotion = true;
    const { container } = render(<RoleSwitcher roles={roles} />);
    act(() => vi.advanceTimersByTime(10_000));
    expect(opacities(container)).toEqual(['1', '0', '0']);
  });
});

describe('MouseGlowEffect', () => {
  it('follows the mouse with a spring', () => {
    const { container } = render(<MouseGlowEffect />);
    const glow = container.firstElementChild as HTMLElement;
    expect(glow.getAttribute('aria-hidden')).toBe('true');
    expect(glow.style.transform).toContain('translate3d(-400px, -400px, 0)');

    fireEvent.mouseMove(window, { clientX: 300, clientY: 200 });
    act(() => vi.advanceTimersByTime(5000));
    expect(glow.style.transform).toBe('translate3d(300px, 200px, 0) translate(-50%, -50%)');
  });

  it('renders nothing for touch pointers or reduced motion, and reacts to changes', () => {
    finePointer = false;
    const { container } = render(<MouseGlowEffect />);
    expect(container.firstElementChild).toBeNull();
    finePointer = true;
    act(() => media.notify());
    expect(container.firstElementChild).not.toBeNull();
  });
});

describe('HeroParallax', () => {
  it('moves its content towards the pointer and back on leave', () => {
    render(
      <HeroParallax className="outer">
        <span>avatar</span>
      </HeroParallax>,
    );
    const inner = screen.getByText('avatar').parentElement!;
    const outer = inner.parentElement!;
    expect(outer.className).toBe('outer');
    outer.getBoundingClientRect = () => rect(0, 400, 0, 400);

    fireEvent.mouseMove(outer, { clientX: 300, clientY: 100 });
    act(() => vi.advanceTimersByTime(5000));
    // (300 - 200) * 0.08 = 8, (100 - 200) * 0.08 = -8
    expect(inner.style.transform).toBe('translate3d(8px, -8px, 0)');

    fireEvent.mouseLeave(outer);
    act(() => vi.advanceTimersByTime(5000));
    expect(inner.style.transform).toBe('none');
  });

  it('ignores the pointer when motion is reduced', () => {
    reduceMotion = true;
    render(
      <HeroParallax>
        <span>avatar</span>
      </HeroParallax>,
    );
    const inner = screen.getByText('avatar').parentElement!;
    fireEvent.mouseMove(inner.parentElement!, { clientX: 300, clientY: 100 });
    act(() => vi.advanceTimersByTime(5000));
    expect(inner.style.transform).toBe('');
  });
});

describe('TimelineProgress', () => {
  it('grows with the scroll position of its section', () => {
    const { container, unmount } = render(
      <section>
        <TimelineProgress className="line" style={{ background: 'red' }} />
      </section>,
    );
    const section = container.querySelector('section')!;
    const line = container.querySelector('.line') as HTMLElement;
    expect(line.style.background).toBe('red');
    window.innerHeight = 1000;

    const scrollTo = (top: number) => {
      section.getBoundingClientRect = () => rect(top, 1000);
      fireEvent.scroll(window);
      act(() => vi.advanceTimersByTime(20));
    };

    scrollTo(1200); // still below the viewport
    expect(line.style.height).toBe('0%');
    scrollTo(100); // progress (1000 - 100) / 2000 = 0.45 -> 0.45 / 0.9 = 50%
    expect(line.style.height).toBe('50%');
    scrollTo(-900); // progress 0.95 -> clamped to 100%
    expect(line.style.height).toBe('100%');

    fireEvent(window, new Event('resize'));
    unmount();
  });

  it('does nothing outside a section', () => {
    const { container } = render(<TimelineProgress className="line" />);
    fireEvent.scroll(window);
    expect((container.firstElementChild as HTMLElement).style.height).toBe('0%');
  });
});
