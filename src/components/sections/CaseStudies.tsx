// src/sections/CaseStudies.tsx
import { Suspense, lazy } from "react";
import { motion as m, type Variants } from "framer-motion";
import type { CaseStudyVideo } from "../../types/case-studies";
import { useNearViewport } from "../../hooks/useNearViewport"; // ajusta la ruta si tu hook está en otro lugar

type Layout = "auto" | "stacked";

type Props = {
  id?: string;
  title?: string;
  videos: readonly CaseStudyVideo[];
  layout?: Layout;
  minCardPx?: number;
};

export type CaseStudyItem = Readonly<{ title: string; href: string }>;

const YouTubeEmbed = lazy(() => import("../media/YouTubeEmbed"));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

// Tarjeta que se monta cuando se acerca al viewport
function VideoTile({ title, href }: { title: string; href: string }) {
  const { ref, visible } = useNearViewport<HTMLDivElement>("500px");

  return (
    <m.div ref={ref} variants={fadeUp} className="flex flex-col">
      {visible ? (
        <Suspense
          fallback={
            <div className="aspect-video w-full rounded-2xl bg-white/5 animate-pulse" />
          }
        >
          <YouTubeEmbed url={href} title={title} autoplay muted />
        </Suspense>
      ) : (
        <div className="aspect-video w-full rounded-2xl bg-white/5" />
      )}

      <p className="mt-3 text-center text-white/90 font-medium">{title}</p>
    </m.div>
  );
}

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
            <VideoTile
              key={`${video.title}-${index}`}
              title={video.title}
              href={video.href}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
