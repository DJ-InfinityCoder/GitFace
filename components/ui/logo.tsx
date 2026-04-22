import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "with-name" | "icon-only";
}

export function Logo({ className, size = 32, variant = "icon-only" }: LogoProps) {
  const isWithName = variant === "with-name";
  
  // Aspect ratio for "with-name" is usually wider. 
  // We'll set a width based on the variant.
  const width = isWithName ? size * 4 : size;
  const height = size;

  const lightSrc = isWithName 
    ? "/gitface_logo_withname_light.png" 
    : "/gitface_logo_withoutname_light.png";
  
  const darkSrc = isWithName 
    ? "/gitface_logo_withname_dark.png" 
    : "/gitface_logo_withoutname_dark.png";

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src={lightSrc}
        alt="GitFace Logo"
        width={width}
        height={height}
        className="block dark:hidden object-contain"
        priority
      />
      <Image
        src={darkSrc}
        alt="GitFace Logo"
        width={width}
        height={height}
        className="hidden dark:block object-contain"
        priority
      />
    </div>
  );
}
