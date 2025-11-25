import i18n from "../../i18n"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion as m, AnimatePresence, type Variants } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import useWindowSize from "../../hooks/useWindowSize";


// Animations
const headerIn: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const listStagger: Variants = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const itemIn: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const mobileMenu: Variants = {
  hidden: { opacity: 0, scaleY: 0.9, originY: 0 },
  show: {
    opacity: 1,
    scaleY: 1,
    originY: 0,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scaleY: 0.95,
    originY: 0,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("es");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
    i18n.changeLanguage(lang);
  };

  const LINKS = [
  { id: "intro", label: t("nav.links.intro") },
  { id: "myStory", label: t("nav.links.myStory") },
  { id: "method", label: t("nav.links.method") },
  { id: "successStories", label: t("nav.links.successStories") },
  { id: "faq", label: t("nav.links.faq") },
] as const;


  const { width } = useWindowSize();
  const { active, handleNavClick } = useActiveSection(
    LINKS.map((l) => l.id),
    { offsetTop: 96 }
  );

  useEffect(() => {
    if (width >= 768 && open) setOpen(false);
  }, [width, open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <m.header
      initial="hidden"
      animate="show"
      variants={headerIn}
      className={`sticky top-0 z-50 backdrop-blur border-b border-white/10 ${
        open ? "h-auto" : "h-14 sm:h-20 md:h-18 lg:h-20"
      } transition-[height] duration-200 ${
        scrolled
          ? "bg-black/70 shadow-[0_1px_0_rgba(255,255,255,.08)]"
          : "bg-black/50"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:block p-2 bg-white text-black"
      >
        {t("jumpToContent", "Jump to main content")}
      </a>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-between">
          {/* Brand */}
          <m.a
            href="#intro"
            onClick={handleNavClick("intro")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-bold tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl"
            aria-label="Go to intro"
          >
            <img
              src="/photos/SelfFit_Logo_Blanco.webp"
              alt="SelfFit logo"
              className="size-20 md:size-28 lg:size-32 object-contain"
            />
          </m.a>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden md:block">
            <m.ul
              initial="hidden"
              animate="show"
              variants={listStagger}
              className="flex items-center gap-5 lg:gap-7"
            >
              {LINKS.map((l) => (
                <m.li key={l.id} variants={itemIn}>
                  <m.a
                    href={`#${l.id}`}
                    onClick={handleNavClick(l.id)}
                    whileHover={{ y: -1 }}
                    aria-current={active === l.id ? "page" : undefined}
                    className={`transition-colors underline-offset-4 hover:text-primary ${
                      active === l.id
                        ? "font-bold text-white"
                        : "font-normal text-white/80"
                    } text-[clamp(.95rem,.75rem+.35vw,1.05rem)]`}
                  >
                    {l.label}
                  </m.a>
                </m.li>
              ))}
            </m.ul>
          </nav>

          {/* Desktop Language Button */}
          <button
            onClick={toggleLang}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-colors"
          >
            <img
              src={lang === "en" ? "/flags/en.svg" : "/flags/es.svg"}
              alt="Language"
              className="w-5 h-5"
            />
            <span className="text-white text-sm">
              {lang === "en" ? "EN" : "ES"}
            </span>
          </button>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <m.a
              href="https://calendly.com/coachfrankfit/selffit-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-xl px-5 py-2.5 bg-primary text-white font-medium hover:opacity-90
                         text-[clamp(.95rem,.8rem+.3vw,1.05rem)]"
            >
              {t("nav.cta")}
            </m.a>
          </div>

          {/* Switch Lang Mobile */}
          <button
            onClick={toggleLang}
            className="md:hidden mr-2 p-2 rounded hover:bg-white/10"
          >
            <img
              src={lang === "en" ? "/flags/en.svg" : "/flags/es.svg"}
              className="w-6 h-6"
              alt="Language"
            />
          </button>

          {/* Botón menú móvil */}
          <m.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded hover:bg-white/10"
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </m.button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {open && (
            <m.nav
              id="mobile-nav"
              aria-label="Mobile"
              key="mobile"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={mobileMenu}
              className="md:hidden origin-top overflow-hidden max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto rounded-b-2xl"
            >
              <ul className="py-2 pb-4 space-y-1 text-base">
                {LINKS.map((l) => (
                  <li key={l.id}>
                    <m.a
                      href={`#${l.id}`}
                      onClick={() => {
                        handleNavClick(l.id)();
                        setOpen(false);
                      }}
                      whileTap={{ scale: 0.985 }}
                      aria-current={active === l.id ? "page" : undefined}
                      className={`block rounded px-2 py-2 hover:text-primary ${
                        active === l.id ? "text-white font-bold" : "text-white"
                      }`}
                    >
                      {l.label}
                    </m.a>
                  </li>
                ))}

                {/* Mobile Language Switch */}
                <li>
                  <button
                    onClick={() => {
                      toggleLang();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 rounded px-3 py-2 text-white hover:bg-white/10 transition"
                  >
                    <img
                      src={lang === "en" ? "/flags/en.svg" : "/flags/es.svg"}
                      alt="Language"
                      className="w-5 h-5"
                    />
                    <span className="text-base">
                      {lang === "en" ? "English" : "Español"}
                    </span>
                  </button>
                </li>

                <li className="pt-1">
                  <m.a
                    href="https://calendly.com/coachfrankfit/selffit-strategy-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-xl px-4 py-2.5 bg-primary text-white font-medium hover:opacity-90"
                  >
                    Schedule a Call
                  </m.a>
                </li>
              </ul>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </m.header>
  );
}
