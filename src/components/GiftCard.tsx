import React from 'react';
import { motion } from 'motion/react';
import { GiftItem } from '../types';
import { Sparkles } from 'lucide-react';

interface GiftCardProps {
  gift: GiftItem;
  onClick: (gift: GiftItem) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, onClick }) => {
  return (
    <motion.button
      id={`gift-card-${gift.id}`}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={() => onClick(gift)}
      className="group relative bg-white/95 backdrop-blur-sm w-full sm:w-[240px] p-6 rounded-[26px] shadow-[0_8px_25px_rgba(245,158,11,0.22)] hover:shadow-[0_16px_32px_rgba(245,158,11,0.32)] border border-amber-100 flex flex-col items-center text-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      {/* Subtle glowing badge */}
      <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-600" /> Abrir
      </span>

      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="text-5xl mb-3 select-none drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
      >
        {gift.icon}
      </motion.div>

      {/* Title */}
      <h4 className="text-xl font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
        {gift.title}
      </h4>

      {/* Subtitle */}
      <p className="text-sm text-amber-700/80 font-normal mt-1">
        {gift.subtitle}
      </p>

      {/* Action cue */}
      <div className="mt-4 pt-3 border-t border-amber-100 w-full flex items-center justify-center gap-1 text-xs font-semibold text-amber-600 group-hover:text-amber-800">
        <span>Tocar para ver</span>
        <span className="group-hover:translate-x-0.5 transition-transform">✨</span>
      </div>
    </motion.button>
  );
};
