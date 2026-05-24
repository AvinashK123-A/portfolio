'use client';
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => { await loadSlim(engine); }, []);
  return (
    <Particles id="tsparticles" init={particlesInit} options={{
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: { events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } }, modes: { repulse: { distance: 100 }, push: { quantity: 2 } } },
      particles: {
        color: { value: ['#5667ff', '#d926ec', '#7b96ff'] },
        links: { color: '#5667ff', distance: 150, enable: true, opacity: 0.08, width: 1 },
        move: { enable: true, outModes: { default: 'bounce' }, random: true, speed: 0.6 },
        number: { density: { enable: true, area: 1200 }, value: 60 },
        opacity: { value: { min: 0.05, max: 0.3 } },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    }} />
  );
}
