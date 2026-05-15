import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function Hero() {
  return (
    <>
      <section className="relative w-full min-h-130 h-[70vh] flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat text-white">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 flex flex-col items-center space-y-6 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            Prompt. Precise. Professional.
          </h1>
          <p className="text-2xl mt-8">
            Smart accounting for small businesses.
          </p>
          <p className="text-sm mt-1">
            We work efficiently, stay ahead of ATO policy changes, and apply the
            right strategies to keep your business compliant and confident.
          </p>
          <div className="flex flex-row gap-4 mt-8">
            <Button variant={"destructive"} size={"lg"} className="px-6 text-amber-100 border-2 border-amber-100">
                <Link href="/services">Learn More</Link>
                </Button>
            <Button variant={"destructive"} size={"lg"} className="px-6 text-amber-100 border-2 border-amber-100">
                <Link href="/contact">Get Connected</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 text-brand-dark">
        <div className="container max-w-4xl space-y-6 text-lg leading-8">
          <p>
            Safeguarding small businesses with ATO-aligned expertise, practical
            guidance, and friendly support. We help business owners stay
            compliant, confident, and focused on growth.
          </p>
        </div>
      </section>
    </>
  );
}
