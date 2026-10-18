export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

export interface Spring2D {
  /** Moves the spring's target; the value follows on animation frames. */
  set(x: number, y: number): void;
  /** Cancels any pending frame. */
  stop(): void;
}

const REST_DELTA = 0.01;
/** Longest simulated step, so a backgrounded tab does not make the spring jump. */
const MAX_STEP_SECONDS = 1 / 30;

/**
 * A tiny 2D spring (semi-implicit Euler) driven by requestAnimationFrame.
 * It calls `apply` with the current position on every frame until it comes to
 * rest, then stops scheduling frames. Used for the mouse glow and hero parallax
 * so they do not need an animation library.
 */
export function createSpring2D(
  apply: (x: number, y: number) => void,
  { stiffness, damping, mass = 1 }: SpringConfig,
  initial: { x: number; y: number } = { x: 0, y: 0 },
): Spring2D {
  let x = initial.x;
  let y = initial.y;
  let vx = 0;
  let vy = 0;
  let targetX = x;
  let targetY = y;
  let frame = 0;
  let last = 0;

  const step = (now: number) => {
    const dt = Math.min(Math.max((now - last) / 1000, 0), MAX_STEP_SECONDS);
    last = now;
    vx += ((stiffness * (targetX - x) - damping * vx) / mass) * dt;
    vy += ((stiffness * (targetY - y) - damping * vy) / mass) * dt;
    x += vx * dt;
    y += vy * dt;

    const atRest =
      Math.abs(targetX - x) < REST_DELTA &&
      Math.abs(targetY - y) < REST_DELTA &&
      Math.abs(vx) < REST_DELTA &&
      Math.abs(vy) < REST_DELTA;
    if (atRest) {
      x = targetX;
      y = targetY;
      vx = 0;
      vy = 0;
      frame = 0;
    } else {
      frame = requestAnimationFrame(step);
    }
    apply(x, y);
  };

  return {
    set(nextX, nextY) {
      targetX = nextX;
      targetY = nextY;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    },
    stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}
