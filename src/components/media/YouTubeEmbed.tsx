type Props = {
  url: string;
  title: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

function toEmbedUrl(
  url: string,
  {
    autoplay = true,
    muted = true,
    loop = false,
  }: { autoplay?: boolean; muted?: boolean; loop?: boolean } = {}
): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    let id = "";

    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (host.includes("youtube.com"))
      id =
        u.searchParams.get("v") ??
        u.pathname.split("/").filter(Boolean).pop() ??
        "";

    if (!id) return url;

    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });

    if (autoplay) params.set("autoplay", "1");
    if (muted) params.set("mute", "1");
    if (loop) {
      params.set("loop", "1");
      params.set("playlist", id);
    }

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  } catch {
    return url;
  }
}

export default function YouTubeEmbed({
  url,
  title,
  className,
  autoplay = true,
  muted = true,
  loop,
}: Props) {
  const src = toEmbedUrl(url, { autoplay, muted, loop });

  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow",
        "aspect-[16/9]",
        className ?? "",
      ].join(" ")}
    >
      <iframe
        className="w-full h-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
