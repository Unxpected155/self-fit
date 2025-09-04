// src/sections/CaseStudies.tsx
import { motion as m, type Variants } from "framer-motion";
import YouTubeEmbed from "../media/YouTubeEmbed";
import type { CaseStudyVideo } from "../../types/case-studies";

type Layout = "auto" | "stacked";

type Props = {
  id: string;
  title?: string;
  videos: readonly CaseStudyVideo[];
  layout?: Layout;
  minCardPx?: number;
};

export type CaseStudyItem = Readonly<{ title: string; href: string }>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export default function CaseStudies({
  id = "caseStudies",
  title = "Case Studies",
  videos,
  layout = "auto",
  minCardPx = 320,
}: Props) {
  const gridStyle =
    layout === "auto"
      ? { gridTemplateColumns: `repeat(auto-fit, minmax(${minCardPx}px, 1fr))` }
      : undefined;

  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-20 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.h2
          className="text-center font-extrabold uppercase tracking-tight text-[clamp(1.4rem,1rem+2vw,2.2rem)] mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {title}
        </m.h2>

        <m.div
          className={`grid gap-6 ${layout === "stacked" ? "grid-cols-1" : ""}`}
          style={gridStyle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          {videos.map((video, index) => (
            <m.div key={index} variants={fadeUp} className="flex flex-col">
              <YouTubeEmbed
                url={video.href}
                title={video.title}
                autoplay
                muted
              />
              <p className="mt-3 text-center text-white/90 font-medium">
                {video.title}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
