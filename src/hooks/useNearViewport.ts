import { useEffect, useRef, useState } from "react";

/**
 * Hook para montar un componente cuando está a N px del viewport.
 * @param rootMargin margen para anticipar la carga (ej: "500px")
 */
export function useNearViewport<T extends HTMLElement>(rootMargin = "400px") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible, rootMargin]);

  return { ref, visible } as const;
}
