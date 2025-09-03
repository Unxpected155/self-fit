import { motion as m, type Variants } from "framer-motion";

type Testimonial = { src: string; alt: string };
type Props = {
  id?: string;
  title?: string;
  items: ReadonlyArray<Testimonial>;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function Testimonials({
  id = "testimonials",
  title = "Their Results",
  items,
}: Props) {
  const shown = items.slice(0, 12);

  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-20 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.h2
          className="text-center font-extrabold uppercase tracking-tight text-[clamp(1.3rem,1rem+1.6vw,2rem)] mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {title}
        </m.h2>

        <m.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          {shown.map((t, i) => (
            <m.figure
              key={i}
              variants={scaleIn}
              whileHover={{ scale: 1.015 }}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/30"
            >
              <img
                src={t.src}
                alt={t.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </m.figure>
          ))}
        </m.div>
      </div>
    </section>
  );
}
