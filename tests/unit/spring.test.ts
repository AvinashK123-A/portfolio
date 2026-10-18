import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createSpring2D } from '@/hooks/spring';

describe('createSpring2D', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('does nothing until a target is set', () => {
    const apply = vi.fn();
    createSpring2D(apply, { stiffness: 80, damping: 20 }, { x: 5, y: 5 });
    vi.advanceTimersByTime(500);
    expect(apply).not.toHaveBeenCalled();
  });

  it('moves towards the target, settles exactly on it and stops scheduling frames', () => {
    const apply = vi.fn();
    const spring = createSpring2D(apply, { stiffness: 80, damping: 20 });
    spring.set(100, -50);

    vi.advanceTimersByTime(100);
    const [midX, midY] = apply.mock.lastCall!;
    expect(midX).toBeGreaterThan(0);
    expect(midX).toBeLessThan(100);
    expect(midY).toBeLessThan(0);
    expect(midY).toBeGreaterThan(-50);

    vi.advanceTimersByTime(5000);
    expect(apply.mock.lastCall).toEqual([100, -50]);
    const calls = apply.mock.calls.length;
    vi.advanceTimersByTime(1000);
    expect(apply.mock.calls.length).toBe(calls);
  });

  it('retargets smoothly while moving and honours mass', () => {
    const light = vi.fn();
    const heavy = vi.fn();
    createSpring2D(light, { stiffness: 80, damping: 20 }).set(100, 0);
    createSpring2D(heavy, { stiffness: 80, damping: 20, mass: 5 }).set(100, 0);
    vi.advanceTimersByTime(200);
    expect(light.mock.lastCall![0]).toBeGreaterThan(heavy.mock.lastCall![0]);

    const spring = createSpring2D(light, { stiffness: 80, damping: 20 });
    spring.set(100, 100);
    vi.advanceTimersByTime(100);
    spring.set(0, 0);
    vi.advanceTimersByTime(5000);
    expect(light.mock.lastCall).toEqual([0, 0]);
  });

  it('stop() cancels the pending frame', () => {
    const apply = vi.fn();
    const spring = createSpring2D(apply, { stiffness: 80, damping: 20 });
    spring.set(100, 100);
    spring.stop();
    vi.advanceTimersByTime(1000);
    expect(apply).not.toHaveBeenCalled();
    spring.stop(); // safe to call twice
  });
});
