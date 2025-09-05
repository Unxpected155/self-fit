import Navbar from "./components/sections/Navbar";
import HeroVideo from "./components/sections/HeroVideo";
import StorySection from "./components/sections/StorySection";
import Testimonials from "./components/sections/Testimonials";
import "./index.css";
import CaseStudies from "./components/sections/CaseStudies";
import type { CaseStudyVideo } from "./types/case-studies";
import FAQ from "./components/sections/FAQ";

export default function App() {
  const heroCopy = {
    preheadline: "Engineers and Tech Leaders:",
    headline: "Unlock Your Energy and Confidence",
    subheadline:
      "We help high-performing tech professionals break free from fatigue, burn fat and build lasting health while excelling at work.",
    cta: {
      label: "Schedule a call",
      href: "https://wa.me/50685466376?text=COACH!",
    },
  } as const;

  const heroMedia = {
    src: "/videos/Vsl_Video.mp4",
    poster: "/photos/SelfFit_Logo_Blanco.webp",
    alt: "Coach training with dumbbells in cinematic light",
  } as const;

  const story = {
    image: {
      src: "/photos/Coach_Before_After.webp",
      alt: "Your coach transformation",
    },
    title: "Welcome to the SelfFit Masterclass",
    paragraphs: [
      "I wasn’t always the coach you see today. As a teen, I spent hours sitting, playing games, and watching others walk around with athletic bodies. I felt insecure, heavily bullied, and one day almost gave up on myself.",
      "That moment became my turning point. I grabbed two dumbbells and a pillow, and started training in my room.",
      "What began as survival became passion. Years later, I built SelfFit to help busy tech pros like me, who also feel the same way I once did. To recover health, and find the energy to lead again, from someone who’s been there himself.",
    ] as const,
    cta: { label: "See Results", href: "#testimonials" },
  } as const;

  const caseStudyVideos = [
    {
      title: "Tyler",
      href: "https://youtu.be/rMSuqmMbN2Q?si=D2xZnNQjiwrq_m8S",
    },
    {
      title: "Jesse",
      href: "https://youtu.be/JZYfdyC9Cyc?si=O0wbFsIWrBCIl0gy",
    },
  ] as const satisfies readonly CaseStudyVideo[];

  const testimonials = [
    {
      src: "/photos/testimonials/Alek.webp",
      alt: "Alek transformation",
      name: "Alek",
    },
    {
      src: "/photos/testimonials/Andrew.webp",
      alt: "Andrew transformation",
      name: "Andrew",
    },
    {
      src: "/photos/testimonials/Ari.webp",
      alt: "Client transformation",
      name: "Ari",
    },
    {
      src: "/photos/testimonials/Daniel.webp",
      alt: "Daniel transformation",
      name: "Daniel",
    },
    {
      src: "/photos/testimonials/Elliott.webp",
      alt: "Elliott transformation",
      name: "Elliott",
    },
    {
      src: "/photos/testimonials/Gabriel.webp",
      alt: "Gabriel transformation",
      name: "Gabriel",
    },
    {
      src: "/photos/testimonials/Hollen.webp",
      alt: "Hollen transformation",
      name: "Hollen",
    },
    {
      src: "/photos/testimonials/Ignacio.webp",
      alt: "Ignacio transformation",
      name: "Ignacio",
    },
    {
      src: "/photos/testimonials/JeanPaul.webp",
      alt: "Jean Paul transformation",
      name: "Jean Paul",
    },
    {
      src: "/photos/testimonials/Logan.webp",
      alt: "Logan transformation",
      name: "Logan",
    },
    {
      src: "/photos/testimonials/Richard.webp",
      alt: "Richard transformation",
      name: "Richard",
    },
    {
      src: "/photos/testimonials/Sebastian.webp",
      alt: "Sebastian transformation",
      name: "Sebastian",
    },
  ] as const;

  return (
    <div id="top">
      <div className="absolute inset-0 -z-10">
        {/* Imagen de fondo responsiva */}
        <div
          className="
      absolute inset-0
      bg-[url('/photos/Wave-bg.webp')]
      bg-no-repeat
      bg-cover
      bg-center
    "
          aria-hidden
        />
        {/* Overlay con gradientes más suaves */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
        radial-gradient(60% 40% at 50% -10%, rgba(234,97,40,0.18), transparent 60%),
        radial-gradient(35% 25% at 90% 10%, rgba(234,97,40,0.12), transparent 60%),
        linear-gradient(180deg, rgba(11,11,11,0.75) 0%, rgba(7,7,7,0.65) 55%, rgba(0,0,0,0.80) 100%)
      `,
          }}
          aria-hidden
        />
      </div>

      <Navbar />

      <main id="main" className="">
        <HeroVideo
          id="intro"
          copy={{
            preheadline: heroCopy.preheadline,
            headline: heroCopy.headline,
            subheadline: heroCopy.subheadline,
            cta: {
              label: heroCopy.cta.label,
              href: heroCopy.cta.href,
            },
          }}
          media={{
            src: heroMedia.src,
            poster: heroMedia.poster,
            alt: heroMedia.alt,
          }}
        />
        <StorySection
          id="myStory"
          image={story.image}
          title={story.title}
          paragraphs={story.paragraphs}
          cta={story.cta}
        />
        <CaseStudies
          id="caseStudies"
          videos={[
            {
              title: caseStudyVideos[0].title,
              href: caseStudyVideos[0].href,
            },
            {
              title: caseStudyVideos[1].title,
              href: caseStudyVideos[1].href,
            },
          ]}
        />
        <Testimonials
          id="testimonials"
          title="Real Clients. Real Results."
          items={testimonials}
        />
        <FAQ />
      </main>
    </div>
  );
}
