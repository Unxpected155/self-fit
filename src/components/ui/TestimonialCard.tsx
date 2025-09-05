// src/ui/TestimonialCard.tsx
import { motion as m } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  name: string;
  className?: string;
  /** Aspect ratio CSS: "4 / 5", "1 / 1", "16 / 9"... */
  aspect?: string;
};

export default function TestimonialCard({
  src,
  alt,
  name,
  className = "",
  aspect = "4 / 5",
}: Props) {
  return (
    <m.figure
      whileHover={{ scale: 1.015 }}
      className={[
        "relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-sm",
        className,
      ].join(" ")}
      // Usamos aspect-ratio por CSS para evitar redondeos y gaps
      style={{ aspectRatio: aspect }}
    >
      {/* Imagen llena toda la card */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 block h-full w-full object-cover"
        draggable={false}
      />

      {/* Caption como overlay al fondo: SIN separación */}
      <figcaption className="absolute inset-x-0 bottom-0">
        <div className="px-4 py-3 text-center font-medium text-white bg-gradient-to-t from-black/80 to-transparent leading-none">
          {name}
        </div>
      </figcaption>
    </m.figure>
  );
}
