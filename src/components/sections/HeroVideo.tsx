import { ArrowRight } from "lucide-react";
import { motion as m, type Variants } from "framer-motion";
import VideoCard from "../media/VideoCard";
import StatsStrip, { type Stat } from "../ui/StatsStrip";

type CTA = { label: string; href: string; ariaLabel?: string };
type Copy = { title: string; subtitle?: string; cta: CTA };
type Media = { src: string; poster?: string; alt?: string };

type Props = {
  id?: string;
  copy: Copy;
  media: Media;
  stats: ReadonlyArray<Stat>;
};

// Variants locales
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
  stats,
}: Props) {
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
          <m.h1
            className="font-extrabold uppercase tracking-tight text-[clamp(1.6rem,1.1rem+2.4vw,2.75rem)]"
            variants={fadeUp}
          >
            {copy.title}
          </m.h1>
          {copy.subtitle && (
            <m.p
              className="mt-2 text-[clamp(.7rem,1rem+.5vw,1.5rem)] text-primary"
              variants={fadeIn}
            >
              {copy.subtitle}
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
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold bg-primary text-black hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black text-[clamp(1rem,.85rem+.4vw,1.125rem)]"
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
          <StatsStrip stats={stats} />
        </m.div>
      </div>
    </section>
  );
}
