import { useEffect, useState } from "react";

/**
 * Observa secciones por id y devuelve el id visible (según rootMargin).
 */
export function useActiveSection(
  ids: string[],
  rootMargin = "-45% 0px -45% 0px"
) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topMost = visible[0]?.target?.id;
        if (topMost) setActive(topMost);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
