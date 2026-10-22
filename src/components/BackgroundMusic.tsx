import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  isMuted: false,
  togglePlay: () => {},
  toggleMute: () => {},
});

export const useMusic = () => useContext(MusicContext);

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

const VIDEO_ID = 'RAQmKOsonhc';

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Load YouTube IFrame API script if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('yt-bg-player', {
        height: '0',
        width: '0',
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID, // Required for loop to work
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            try {
              event.target.unMute();
              event.target.setVolume(75);
              const playPromise = event.target.playVideo();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  setShowAutoPlayPrompt(true);
                });
              }
            } catch {
              setShowAutoPlayPrompt(true);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
            if (event.data === 1) {
              setIsPlaying(true);
              setShowAutoPlayPrompt(false);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          },
          onError: (e: any) => {
            console.warn('YouTube Player error:', e);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // Modern browser autoplay fallback: trigger play on first user interaction anywhere
    const handleFirstUserInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        const state = playerRef.current.getPlayerState ? playerRef.current.getPlayerState() : -1;
        if (state !== 1) {
          playerRef.current.unMute();
          playerRef.current.playVideo();
        }
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsPlaying(true);
        setShowAutoPlayPrompt(false);
      }
    } catch (e) {
      console.warn('Error toggling play:', e);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {
      console.warn('Error toggling mute:', e);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, togglePlay, toggleMute }}>
      {/* Hidden YouTube Player Iframe */}
      <div className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div id="yt-bg-player" />
      </div>

      {children}

      {/* Floating prompt if browser blocked zero-click autoplay */}
      {showAutoPlayPrompt && !isPlaying && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 animate-bounce">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-semibold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform border-2 border-white"
          >
            <Music className="w-4 h-4 animate-spin" />
            <span>Tocar música da festa! 🎶</span>
          </button>
        </div>
      )}

      {/* Floating Music Widget in Bottom Left */}
      <div className="fixed bottom-4 left-4 z-40 bg-white/90 backdrop-blur-md rounded-full px-3.5 py-2 shadow-lg border border-rose-200/80 flex items-center gap-2.5 transition-all hover:shadow-xl">
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
          title={isPlaying ? 'Pausar música' : 'Tocar música de fundo'}
          aria-label="Controle de música de fundo"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-stone-800 tracking-tight flex items-center gap-1">
              Parabéns 🎂
              {isPlaying && (
                <span className="inline-flex items-end gap-0.5 h-3 ml-1">
                  <span className="w-0.5 bg-rose-500 animate-[bounce_0.8s_infinite] h-2.5 rounded-full" />
                  <span className="w-0.5 bg-amber-500 animate-[bounce_0.6s_infinite_0.2s] h-3 rounded-full" />
                  <span className="w-0.5 bg-pink-500 animate-[bounce_0.9s_infinite_0.4s] h-2 rounded-full" />
                </span>
              )}
            </span>
          </div>
          <span className="text-[9px] text-stone-500 truncate max-w-[130px]">
            Pabllo Vittar ft. Psirico
          </span>
        </div>

        <button
          onClick={toggleMute}
          className="text-stone-400 hover:text-stone-700 p-1 rounded-full transition-colors"
          title={isMuted ? 'Desmutar' : 'Mutar'}
          aria-label="Mutar/Desmutar"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </MusicContext.Provider>
  );
};
