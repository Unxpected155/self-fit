import Navbar from "./components/sections/Navbar";
import HeroVideo from "./components/sections/HeroVideo";
import StorySection from "./components/sections/StorySection";
import Testimonials from "./components/sections/Testimonials";
import "./index.css";
import SuccessStories from "./components/sections/SuccessStories";
import type { CaseStudyVideo } from "./types/case-studies";
import FAQ from "./components/sections/FAQ";
import OurProtocols from "./components/sections/OurProtocols";

export default function App() {
  const heroCopy = {
    preheadline: "Engineers and Tech Leaders:",
    headline: "Unlock Your Energy and Confidence",
    subheadline:
      "We help high-performing tech professionals break free from\nfatigue, burn fat and build lasting health while excelling at work.",
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
    title: "My story",
    paragraphs: [
      "I wasn’t always the coach you see today.",
      "As a teen, I went from being active to sitting all day, playing games, and watching other guys walk around with athletic bodies. I felt insecure, bullied, and at one point almost gave up on myself.",
      "That moment became my turning point. I grabbed two dumbbells and a pillow and started training alone in my room. What began as survival turned into a passion that never left.",
      "For years, I tested, failed, and kept learning. I even coached a pro e-sports team. But for a long time fitness was just an obsession, I still struggled to balance it with school, work, and relationships. It wasn’t until I built a method that actually fit real life that I finally broke through.",
      "In 2023, I launched the SelfFit method to share that system with other professionals like me, men with demanding jobs, families, and little time. Since then, I’ve worked with engineers, project managers, and directors across the US and Latin America. They’ve dropped 20–60+ lbs, improved health markers, and regained the energy to show up better at work and at home.",
      "That’s what this method is about: structure, discipline, and results that last.",
      "To get fit, but mostly to learn how to stay fit by yourself.",
    ] as const,
    cta: { label: "See Results", href: "#successStories" },
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
      src: "/photos/testimonials/Elliott.webp",
      alt: "Elliott transformation",
      name: "Elliott",
    },
    {
      src: "/photos/testimonials/Andrew.webp",
      alt: "Andrew transformation",
      name: "Andrew",
    },
    {
      src: "/photos/testimonials/Richard.webp",
      alt: "Richard transformation",
      name: "Richard",
    },
    {
      src: "/photos/testimonials/Daniel.webp",
      alt: "Daniel transformation",
      name: "Daniel",
    },
    {
      src: "/photos/testimonials/Logan.webp",
      alt: "Logan transformation",
      name: "Logan",
    },
    {
      src: "/photos/testimonials/Sebastian.webp",
      alt: "Sebastian transformation",
      name: "Sebastian",
    },
    {
      src: "/photos/testimonials/Gabriel.webp",
      alt: "Gabe transformation",
      name: "Gabe",
    },
    {
      src: "/photos/testimonials/Alek.webp",
      alt: "Alek transformation",
      name: "Alek",
    },
    {
      src: "/photos/testimonials/JeanPaul.webp",
      alt: "Jean Paul transformation",
      name: "Jean Paul",
    },
    {
      src: "/photos/testimonials/Ignacio.webp",
      alt: "Ignacio transformation",
      name: "Ignacio",
    },
    {
      src: "/photos/testimonials/Julian.webp",
      alt: "Client transformation",
      name: "Julian",
    },
    {
      src: "/photos/testimonials/Hollen.webp",
      alt: "Hollen transformation",
      name: "Hollen",
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

      <main id="main">
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
        <OurProtocols />
        <SuccessStories
          id="successStories"
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
