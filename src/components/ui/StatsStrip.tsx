// components/StatsStrip.tsx
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Stat = {
  value: number;
  suffix?: string;
  titleLine1: string;
  titleLine2?: string;
  duration?: number;
};

const stats: Stat[] = [
  {
    value: 20,
    suffix: "+",
    titleLine1: "YEARS",
    titleLine2: "OF EXPERTISE",
    duration: 1.2,
  },
  {
    value: 40,
    suffix: "+",
    titleLine1: "LIFES",
    titleLine2: "TRANSFORMED",
    duration: 1.2,
  },
  { value: 4, titleLine1: "CORE", titleLine2: "PILLARDS", duration: 1.2 },
];

function CountUp({
  value,
  suffix = "",
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (prefersReduced) {
      if (ref.current)
        ref.current.textContent = `${Math.round(value)}${suffix}`;
      return;
    }
    const unsub = spring.on("change", (latest) => {
      if (ref.current)
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
    });

    mv.set(0);
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      mv.set(value * p);
      if (p < 1) requestAnimationFrame(tick);
    };
    const r = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(r);
      unsub();
    };
  }, [value, suffix, duration, mv, spring, prefersReduced]);

  return <span ref={ref} aria-label={`${value}${suffix}`} />;
}

function StatCard({ stat, delay = 0 }: { stat: Stat; delay?: number }) {
  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center md:items-start gap-2"
    >
      <div className="text-5xl md:text-6xl font-extrabold leading-none text-center md:text-left">
        <CountUp
          value={stat.value}
          suffix={stat.suffix}
          duration={stat.duration}
        />
      </div>
      <div className="text-sm md:text-xs tracking-wide font-bold uppercase opacity-80 text-center md:text-left">
        {stat.titleLine1}
      </div>
      {stat.titleLine2 && (
        <div className="text-sm md:text-xs tracking-wide font-bold uppercase opacity-80 text-center md:text-left -mt-1">
          {stat.titleLine2}
        </div>
      )}
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-black">
          {/* Canvas inset: fondo + grid + glow, con FADE en los bordes */}
          <div
            className="absolute inset-2 sm:inset-3 rounded-[inherit]"
            style={{
              backgroundImage: `
                /* Grid */
                repeating-linear-gradient(to right, rgba(255,255,255,0.17) 0 .1px, transparent 1px 40px),
                repeating-linear-gradient(to bottom, rgba(255,255,255,0.10) 0 .1px, transparent 1px 40px),
                /* Halo naranja largo y suave */
                radial-gradient(120% 58% at 50% 50%, rgba(234,97,40,0.20) 0%, rgba(234,97,40,0.15) 32%, transparent 72%),
                /* Base negra con ligera transición */
                linear-gradient(180deg, #000 0%, #000 60%,#000 100%)
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",

              /* FADE en las orillas para que el patrón no “toque” el borde redondeado */
              WebkitMaskImage:
                "radial-gradient(120% 85% at 50% 50%, #000 58%, transparent 100%)",
              maskImage:
                "radial-gradient(120% 85% at 50% 50%, #000 58%, transparent 100%)",

              /* Sombra interna sutil para fundir aún más con el marco negro */
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)",
            }}
          />

          {/* Vignette global MUY sutil encima del canvas */}
          <div
            className="absolute inset-2 sm:inset-3 rounded-[inherit] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(130% 100% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* Contenido */}
          <div className="relative z-10 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-row justify-center items-stretch gap-4 sm:gap-6 lg:gap-16 text-center">
              {stats.map((s, i) => (
                <div key={i} className="px-2 sm:px-4 lg:px-10">
                  <StatCard stat={s} delay={i * 0.08} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
