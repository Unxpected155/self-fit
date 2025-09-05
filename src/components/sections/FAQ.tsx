import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is this program too advanced for me?",
    a: "Not at all. SelfFit is designed for tech professionals at any level, from beginners to those with training experience. Every plan is customized after a mobility and lifestyle assessment.",
  },
  {
    q: "What equipment do I need?",
    a: "We adapt your plan to what you have available: gym access, a home setup with dumbbells, or even just bodyweight. The system works in any environment. In fact many of our clients are constant travelers that at times stay in hotels with little to no equipment.",
  },
  {
    q: "Do I need to follow a strict diet?",
    a: "No. We don’t believe in rigid meal plans. You’ll get daily feedback on your meals so you can keep eating foods you enjoy while still losing fat and building muscle.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients start noticing changes in energy and focus within the first 2 - 3 weeks. Visible fat loss and body composition results typically appear within the first month.",
  },
  {
    q: "I’ve tried many programs before and nothing worked, how is this different?",
    a: "Almost all our clients have told us this! In SelfFit we combine four pillars: mindset, rest, nutrition, and training, tailored to your career, schedule, and lifestyle. That’s why over 40 tech professionals have achieved lasting transformations. You can see more examples on our Instagram: @coachfrankfit.",
  },
  {
    q: "How much time will this take with my busy schedule?",
    a: "Most workouts take 45 to 60 minutes, three to four times per week tops. Plus, the nutrition system saves you time instead of adding stress. The program is designed for efficiency. We focus on proven training methods and combine them with nutrition and recovery strategies to maximize results in minimal time.",
  },
  {
    q: "What’s the investment?",
    a: "We offer a variety of services that adapt to certain needs for you as an individual or for your employees ($100 to $5000), that can be talked about once we understand your specific case. For that I would advise you to book a free consultation call with me or someone from my team.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. If you don’t achieve the goal we set together at the start, you get a full refund, plus we’ll cover the cost of a pizza. Everything is backed by contract.",
  },
  {
    q: "Can this work for teams or companies?",
    a: "SelfFit has directly not only impacted the looks and self satisfaction of many clients, but improved their overall performance to the point which it helped them land career growth opportunities or raises. If you care about your team and their performance, SelfFit is proven to help in such areas.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0); // abre el primero como en el screenshot

  return (
    <section id="faq" className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          FAQ’s
        </h2>

        <ul className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="rounded-xl bg-zinc-900/70 shadow-md">
                {/* Header */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left rounded-xl px-5 py-4
                             hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/60"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-semibold md:font-bold text-base md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "scale-100" : "scale-100"
                    }`}
                    aria-hidden
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {/* Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-zinc-300 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
