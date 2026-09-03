import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Copy, Check, Sparkles } from 'lucide-react';
import { playChime } from '../utils/audio';

export const LoveLetter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const letterText = `Becker, hoy 21 de septiembre te regalo flores amarillas 🌻

Significan que te pienso, que te quiero y que estoy aquí aunque estemos lejos.
Empezamos el 30 de agosto de 2026 y desde ese día supe que eras especial.

Gracias por las risas a distancia, por los "buenos días" y por esperarme.
Eres mi persona favorita en todo el mundo.

Pronto cerraremos esta distancia y te daré flores amarillas de verdad.
Mientras tanto, quédate con estas y con todo mi amor.

Te amo ❤️`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendLove = () => {
    setLikeCount((prev) => prev + 1);
    setShowHearts(true);
    playChime([659.25, 783.99, 987.77, 1318.51]);
    setTimeout(() => setShowHearts(false), 1200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-12 px-4">
      {/* Decorative floating sunflowers on letter sides */}
      <div className="hidden sm:block absolute -left-6 top-8 text-4xl select-none animate-float-gentle">
        🌻
      </div>
      <div className="hidden sm:block absolute -right-6 bottom-12 text-4xl select-none animate-float-gentle" style={{ animationDelay: '1.5s' }}>
        🌼
      </div>

      <motion.div
        id="love-letter-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative bg-[#fffdf0] border-4 border-dashed border-amber-300 rounded-[30px] p-6 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(245,158,11,0.25)] overflow-hidden"
      >
        {/* Wax seal simulation */}
        <div className="absolute top-4 right-5 sm:top-6 sm:right-8 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border-2 border-amber-300 shadow-md flex items-center justify-center text-xl text-white select-none">
            💛
          </div>
        </div>

        {/* Ribbon / Date badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          21 de Septiembre • Día de las Flores Amarillas
        </div>

        {/* Letter Heading */}
        <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-amber-900 font-bold tracking-tight mb-6">
          Para el amor de mi vida
        </h3>

        {/* Letter Text Content */}
        <div className="space-y-4 text-amber-950 font-normal text-base sm:text-lg leading-relaxed sm:leading-loose text-left font-['Poppins']">
          <p>
            <span className="font-semibold text-amber-800 text-xl font-serif-display">Becker</span>, hoy 21 de septiembre te regalo flores amarillas 🌻
          </p>
          <p>
            Significan que te pienso, que te quiero y que estoy aquí aunque estemos lejos.
            Empezamos el 30 de agosto de 2026 y desde ese día supe que eras especial.
          </p>
          <p>
            Gracias por las risas a distancia, por los "buenos días" y por esperarme.
            Eres mi persona favorita en todo el mundo.
          </p>
          <p>
            Pronto cerraremos esta distancia y te daré flores amarillas de verdad.
            Mientras tanto, quédate con estas y con todo mi amor.
          </p>
          <p className="text-xl sm:text-2xl font-bold text-amber-800 pt-2 flex items-center gap-2">
            <span>Te amo</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
          </p>
        </div>

        {/* Handwritten signature vibe */}
        <div className="mt-8 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-handwriting text-2xl sm:text-3xl text-amber-800 font-bold">
            Siempre contigo 🌻
          </div>

          <div className="flex items-center gap-2">
            <button
              id="send-love-letter-button"
              onClick={handleSendLove}
              className="relative px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Heart className={`w-4 h-4 fill-white ${showHearts ? 'animate-ping' : ''}`} />
              <span>Enviar amor</span>
              {likeCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/25 text-xs font-bold">
                  +{likeCount}
                </span>
              )}
            </button>

            <button
              id="copy-letter-button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-full border border-amber-300 text-amber-800 hover:bg-amber-100/80 font-medium text-sm flex items-center gap-1.5 transition-colors"
              title="Copiar carta de amor"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copiada</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
