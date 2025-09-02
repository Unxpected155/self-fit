export default function App() {
  const pangram =
    "El veloz murciélago hindú comía feliz cardillo y kiwi. 0123456789";
  return (
    <section className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Avenir Next LT Pro */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">
          Avenir Next LT Pro — <code className="text-white/70">font-sans</code>
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1 font-sans">
          <p className="text-sm text-white/70">Light 300</p>
          <p className="font-light">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Normal 400</p>
          <p className="font-normal">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Medium 500</p>
          <p className="font-medium">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">ExtraBold 800</p>
          <p className="font-extrabold">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Black 900</p>
          <p className="font-black">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">
            Italic (usa las Oblique reales)
          </p>
          <p className="italic font-normal">{pangram}</p>
        </div>
      </div>

      {/* Gotham */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">
          Gotham — <code className="text-white/70">font-gotham</code>
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1 font-gotham">
          <p className="text-sm text-white/70">Thin 100</p>
          <p className="font-thin">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Light 300</p>
          <p className="font-light">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Book 400</p>
          <p className="font-normal">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Medium 500</p>
          <p className="font-medium">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Bold 700</p>
          <p className="font-bold">{pangram}</p>

          <p className="mt-3 text-sm text-white/70">Black/Ultra 900</p>
          <p className="font-black">{pangram}</p>

          <p className="mt-3 text-sm text-amber-400/80">
            *No uses <code>italic</code> en Gotham si no tenés las cursivas;
            evita “faux italic”.
          </p>
        </div>
      </div>
    </section>
  );
}
