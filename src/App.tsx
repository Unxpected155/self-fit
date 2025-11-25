import { useTranslation } from "react-i18next";
import Navbar from "./components/sections/Navbar";
import HeroVideo from "./components/sections/HeroVideo";
import StorySection from "./components/sections/StorySection";
import Testimonials from "./components/sections/Testimonials";
import "./index.css";
import SuccessStories from "./components/sections/SuccessStories";
import type { CaseStudyVideo } from "./types/case-studies";
import FAQ from "./components/sections/FAQ";
import OurMethod from "./components/sections/OurMethod";
import Footer from "./components/sections/Footer";

export default function App() {
  const { t } = useTranslation();
  const heroCopy = {
    preheadline: t("hero.preheadline"),
    headline: t("hero.headline"),
    subheadline: t("hero.subheadline"),
    cta: {
      label: t("hero.cta"),
      href: "https://wa.me/50685466376?text=COACH!",
    },
  } as const;

  const heroMedia = {
    src: "/videos/Vsl_Video.mp4",
    poster: "/photos/SelfFit_Logo_Blanco.webp",
    alt: t("heroMedia.alt"),
  } as const;

  const story = {
    image: {
      src: "/photos/Coach_Before_After.webp",
      alt: t("story.image.alt"),
    },
    title: t("story.title"),
    paragraphs: [
      t("story.paragraphs.0"),
      t("story.paragraphs.1"),
      t("story.paragraphs.2"),
      t("story.paragraphs.3"),
      t("story.paragraphs.4"),
    ] as const,
    cta: { label: t("story.cta.label"), href: "#successStories" },
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
            subheadline: (t("subheadline")),
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
        <OurMethod />
        <SuccessStories
          id="successStories"
          title={t("successStories.title")}
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
          title={t("testimonials.title")}
          items={testimonials}
        />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
