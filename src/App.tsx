import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PetalsCanvas } from './components/PetalsCanvas';
import { GiftCard } from './components/GiftCard';
import { GiftModal } from './components/GiftModal';
import { LoveLetter } from './components/LoveLetter';
import { RomanticAudioControl } from './components/RomanticAudioControl';
import { GiftItem } from './types';
import { Sparkles, CalendarHeart } from 'lucide-react';
import { playChime } from './utils/audio';

const GIFTS_DATA: GiftItem[] = [
  {
    id: 'abrazo',
    icon: '🤗',
    title: 'Abrazo Virtual',
    subtitle: 'Para cuando sientas frío',
    message: 'Vuelo 1000km solo para darte este abrazo 🤗 Te extraño mucho mi amor',
    specialAction: 'hug',
    color: '#f59e0b',
  },
  {
    id: 'beso',
    icon: '😘',
    title: 'Beso a Distancia',
    subtitle: 'Guárdalo en tu corazón',
    message: 'Este beso cruzó la distancia para llegar a ti 😘 Eres todo lo que quiero',
    specialAction: 'kiss',
    color: '#f43f5e',
  },
  {
    id: 'cartita',
    icon: '💌',
    title: 'Cartita',
    subtitle: 'Ábreme',
    message: 'Eres mi lugar seguro, mi risa favorita y mi persona. Gracias por elegirme cada día. Te amo, Becker ❤️',
    specialAction: 'letter',
    color: '#eab308',
  },
  {
    id: 'cancion',
    icon: '🎵',
    title: 'Nuestra Canción',
    subtitle: 'Flores Amarillas',
    message: 'Pon: Flores Amarillas - Floricienta 🎵 Y piensa en mí mientras la escuchas. Esta es nuestra canción hoy 🌼',
    specialAction: 'music',
    color: '#8b5cf6',
  },
];

export default function App() {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  const handleOpenGift = (gift: GiftItem) => {
    playChime([523.25, 659.25, 783.99, 1046.50]);
    setSelectedGift(gift);
  };

  const handleCloseModal = () => {
    setSelectedGift(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffde7] via-[#fff9c4] to-[#ffe082] text-[#4e342e] flex flex-col justify-between selection:bg-amber-300 selection:text-amber-950 font-['Poppins',sans-serif]">
      {/* Falling Flower Petals Animation */}
      <PetalsCanvas isEnabled={true} />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-center">
        {/* Floating Flower Header Icons */}
        <motion.div
          id="hero-floating-flowers"
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          className="text-6xl sm:text-7xl md:text-8xl my-4 select-none filter drop-shadow-md inline-block cursor-pointer"
          onClick={() => playChime([659.25, 783.99, 1046.50])}
          title="Toca las flores 🌻"
        >
          🌻🌼🌻
        </motion.div>

        {/* Love date badge */}
        <div className="flex justify-center mb-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-amber-300/80 shadow-sm text-xs sm:text-sm font-semibold text-amber-900 backdrop-blur-xs"
          >
            <CalendarHeart className="w-4 h-4 text-amber-600" />
            <span>Nuestra fecha especial: 30 de Agosto de 2026</span>
          </motion.div>
        </div>

        {/* Main Title */}
        <motion.h1
          id="main-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#e65100] tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Flores Amarillas para ti, Becker
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          id="main-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-base sm:text-xl text-[#5d4037] font-medium mt-3 mb-8 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Porque desde el 30 de Agosto de 2026 mi vida es más bonita contigo <span className="inline-block animate-bounce">💛</span>
        </motion.p>

        {/* Quick hint banner */}
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-800/80 font-medium mb-6 bg-amber-100/60 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Toca los regalitos para descubrir sus sorpresas</span>
        </div>

        {/* Interactive Gifts Grid */}
        <div
          id="gifts-container"
          className="flex justify-center gap-5 sm:gap-6 flex-wrap py-4 px-2 max-w-4xl mx-auto"
        >
          {GIFTS_DATA.map((gift) => (
            <GiftCard key={gift.id} gift={gift} onClick={handleOpenGift} />
          ))}
        </div>

        {/* Love Letter Section */}
        <LoveLetter />
      </main>

      {/* Footer message */}
      <footer className="relative z-10 text-center py-6 text-xs sm:text-sm text-amber-900/70">
        <p className="flex items-center justify-center gap-1">
          Hecho con todo el amor del mundo para Becker 🌻💛
        </p>
      </footer>

      {/* Floating Audio / Floricienta Controls */}
      <RomanticAudioControl />

      {/* Modal Dialog for clicked gifts */}
      <GiftModal gift={selectedGift} onClose={handleCloseModal} />
    </div>
  );
}
