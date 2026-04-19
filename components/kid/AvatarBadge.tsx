import { CSSProperties } from "react";

type AvatarBadgeProps = {
  color: "blue" | "green" | "purple" | "orange" | "pink";
  styleEmoji: string;
  size?: number;
};

const colorMap: Record<AvatarBadgeProps["color"], string> = {
  blue: "linear-gradient(135deg, #3B5BFF, #8AA2FF)",
  green: "linear-gradient(135deg, #2FBF71, #83E2AA)",
  purple: "linear-gradient(135deg, #A855F7, #D2A7FF)",
  orange: "linear-gradient(135deg, #F59E0B, #FFD479)",
  pink: "linear-gradient(135deg, #EC4899, #FF9DD1)",
};

export function AvatarBadge({ color, styleEmoji, size = 56 }: AvatarBadgeProps) {
  const style = {
    width: size,
    height: size,
    background: colorMap[color],
  } satisfies CSSProperties;

  return (
    <div
      className="inline-flex items-center justify-center rounded-full border-4 border-white text-2xl shadow-lg"
      style={style}
      aria-label={`Avatar ${styleEmoji}`}
    >
      <span aria-hidden="true">{styleEmoji}</span>
    </div>
  );
}
