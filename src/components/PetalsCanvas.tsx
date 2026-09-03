import React, { useEffect, useRef, useState } from 'react';

interface PetalItem {
  x: number;
  y: number;
  speedY: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  symbol: string;
  opacity: number;
}

interface BurstItem {
  id: number;
  x: number;
  y: number;
  symbol: string;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
}

const FLOWER_SYMBOLS = ['🌼', '🌻', '🌼', '💛', '✨', '🌻', '🌼'];

export const PetalsCanvas: React.FC<{ isEnabled?: boolean }> = ({ isEnabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bursts, setBursts] = useState<BurstItem[]>([]);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const PETAL_COUNT = Math.min(32, Math.floor(window.innerWidth / 35));
    const petals: PetalItem[] = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: 1 + Math.random() * 2,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayAmplitude: 20 + Math.random() * 30,
        swayOffset: Math.random() * Math.PI * 2,
        size: 16 + Math.random() * 18,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        symbol: FLOWER_SYMBOLS[Math.floor(Math.random() * FLOWER_SYMBOLS.length)],
        opacity: 0.4 + Math.random() * 0.55,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        const currentX = p.x + Math.sin(time * p.swaySpeed * 60 + p.swayOffset) * p.swayAmplitude;

        ctx.save();
        ctx.translate(currentX, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();

        // Wrap around top
        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  // Click burst animation effect
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newBursts: BurstItem[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: clickX,
      y: clickY,
      symbol: ['💛', '🌼', '🌻', '✨', '💐'][i % 5],
      vx: (Math.random() - 0.5) * 6,
      vy: -2 - Math.random() * 4,
      opacity: 1,
      scale: 1,
    }));

    setBursts((prev) => [...prev.slice(-15), ...newBursts]);
  };

  useEffect(() => {
    if (bursts.length === 0) return;
    const interval = setInterval(() => {
      setBursts((prev) =>
        prev
          .map((b) => ({
            ...b,
            x: b.x + b.vx,
            y: b.y + b.vy,
            vy: b.vy + 0.1, // gravity
            opacity: b.opacity - 0.03,
            scale: b.scale + 0.02,
          }))
          .filter((b) => b.opacity > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [bursts]);

  return (
    <div
      id="petals-canvas-container"
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden"
      onClick={handleScreenClick}
      title="Toca en cualquier parte para enviar flores y amor 🌻"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
      {bursts.map((b) => (
        <span
          key={b.id}
          className="absolute pointer-events-none select-none text-2xl"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            opacity: b.opacity,
            transform: `scale(${b.scale})`,
            transition: 'transform 0.05s linear',
          }}
        >
          {b.symbol}
        </span>
      ))}
    </div>
  );
};
