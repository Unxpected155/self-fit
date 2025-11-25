import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0); // abre el primero como en el screenshot

  const faqs = [
    {
      q: t("faq.items.1.question"),
      a: t("faq.items.1.answer"),
    },
    {
      q: t("faq.items.2.question"),
      a: t("faq.items.2.answer"),
    },
     {
      q: t("faq.items.3.question"),
      a: t("faq.items.3.answer"),
    },
     {
      q: t("faq.items.4.question"),
      a: t("faq.items.4.answer"),
    },
     {
      q: t("faq.items.5.question"),
      a: t("faq.items.5.answer"),
    },
     {
      q: t("faq.items.6.question"),
      a: t("faq.items.6.answer"),
    },
     {
      q: t("faq.items.7.question"),
      a: t("faq.items.7.answer"),
    },
     {
      q: t("faq.items.8.question"),
      a: t("faq.items.8.answer"),
    },
     {
      q: t("faq.items.9.question"),
      a: t("faq.items.9.answer"),
    },
  ];

  return (
    <section
      id="faq"
      className="bg-black text-white py-16 px-6 md:px-12 scroll-mt-8 section-anchor"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {t("faq.title")}
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
