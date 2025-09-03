import Navbar from "./components/sections/Navbar";
import HeroVideo from "./components/sections/HeroVideo";
import StorySection from "./components/sections/StorySection";
import Testimonials from "./components/sections/Testimonials";
import type { Stat } from "./components/ui/StatsStrip";
import "./index.css";

export default function App() {
  // === Hero (program) ===
  const heroCopy = {
    title: "Self Fit",
    subtitle:
      "The most complete masterclass for slicing off fat, gaining perfect muscle size & getting into the shape of your dreams.",
    cta: { label: "LET’S GO!", href: "https://wa.me/50685466376?text=COACH!" },
  } as const;

  const heroMedia = {
    // Recuerda: si están en /public, la ruta es absoluta desde raíz
    src: "/videos/Vsl_Video.mp4",
    poster: "/photos/SelfFit_Logo_Blanco.webp",
    alt: "Coach training with dumbbells in cinematic light",
  } as const;

  const stats: ReadonlyArray<Stat> = [
    { value: "4+", top: "MONTHS", bottom: "OF WORKOUTS" },
    { value: "40+", top: "VIDEO", bottom: "LESSONS" },
    { value: "4", top: "NUTRITION", bottom: "PROTOCOLS" },
  ];

  // === Story (breakdown) ===
  const story = {
    image: {
      src: "/photos/Coach_Before_After.webp",
      alt: "Your coach transformation",
    },
    title: "Welcome to the SelfFit Masterclass",
    paragraphs: [
      "This is a practical, effective system designed for busy professionals who want visible results without restrictive diets or endless workouts.",
      "You'll follow a proven structure: simple nutrition you can actually stick to, efficient 3x/week training, and weekly accountability.",
      "Whether you're cutting fat, building lean muscle, or both — we’ll tailor the plan to your goals and schedule.",
      "The result: a cinematic physique with habits you can sustain long after the program.",
    ] as const,
    cta: { label: "See Results", href: "#testimonials" },
  } as const;

  // === Testimonials ===
  const testimonials = [
    {
      src: "/photos/testimonials/Testimonial1.webp",
      alt: "Client transformation 1",
    },
    {
      src: "/photos/testimonials/Testimonial2.webp",
      alt: "Client transformation 2",
    },
    {
      src: "/photos/testimonials/Testimonial3.webp",
      alt: "Client transformation 3",
    },
    {
      src: "/photos/testimonials/Testimonial4.webp",
      alt: "Client transformation 4",
    },
    {
      src: "/photos/testimonials/Testimonial5.webp",
      alt: "Client transformation 5",
    },
    {
      src: "/photos/testimonials/Testimonial6.webp",
      alt: "Client transformation 6",
    },
    {
      src: "/photos/testimonials/Testimonial7.webp",
      alt: "Client transformation 7",
    },
    {
      src: "/photos/testimonials/Testimonial8.webp",
      alt: "Client transformation 8",
    },
    {
      src: "/photos/testimonials/Testimonial9.webp",
      alt: "Client transformation 9",
    },
    {
      src: "/photos/testimonials/Testimonial10.webp",
      alt: "Client transformation 10",
    },
    {
      src: "/photos/testimonials/Testimonial11.webp",
      alt: "Client transformation 11",
    },
    {
      src: "/photos/testimonials/Testimonial12.webp",
      alt: "Client transformation 12",
    },
  ] as const;

  return (
    <div id="top">
      <Navbar />
      <main id="main">
        <HeroVideo
          id="program"
          copy={heroCopy}
          media={heroMedia}
          stats={stats}
        />
        <StorySection
          id="story"
          image={story.image}
          title={story.title}
          paragraphs={story.paragraphs}
          cta={story.cta}
        />
        <Testimonials
          id="testimonials"
          title="Real Clients. Real Results."
          items={testimonials}
        />
      </main>
    </div>
  );
}
