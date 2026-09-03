export interface GiftItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  message: string;
  specialAction?: 'hug' | 'kiss' | 'letter' | 'music';
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  symbol: string;
  opacity: number;
}
