import Navbar from "./components/sections/Navbar";
import "./index.css";

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main id="main">
        <section id="program" className="scroll-mt-24 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Transformá tus hábitos con un método que sí se sostiene
            </h1>
            <p className="mt-4 text-white/80 max-w-2xl">
              Acompañamiento personalizado + 3 métodos probados para lograr
              resultados medibles.
            </p>
          </div>
        </section>

        <section id="breakdown" className="scroll-mt-24 py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold">Cómo funciona</h2>
            <p className="mt-3 text-white/80">Paso 1, 2 y 3…</p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold">Precios</h2>
            <p className="mt-3 text-white/80">Planes y beneficios…</p>
          </div>
        </section>

        <section id="testimonials" className="scroll-mt-24 py-20 font-gotham">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold">Testimonios</h2>
            <blockquote className="mt-4 text-white/80">
              “Resultados reales, acompañamiento cercano.”
            </blockquote>
          </div>
        </section>
      </main>
    </div>
  );
}
