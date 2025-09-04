// src/ui/Avatar.tsx
import type { JSX } from "react";

// Variante 1: con src directo
export type AvatarSrcProps = {
  src: string;
  alt: string;
  sizePx?: number;
  className?: string;
};

// Variante 2: con base (si no trae extensión, asumimos .webp)
export type AvatarBaseProps = {
  base: string;
  alt: string;
  sizePx?: number;
  className?: string;
};

// Unión excluyente: o src o base, pero no ambas
export type AvatarProps = AvatarSrcProps | AvatarBaseProps;

function resolveSrc(props: AvatarProps): string {
  if ("src" in props) return props.src;
  const b = props.base.trim();
  return /\.(webp|avif|png|jpe?g)$/i.test(b) ? b : `${b}.webp`;
}

export default function Avatar(props: AvatarProps): JSX.Element {
  const size = props.sizePx ?? 176;
  const classes = `rounded-full object-cover ${props.className ?? ""}`.trim();
  const src = resolveSrc(props);

  return (
    <img
      src={src}
      alt={props.alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size, aspectRatio: "1 / 1" }}
      className={classes}
      draggable={false}
    />
  );
}
