export type CTA = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type HeroCopy = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  bullet?: string;
  cta: CTA;
  footnote?: string;
};

export type HeroMedia = {
  src: string;
  alt: string;
};
