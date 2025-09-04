// src/components/ui/TestimonialCard.tsx
import { motion as m } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  name: string;
  className?: string;
};

export default function TestimonialCard({ src, alt, name, className }: Props) {
  return (
    <m.figure
      whileHover={{ scale: 1.015 }}
      className={[
        "overflow-hidden rounded-xl border border-white/10 bg-black/30",
        "grid grid-rows-[1fr_auto]",
        "aspect-[4/5]",
        className ?? "",
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <figcaption
        className="
          text-center font-medium
          px-4 py-3
          bg-gradient-to-b from-black/40 to-black/70
          border-t border-white/10
          text-white
        "
      >
        {name}
      </figcaption>
    </m.figure>
  );
}
