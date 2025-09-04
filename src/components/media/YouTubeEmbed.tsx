import { useState, useMemo, type JSX } from "react";

type Props = {
  url: string; // admite URL completa o ID
  title: string;
  className?: string;
  autoplay?: boolean; // aplicado cuando el usuario hace click
  muted?: boolean;
  loop?: boolean;
  thumbQuality?: "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault";
};

function getYouTubeId(urlOrId: string): string | null {
  // Si ya parece un ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;

  try {
    const u = new URL(urlOrId);

    // 1) https://www.youtube.com/watch?v=ID
    const v = u.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    // 2) https://youtu.be/ID
    // 3) https://www.youtube.com/embed/ID
    // 4) https://www.youtube.com/shorts/ID
    const segs = u.pathname.split("/").filter(Boolean);
    for (let i = segs.length - 1; i >= 0; i--) {
      const s = segs[i];
      if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
    }
    return null;
  } catch {
    return null;
  }
}

export default function YouTubeEmbed({
  url,
  title,
  className,
  autoplay = true,
  muted = true,
  loop = false,
  thumbQuality = "hqdefault",
}: Props): JSX.Element {
  const [play, setPlay] = useState(false);

  const id = useMemo(() => getYouTubeId(url), [url]);
  const thumb = useMemo(
    () => (id ? `https://i.ytimg.com/vi/${id}/${thumbQuality}.jpg` : ""),
    [id, thumbQuality]
  );

  const iframeSrc = useMemo(() => {
    if (!id) return url;
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      autoplay: autoplay ? "1" : "0",
      mute: muted ? "1" : "0",
    });
    if (loop) {
      params.set("loop", "1");
      params.set("playlist", id);
    }
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }, [id, url, autoplay, muted, loop]);

  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow",
        "aspect-[16/9]",
        className ?? "",
      ].join(" ")}
    >
      {!play && id ? (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group relative block h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={thumb}
            alt={`Thumbnail: ${title}`}
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
          />
          <span className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="rounded-full p-4 bg-white/90 transition-transform group-hover:scale-105">
              ▶
            </span>
          </span>
        </button>
      ) : (
        <iframe
          className="h-full w-full"
          src={iframeSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="eager"
        />
      )}
    </div>
  );
}
