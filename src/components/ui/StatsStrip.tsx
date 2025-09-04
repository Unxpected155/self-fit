// components/StatsStrip.tsx
import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
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
    titleLine1: "HAPPY",
    titleLine2: "CLIENTS",
    duration: 1.2,
  },
  { value: 4, titleLine1: "AREAS", titleLine2: "OF FOCUS", duration: 1.2 },
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
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <section ref={ref} className="w-full bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:divide-x md:divide-white/10 text-center md:text-left">
          {stats.map((s, i) => (
            <div key={i} className={`px-0 md:px-10`}>
              <StatCard stat={s} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
