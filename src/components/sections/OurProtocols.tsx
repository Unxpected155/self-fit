import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const cards = [
  {
    n: "1",
    title: "MINDSET",
    body: "Every transformation starts in the mind. We work on your identity, habits, and mental discipline so change sticks. Weekly 1:1 calls and our private community keep you accountable and motivated, even on your busiest weeks.",
  },
  {
    n: "2",
    title: "REST",
    body: "Sleep isn’t the same as recovery. We teach you how to reduce stress, improve sleep quality, and optimize hormones. From evening routines to proven recovery strategies, you’ll wake up sharper, with energy you didn’t know you had.",
  },
  {
    n: "3",
    title: "NUTRITION",
    body: "No crash diets. We start with what you already eat and improve it step by step. You’ll get daily feedback and clear strategies to hit your targets without skipping family meals. That’s how fat loss becomes sustainable and effortless.",
  },
  {
    n: "4",
    title: "EXERCISE",
    body: "We start with a movement assessment to design training that fits your body, schedule, and goals. You’ll train for strength, fat loss, and posture with efficient sessions. Maximum of 3 hours per week is enough to drive results and still fit into your life.",
  },
];

export default function OurProtocols() {
  return (
    <section
      id="protocols"
      className="relative py-24 md:py-28 section-anchor"
      aria-label="Our Protocols"
    >
      {/* Fondo: gradiente + patrón sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(60% 45% at 50% -10%, rgba(218,81,31,0.18), transparent 60%),
            radial-gradient(35% 30% at 100% 0%, rgba(218,81,31,0.10), transparent 60%),
            radial-gradient(30% 25% at 0% 20%, rgba(218,81,31,0.08), transparent 60%),
            linear-gradient(180deg, rgba(14,14,14,0.92) 0%, rgba(10,10,10,0.92) 60%, rgba(8,8,8,0.95) 100%),
            url("data:image/svg+xml;utf8,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.06)'/></svg>`
            )}")
          `,
          backgroundSize: "cover, cover, cover, cover, 16px 16px",
          backgroundPosition: "center, center, center, center, 0 0",
          backgroundRepeat:
            "no-repeat, no-repeat, no-repeat, no-repeat, repeat",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Encabezado */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <p className="text-sm tracking-widest font-semibold text-[#DA511F]">
            OUR FOCUS
          </p>
          <h2 className="mt-2 text-3xl/tight md:text-4xl/tight font-extrabold text-white">
            Building Lasting Results, Step by Step
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-300">
            Most programs push diets or workouts in isolation. At SelfFit, we
            focus on the four areas that actually drive change, so busy
            professionals don’t just lose weight, they rebuild their health and
            keep it for life.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2">
          {cards.map((c, i) => (
            <motion.article
              key={c.n}
              className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 p-5 sm:p-6 md:p-7 shadow-[0_6px_30px_rgba(0,0,0,0.35)] hover:bg-zinc-900/70 transition-colors"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.05 * i, duration: 0.45 }}
            >
              {/* Número grande lateral */}
              <div className="absolute -left-3 -top-3 h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-br from-[#DA511F] to-[#b5411a] text-white font-extrabold text-xl shadow-[0_8px_24px_rgba(218,81,31,0.45)]">
                {c.n}
              </div>

              <h3 className="pl-8 text-lg md:text-xl font-extrabold text-white tracking-wide">
                {c.title}
              </h3>
              <p className="mt-3 pl-8 text-sm md:text-base text-zinc-300">
                {c.body}
              </p>

              {/* Borde activo al hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-[#DA511F]/40 transition" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
