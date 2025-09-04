import { motion as m } from "framer-motion";

type Props = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;

  /** Auto-reproducción (default: true) */
  autoPlay?: boolean;
  /** Silenciado por defecto (default: true) */
  muted?: boolean;
  /** Repetir (default: false) */
  loop?: boolean;
  /** Mostrar controles nativos (default: true) */
  controls?: boolean;
  /** Preload (default: "metadata") */
  preload?: "none" | "metadata" | "auto";
  playsInline?: boolean;
};

export default function VideoCard({
  src,
  poster,
  alt,
  className,
  autoPlay = true,
  muted = true,
  loop = false,
  controls = true,
  preload = "metadata",
  playsInline = true,
}: Props) {
  return (
    <m.div
      className={[
        "overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_10px_30px_rgba(0,0,0,.35)]",
        className ?? "",
      ].join(" ")}
      whileHover={{ scale: 1.0025 }}
    >
      <video
        className="w-full h-full"
        src={src}
        poster={poster}
        // Autoplay compatible con políticas de navegador:
        autoPlay={autoPlay}
        muted={muted}
        playsInline={playsInline}
        loop={loop}
        controls={controls}
        preload={preload}
        // Pequeño “nudge”: si el navegador bloquea autoplay, intenta reproducir al cargar metadata
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (autoPlay && muted && v.paused) {
            v.play().catch(() => {
              /* si el navegador bloquea, no hacemos nada */
            });
          }
        }}
        aria-label={alt ?? "Video"}
      />
    </m.div>
  );
}
