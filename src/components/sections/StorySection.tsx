import { motion as m, type Variants } from "framer-motion";

type Props = {
  id?: string;
  image: { src: string; alt: string };
  title: string;
  paragraphs: ReadonlyArray<string>;
  cta?: { label: string; href: string };
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export default function StorySection({
  id = "story",
  image,
  title,
  paragraphs,
  cta,
}: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-20 section-anchor">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        {/* Imagen */}
        <m.figure
          className="order-1 lg:order-none"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={scaleIn}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="rounded-2xl object-cover w-full shadow-[0_10px_30px_rgba(0,0,0,.35)] border border-white/10"
          />
        </m.figure>

        {/* Texto */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <m.h2
            className="uppercase font-extrabold tracking-tight text-[clamp(1.4rem,1rem+2vw,2.2rem)] mb-4"
            variants={fadeUp}
          >
            {title}
          </m.h2>

          <div className="space-y-4 text-white/80 leading-relaxed">
            {paragraphs.map((p, i) => (
              <m.p key={i} variants={fadeUp}>
                {p}
              </m.p>
            ))}
          </div>

          {cta && (
            <m.div className="mt-6" variants={fadeUp}>
              <m.a
                href={cta.href}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-xl px-6 py-3 font-semibold bg-primary text-white hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {cta.label}
              </m.a>
            </m.div>
          )}
        </m.div>
      </div>
    </section>
  );
}
