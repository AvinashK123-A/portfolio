import { afterEach } from 'vitest';

type MediaQueryListener = (event: MediaQueryListEvent) => void;

/**
 * Replaces window.matchMedia for the tests in the current file (test files run
 * in isolated environments, so nothing leaks into other files). `matches`
 * decides each query; when its answer changes, call the returned `notify()`
 * so subscribers re-read it.
 */
export function mockMatchMedia(matches: (query: string) => boolean) {
  const listeners = new Set<MediaQueryListener>();
  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches(query);
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, fn: MediaQueryListener) => listeners.add(fn),
    removeEventListener: (_: string, fn: MediaQueryListener) => listeners.delete(fn),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  return {
    listeners,
    notify() {
      for (const fn of listeners) fn({} as MediaQueryListEvent);
    },
  };
}

/** An IntersectionObserver whose intersections the test triggers by hand. */
export class ManualIntersectionObserver {
  static instances: ManualIntersectionObserver[] = [];
  readonly observed = new Set<Element>();
  readonly root = null;
  readonly rootMargin: string;
  readonly thresholds = [];
  disconnected = false;

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    this.rootMargin = options.rootMargin ?? '';
    ManualIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.add(el);
  }
  unobserve(el: Element) {
    this.observed.delete(el);
  }
  disconnect() {
    this.disconnected = true;
    this.observed.clear();
  }
  takeRecords() {
    return [];
  }
  /** Reports `el` as intersecting (or not). */
  trigger(el: Element, isIntersecting = true) {
    this.callback(
      [{ target: el, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 } as never],
      this as unknown as IntersectionObserver,
    );
  }
}

/** Swaps in ManualIntersectionObserver for the tests in the current file (files are isolated). */
export function installManualIntersectionObserver() {
  globalThis.IntersectionObserver =
    ManualIntersectionObserver as unknown as typeof IntersectionObserver;
  afterEach(() => {
    ManualIntersectionObserver.instances = [];
  });
}
