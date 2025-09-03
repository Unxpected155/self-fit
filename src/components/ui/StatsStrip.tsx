export type Stat = {
  value: string;
  top: string;
  bottom: string;
  emphasizePlus?: boolean;
};

type Props = {
  stats: ReadonlyArray<Stat>;
  className?: string;
};

export default function StatsStrip({ stats, className }: Props) {
  return (
    <div
      className={[
        "relative overflow-hidden",
        // fondo oscuro con grid sutil
        "bg-black/40",
        className ?? "",
      ].join(" ")}
      role="list"
    >
      <div className="relative grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/12">
        {stats.map((s, i) => (
          <div
            key={i}
            role="listitem"
            className="px-6 py-6 sm:px-10 sm:py-8 flex items-center justify-center"
          >
            <div className="flex items-baseline gap-4">
              {/* Número grande en negrita */}
              <div
                className="font-extrabold leading-none tracking-tight text-white
                              text-[clamp(2.25rem,1.4rem+3.2vw,3.5rem)]"
              >
                {s.emphasizePlus && s.value.includes("+") ? (
                  <>
                    {s.value.replace("+", "")}
                    <span className="text-primary align-text-top">+</span>
                  </>
                ) : (
                  s.value
                )}
              </div>

              {/* Label en dos líneas, MAYÚSCULA */}
              <div
                className="uppercase font-semibold leading-tight text-white/80
                              text-[clamp(.78rem,.68rem+.35vw,.95rem)]"
              >
                <div>{s.top}</div>
                <div>{s.bottom}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
