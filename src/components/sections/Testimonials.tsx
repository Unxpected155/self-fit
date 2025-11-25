import { motion as m, type Variants } from "framer-motion";
import TestimonialCard from "../ui/TestimonialCard";
import { useTranslation } from "react-i18next";

type Testimonial = { src: string; alt: string; name: string };
type Props = {
  id?: string;
  title?: string;
  items: ReadonlyArray<Testimonial>;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function Testimonials({
  id = "testimonials",
  title = "Their Results",
  items,
}: Props) {
  const { t } = useTranslation();
  const shown = items.slice(0, 12);

  return (
    <section
      id={id}
      className="scroll-mt-24 py-16 md:py-20 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.h2
          className="text-center font-extrabold uppercase tracking-tight text-[clamp(1.3rem,1rem+1.6vw,2rem)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {title}
        </m.h2>

        {/* Subheadline */}
        <m.p
          className="mt-2 mb-10 text-center text-[#A6A6A6] text-[clamp(.95rem,.85rem+.45vw,1.25rem)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {t("testimonials.subheadline")}
        </m.p>

        <m.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          {shown.map((t, i) => (
            <TestimonialCard key={i} src={t.src} alt={t.alt} name={t.name} />
          ))}
        </m.div>

        {/* Footer CTA */}
        <m.div
          className="mt-12 md:mt-16 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p className="mb-4 text-[clamp(1rem,.9rem+.4vw,1.25rem)] text-white">
            {t("testimonials.cta.label")}
          </p>
          <m.a
            href="https://calendly.com/coachfrankfit/selffit-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-xl px-5 py-2.5 bg-primary text-white font-medium hover:opacity-90
                       text-[clamp(.95rem,.8rem+.3vw,1.05rem)]"
          >
            {t("testimonials.cta.button")}
          </m.a>
        </m.div>
      </div>
    </section>
  );
}
