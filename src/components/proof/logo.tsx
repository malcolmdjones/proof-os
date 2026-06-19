import Image from "next/image";

import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "icon" | "wordmark";
  className?: string;
  width?: number;
  height?: number;
};

export function Logo({
  variant = "icon",
  className,
  width,
  height,
}: LogoProps) {
  const src =
    variant === "icon" ? tokens.logos.icon : tokens.logos.wordmark;

  const defaultSize =
    variant === "icon"
      ? { width: width ?? 36, height: height ?? 36 }
      : { width: width ?? 120, height: height ?? 40 };

  return (
    <Image
      src={src}
      alt="proof."
      className={cn("object-contain", className)}
      {...defaultSize}
      priority={variant === "icon"}
    />
  );
}
