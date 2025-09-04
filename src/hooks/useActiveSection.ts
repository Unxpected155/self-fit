import { useEffect, useMemo, useState } from "react";

type Options = {
  /** alto del header fijo para compensar el cálculo del observer */
  offsetTop?: number; // px
  /** thresholds para el observer */
  threshold?: number[];
};

export function useActiveSection(
  ids: readonly string[],
  { offsetTop = 96, threshold = [0, 0.15, 0.35, 0.6, 0.85, 1] }: Options = {}
) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  const elements = useMemo(
    () =>
      ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[],
    [ids]
  );

  // IntersectionObserver: actualiza activo al hacer scroll/visibilidad
  useEffect(() => {
    if (!elements.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // el más visible manda
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (top?.target?.id && ids.includes(top.target.id)) {
          setActive(top.target.id);
        }
      },
      {
        root: null,
        rootMargin: `-${offsetTop}px 0px -55% 0px`,
        threshold,
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [elements, ids, offsetTop, threshold]);

  // Sincroniza cuando cambia el hash (ej. navegación por #id)
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id && ids.includes(id)) setActive(id);
    };
    window.addEventListener("hashchange", onHash);
    onHash(); // inicial
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  // Handler para marcar activo inmediatamente al hacer click
  const handleNavClick = (id: string) => () => setActive(id);

  return { active, setActive, handleNavClick };
}
export default useActiveSection;
