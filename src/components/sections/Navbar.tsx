import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion as m, AnimatePresence, type Variants } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import useWindowSize from "../../hooks/useWindowSize";

const LINKS = [
  { id: "program", label: "Program" },
  { id: "story", label: "Breakdown" },
  { id: "testimonials", label: "Testimonials" },
] as const;

// Variants
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));
  const { width } = useWindowSize();

  // cerrar menú al pasar a desktop
  useEffect(() => {
    if (width >= 768 && open) setOpen(false);
  }, [width, open]);

  // estado de scroll para fondo/sombra
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
        open ? "h-80" : "h-14 sm:h-20 md:h-18 lg:h-20"
      } transition-[height] duration-200 ${
        scrolled
          ? "bg-black/70 shadow-[0_1px_0_rgba(255,255,255,.08)]"
          : "bg-black/50"
      }`}
    >
      {/* Skip link accesible */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:block p-2 bg-white text-black"
      >
        Jump to main content
      </a>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-between">
          {/* Brand */}
          <m.a
            href="#top"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-bold tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl"
          >
            <img
              src="/photos/SelfFit_Logo_Blanco.webp"
              alt="Logo"
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
                    whileHover={{ y: -1 }}
                    className={`transition-colors underline-offset-4 hover:text-primary ${
                      active === l.id ? "text-primary" : "text-white"
                    } text-[clamp(.95rem,.75rem+.35vw,1.05rem)]`}
                  >
                    {l.label}
                  </m.a>
                </m.li>
              ))}
            </m.ul>
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <m.a
              href="#story"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-xl px-5 py-2.5 bg-primary text-black font-medium hover:opacity-90
                         text-[clamp(.95rem,.8rem+.3vw,1.05rem)]"
            >
              Start
            </m.a>
          </div>

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

        {/* Menú móvil (AnimatePresence) */}
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
              className="md:hidden origin-top overflow-hidden"
            >
              <ul className="py-2 pb-4 space-y-1 text-base">
                {LINKS.map((l) => (
                  <li key={l.id}>
                    <m.a
                      href={`#${l.id}`}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setOpen(false)}
                      className={`block rounded px-2 py-2 hover:text-primary ${
                        active === l.id ? "text-primary" : "text-white"
                      }`}
                    >
                      {l.label}
                    </m.a>
                  </li>
                ))}
                <li className="pt-1">
                  <m.a
                    href="#story"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-xl px-4 py-2.5 bg-primary text-black font-medium hover:opacity-90"
                  >
                    Start
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
