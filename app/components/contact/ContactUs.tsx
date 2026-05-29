import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ContactUs() {
  return (
    <div>
      <section className="w-full bg-white py-16">
        <div className="container flex flex-col gap-6 text-center md:items-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/70 uppercase">
            Ready to talk?
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl">
            Get accounting support that is responsive, accurate and easy to work
            with.
          </h2>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              variant="destructive"
              size="lg"
              className="text-amber-900"
            >
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
