import { motion as m, type Variants } from "framer-motion";
import {
  Calendar,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";

const LINKS = [
  {
    label: "Calendly",
    href: "https://calendly.com/coachfrankfit/selffit-strategy-call",
    icon: Calendar,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/frank-hidalgo-067417149/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/coachfrankfit/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61553648973484",
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@coachfrankfit",
    icon: Youtube,
  },
  {
    label: "X",
    href: "https://x.com/CoachFrankFit",
    icon: Twitter,
  },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Links */}
        <m.ul
          className="flex flex-wrap justify-center gap-5 md:gap-8 mb-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {LINKS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <m.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition-colors text-[clamp(.9rem,.8rem+.3vw,1rem)]"
              >
                <Icon size={18} />
                {label}
              </m.a>
            </li>
          ))}
        </m.ul>

        {/* Copyright */}
        <m.p
          className="text-center text-sm text-white/60"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          © {new Date().getFullYear()} SelfFit. All rights reserved.
        </m.p>
      </div>
    </footer>
  );
}
