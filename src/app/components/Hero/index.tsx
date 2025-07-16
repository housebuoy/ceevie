import { Button } from "@/components/ui/button";
import { HeroMarquee } from "@/app/components/ui/HeroMarquee";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full">
     <section className="relative flex flex-col min-h-screen text-white w-full py-20 sm:py-0">
      {/* Background Grid */}
      <div className="absolute top-0 z-[10] h-screen w-full  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      {/* Overlay Gradient */}
      <div className="flex sm:flex-row-reverse flex-col-reverse justify-between gap-x-6 gap-y-3 items-center z-10 relative max-w-full -pb-16">
        <HeroMarquee />
        <div className="sm:max-w-1/2 pl-10 pb-16">
          <h1 className=" text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            Finally,
          </h1>

          <h2 className="mb-6 text-5xl font-extrabold tracking-tight leading-20 md:text-6xl text-balance">
            A free, easy-to-use 
            <PointerHighlight
              rectangleClassName=" py-2 px-1 bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-indigo-500"
            >
              <span className="relative z-10">resume builder</span>
            </PointerHighlight>
          </h2>

          <p className="mb-8 max-w-xl text-lg text-gray-300">
            Build the perfect resume for free with AI and land your dream job just with a few clicks.
          </p>

          <div className="flex gap-4">
            <Link href={"/auth/sign-up"}>
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium ">
              Get Started
            </Button></Link>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:border-white hover:text-white">
              Learn more
            </Button>
          </div>
          </div>
        </div>
    </section>
    </div>
  );
}
