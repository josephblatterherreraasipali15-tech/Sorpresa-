import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GiftItem } from '../types';
import { X, Heart, Sparkles, Copy, Check, ExternalLink, Music } from 'lucide-react';
import { playChime, playKissSound, musicSynth } from '../utils/audio';

interface GiftModalProps {
  gift: GiftItem | null;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ gift, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [actionDone, setActionDone] = useState(false);

  if (!gift) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(gift.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpecialAction = () => {
    setActionDone(true);
    if (gift.specialAction === 'kiss') {
      playKissSound();
    } else if (gift.specialAction === 'music') {
      musicSynth.start();
    } else {
      playChime([523, 659, 783, 1046]);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="gift-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          id="gift-modal-card"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200/80 rounded-3xl p-6 md:p-8 shadow-2xl text-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Corner Flowers */}
          <span className="absolute -top-3 -left-3 text-3xl select-none opacity-40">🌻</span>
          <span className="absolute -bottom-3 -right-3 text-3xl select-none opacity-40">🌼</span>

          {/* Close button */}
          <button
            id="gift-modal-close-button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-amber-800/70 hover:text-amber-950 hover:bg-amber-100/80 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Big Icon with bounce */}
          <div className="relative my-2 inline-flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-6xl md:text-7xl drop-shadow-sm select-none"
            >
              {gift.icon}
            </motion.div>
            {actionDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 1.4, 0] }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center text-4xl pointer-events-none"
              >
                💛
              </motion.div>
            )}
          </div>

          {/* Title and category */}
          <h3 className="text-2xl font-bold text-amber-900 mt-2 tracking-tight">
            {gift.title}
          </h3>
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mt-1">
            {gift.subtitle}
          </p>

          {/* Message Box */}
          <div className="mt-5 p-5 bg-white/90 border border-amber-200/90 rounded-2xl shadow-sm text-amber-900 font-medium text-base leading-relaxed">
            <p>"{gift.message}"</p>
          </div>

          {/* Action triggers depending on gift type */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {gift.specialAction === 'hug' && (
              <button
                id="hug-action-button"
                onClick={handleSpecialAction}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                {actionDone ? '¡Abrazo recibido! 🤗' : 'Recibir abrazo calentito'}
              </button>
            )}

            {gift.specialAction === 'kiss' && (
              <button
                id="kiss-action-button"
                onClick={handleSpecialAction}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-md hover:from-rose-600 hover:to-pink-600 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                {actionDone ? '¡Muack! 😘💛' : 'Dar un besito de vuelta'}
              </button>
            )}

            {gift.specialAction === 'music' && (
              <a
                id="floricienta-song-link"
                href="https://www.youtube.com/results?search_query=Flores+Amarillas+Floricienta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-semibold shadow-md hover:bg-amber-400 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Music className="w-4 h-4" />
                Escuchar en YouTube
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              id="copy-message-button"
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-amber-300 text-amber-800 font-medium hover:bg-amber-100/70 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
