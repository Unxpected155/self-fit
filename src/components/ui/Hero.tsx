import { useEffect, useState } from "react";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => setShowVideo(true));
      } else {
        setTimeout(() => setShowVideo(true), 600);
      }
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section className="relative aspect-[9/16] md:aspect-[16/9] w-full overflow-hidden">
      {/* LCP: imagen estática, prioridad alta */}
      {!showVideo && (
        <img
          src="/photos/Selffit_Logo_Blanco.webp"
          alt="SelfFit hero"
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Video se monta después del idle */}
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Vs1_Video.mp4"
          preload="metadata"
          autoPlay
          muted
          playsInline
          loop
          aria-label="Coach training with dumbbells"
        />
      )}
      {/* CTA y contenido encima */}
    </section>
  );
}
