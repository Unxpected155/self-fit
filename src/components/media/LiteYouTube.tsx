import { useState, type JSX } from "react";

type Props = {
  /** ID del video: lo que va después de /watch?v=  */
  id: string;
  /** Texto accesible / título */
  title: string;
  /** Opcional: calidad del thumbnail (default hqdefault) */
  thumbQuality?: "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault";
  className?: string;
};

export default function LiteYouTube({
  id,
  title,
  thumbQuality = "hqdefault",
  className = "",
}: Props): JSX.Element {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/${thumbQuality}.jpg`;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl shadow ${className}`}
    >
      {!play ? (
        <button
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="rounded-full p-4 bg-white/90 group-hover:scale-105 transition">
              ▶
            </span>
          </span>
        </button>
      ) : (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="eager"
        />
      )}
    </div>
  );
}
