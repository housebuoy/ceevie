"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";


export function HeroMarquee() {

    
  const images = [
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    "/images/HeroMarquee/Resume1.png",
    "/images/HeroMarquee/Resume2.png",
    "/images/HeroMarquee/Resume3.png",
    "/images/HeroMarquee/Resume4.png",
    "/images/HeroMarquee/Resume5.png",
    
  ];
  return (
    <div className="max-w-full sm:max-w-sm lg:max-w-lg rounded-sm bg-[#00091c] ring-1 ring-neutral-700/10 dark:bg-[#00091c]">
      <ThreeDMarquee images={images} />
    </div>
  );
}
