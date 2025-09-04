export type YouTubeUrl =
  | `https://youtu.be/${string}`
  | `https://www.youtube.com/${string}`;

export type CaseStudyVideo = Readonly<{
  title: string;
  href: YouTubeUrl;
}>;
