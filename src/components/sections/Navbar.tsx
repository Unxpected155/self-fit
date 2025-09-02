import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../../hooks/useActiveSection";
import useWindowSize from "../../hooks/useWindowSize";

const LINKS = [
  { id: "program", label: "Program" },
  { id: "breakdown", label: "Breakdown" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));
  const { width } = useWindowSize();

  useEffect(() => {
    if (width >= 768 && open) {
      setOpen(false);
    }
  }, [width, open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur border-b border-white/10 ${
        open ? "h-80" : "h-14 sm:h-20 md:h-18 lg:h-20"
      } transition-all duration-200
        ${
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
        Saltar al contenido
      </a>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-between">
          {/* Marca (si querés Gotham: className="font-gotham") */}
          <a
            href="#top"
            className="font-bold tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl"
          >
            TuMarca
          </a>

          {/* Links desktop */}
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-7">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`transition-colors underline-offset-4 hover:text-primary
                                ${
                                  active === l.id
                                    ? "text-primary"
                                    : "text-white"
                                }
                                text-sm sm:text-[15px] lg:text-base text-[clamp(0.9rem,1.5vw+0.5rem,3rem)]`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <a
              href="#pricing"
              className="inline-flex items-center rounded-xl px-4 md:px-5 py-2 md:py-2.5
                         bg-primary text-black font-medium hover:opacity-90
                         text-sm md:text-base"
            >
              ¡Comenzar!
            </a>
          </div>

          {/* Toggle móvil con iconos Lucide */}
          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {/* Menú móvil con animación (scale-y + opacity) */}
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          className={`md:hidden origin-top overflow-hidden
            ${
              open
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0 pointer-events-none"
            }
            transition-transform duration-200 ease-out
            [transition-property:transform,opacity]`}
        >
          <ul className="py-2 pb-4 space-y-1 text-base">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded px-2 py-2 hover:text-primary
                              ${
                                active === l.id ? "text-primary" : "text-white"
                              }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-xl px-4 py-2.5
                           bg-primary text-black font-medium hover:opacity-90"
              >
                ¡Get fit!
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
