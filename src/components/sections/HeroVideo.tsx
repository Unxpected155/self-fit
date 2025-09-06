// src/sections/HeroVideo.tsx
import { ArrowRight } from "lucide-react";
import { motion as m, type Variants } from "framer-motion";
import { useEffect, useState, type JSX } from "react";
import VideoCard from "../media/VideoCard";
// Si no quieres mostrar stats aquí, puedes quitar la importación y el bloque de <StatsStrip />
import StatsStrip from "../ui/StatsStrip";

type CTA = { label: string; href: string; ariaLabel?: string };

type Copy = {
  preheadline?: string; // pequeño, en color primario
  headline: string; // grande, principal
  subheadline?: string; // soporte debajo
  cta: CTA;
};

type Media = {
  src: string; // ruta a tu MP4 (self-hosted)
  poster?: string; // WebP/JPG del primer frame
  alt?: string; // texto alternativo
};

type Props = {
  id?: string;
  copy: Copy;
  media: Media;
};

// Variants de animación
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

export default function HeroVideo({
  id = "program",
  copy,
  media,
}: Props): JSX.Element {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  useEffect(() => {
    type RIC = (
      cb: (d: { didTimeout: boolean; timeRemaining(): number }) => void,
      options?: { timeout: number }
    ) => number;

    const onLoad = () => {
      const ric: RIC | undefined = (
        window as Window & { requestIdleCallback?: RIC }
      ).requestIdleCallback;
      if (typeof ric === "function") {
        ric(() => setShowVideo(true));
      } else {
        // Fallback si el navegador no soporta requestIdleCallback
        setTimeout(() => setShowVideo(true), 600);
      }
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const posterSrc = media.poster ?? "/photos/hero-1280.webp";
  const altText = media.alt ?? "SelfFit hero";

  return (
    <section
      id={id}
      aria-label="Hero"
      className="scroll-mt-24 py-12 md:py-16 section-anchor"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Encabezado */}
        <m.header
          className="text-center mb-6 md:mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={stagger}
        >
          {copy.preheadline && (
            <m.p
              className="italic text-primary font-semibold uppercase tracking-wide
                         text-[clamp(1rem,.9rem+.35vw,1.2rem)]"
              variants={fadeIn}
            >
              {copy.preheadline}
            </m.p>
          )}

          <m.h1
            className="font-extrabold italic tracking-tight
                       text-[clamp(1.8rem,1.2rem+3vw,3rem)]"
            variants={fadeUp}
          >
            {copy.headline}
          </m.h1>

          {copy.subheadline && (
            <m.p
              className="italic mt-2 text-[clamp(.95rem,.85rem+.45vw,1.25rem)] text-white/80 whitespace-pre-line"
              variants={fadeIn}
            >
              {copy.subheadline}
            </m.p>
          )}
        </m.header>

        {/* Media: primero imagen (LCP), luego video diferido */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <div
            className="relative mb-6 md:mb-8 rounded-2xl overflow-hidden
  w-full sm:w-11/12 md:w-4/5 lg:w-3/5
  mx-auto aspect-video
  max-h-[50vh]"
          >
            {/* LCP: imagen prioritaria */}
            {!showVideo && (
              <img
                src={posterSrc}
                // si tienes distintas resoluciones del poster, añade srcSet/sizes:
                // srcSet="/photos/hero-640.webp 640w, /photos/hero-1280.webp 1280w, /photos/hero-1920.webp 1920w"
                sizes="100vw"
                alt={altText}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Video: se monta después del idle */}
            {showVideo && (
              <VideoCard
                src={media.src}
                alt={altText}
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </m.div>

        {/* CTA */}
        <m.div
          className="flex justify-center mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <m.a
            href={copy.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.cta.ariaLabel ?? copy.cta.label}
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold
                       bg-primary text-white hover:opacity-95 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-primary
                       focus-visible:ring-offset-2 focus-visible:ring-offset-black
                       text-[clamp(1rem,.85rem+.4vw,1.125rem)]"
          >
            {copy.cta.label}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </m.a>
        </m.div>

        {/* Stats (opcional) */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-6"
        >
          <StatsStrip />
        </m.div>
      </div>
    </section>
  );
}
