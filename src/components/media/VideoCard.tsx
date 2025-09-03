// src/components/media/VideoCard.tsx
import React, { useRef, useState, useCallback } from "react";
import { Play } from "lucide-react";

type Props = {
  /** URL del video (mp4/webm) */
  src: string;
  /** Imagen de portada mostrada antes de reproducir */
  poster?: string;
  /** Descripción accesible del contenido del video */
  alt?: string;
  /** Clases extra para el contenedor */
  className?: string;
  /** Repetir cuando termine (desactivado por defecto) */
  loop?: boolean;
  /** Mostrar controles desde el inicio (por defecto solo al reproducir) */
  showControlsInitially?: boolean;
};

export default function VideoCard({
  src,
  poster,
  alt,
  className,
  loop = false,
  showControlsInitially = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(showControlsInitially);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.controls = true;
    v.play().catch(() => {
      v.controls = true;
    });
  }, []);

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      play();
    }
  };

  return (
    <figure className={["relative", className ?? ""].join(" ")}>
      <video
        ref={videoRef}
        className="w-full aspect-[16/9] rounded-2xl object-cover border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
        poster={poster}
        preload="metadata"
        playsInline
        controls={showControlsInitially}
        loop={loop}
      >
        <source src={src} />
        {/* Si tienes otra fuente, agrega:
            <source src="/videos/hero.webm" type="video/webm" />
        */}
        {alt && <track kind="descriptions" label="Description" />}
        {/* Fallback para navegadores muy antiguos */}
        Your navigator doesn't support video HTML5.
      </video>

      {/* Overlay con botón PLAY: desaparece al iniciar */}
      {!started && !showControlsInitially && (
        <button
          type="button"
          onClick={play}
          onKeyDown={onKeyDown}
          aria-label="Play video"
          className="absolute inset-0 grid place-items-center rounded-2xl
                     bg-black/25 backdrop-blur-[1px] hover:bg-black/20
                     transition"
        >
          <span
            className="flex items-center gap-3 text-white font-extrabold
                           tracking-tight select-none
                           text-[clamp(1.1rem,.9rem+1vw,2rem)]"
          >
            <Play size={28} className="-ml-1" />
            WATCH&nbsp;NOW
          </span>
        </button>
      )}

      {alt && <figcaption className="sr-only">{alt}</figcaption>}
    </figure>
  );
}
