import React, { useState } from 'react';
import { musicSynth } from '../utils/audio';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const RomanticAudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const status = musicSynth.toggle();
    setIsPlaying(status);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button
        id="ambient-music-toggle"
        onClick={toggleMusic}
        className={`px-4 py-2.5 rounded-full shadow-lg border backdrop-blur-md flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 ${
          isPlaying
            ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-amber-400/40 animate-pulse'
            : 'bg-white/90 text-amber-900 border-amber-200 hover:bg-amber-100/90 shadow-amber-900/10'
        }`}
        title="Melodía romántica de cajita musical"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-bounce text-amber-950" />
            <span>Música activa 🎵</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-amber-700" />
            <span>Melodía suave</span>
          </>
        )}
      </button>

      <a
        id="quick-floricienta-song"
        href="https://www.youtube.com/results?search_query=Flores+Amarillas+Floricienta"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex px-3.5 py-2.5 rounded-full bg-white/90 text-amber-900 border border-amber-200 hover:bg-amber-100 shadow-lg text-xs font-semibold items-center gap-1.5 backdrop-blur-md transition-transform active:scale-95"
        title="Escuchar Flores Amarillas de Floricienta"
      >
        <Music className="w-3.5 h-3.5 text-amber-600" />
        <span>Floricienta</span>
        <Sparkles className="w-3 h-3 text-amber-500" />
      </a>
    </div>
  );
};
