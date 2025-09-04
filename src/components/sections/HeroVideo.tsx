// src/sections/HeroVideo.tsx
import { ArrowRight } from "lucide-react";
import { motion as m, type Variants } from "framer-motion";
import VideoCard from "../media/VideoCard";
import StatsStrip from "../ui/StatsStrip";

type CTA = { label: string; href: string; ariaLabel?: string };

// Nuevo esquema de copy
type Copy = {
  preheadline?: string; // pequeño, en color primario
  headline: string; // grande, el principal (con itálicas)
  subheadline?: string; // soporte debajo
  cta: CTA;
};

type Media = { src: string; poster?: string; alt?: string };

type Props = {
  id?: string;
  copy: Copy;
  media: Media;
};

// Variants
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

export default function HeroVideo({ id = "program", copy, media }: Props) {
  return (
    <section id={id} aria-label="Hero" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
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
                         text-[clamp(.8rem,.7rem+.35vw,1rem)]"
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
              className="italic mt-2 text-[clamp(.95rem,.85rem+.45vw,1.25rem)] text-white/80"
              variants={fadeIn}
            >
              {copy.subheadline}
            </m.p>
          )}
        </m.header>

        {/* Video */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <VideoCard
            src={media.src}
            poster={media.poster}
            alt={media.alt}
            autoPlay
            muted
            loop={false} // ponlo en true si quieres repetir
            controls={true} // o false si no quieres controles visibles
            preload="metadata"
            className="mb-6 md:mb-8"
          />
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

        {/* Stats */}
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
