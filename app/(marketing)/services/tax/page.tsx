import ContactUs from "@/app/components/contact/ContactUs";
import HeroComponent from "@/app/components/main/HeroComponent";
import { Button } from "@/components/ui/button";
import { getServicesByCategory } from "@/lib/constants/service-details";
import Link from "next/link";

export default function IndividualTaxServicesPage() {
  const services = getServicesByCategory("tax");

  return (
    <div className="bg-white dark:bg-black">
      <HeroComponent
        heroInfo={{
          title: "Individual Tax Services",
          description: "Personal tax returns, rental property, CGT, investment income and tax planning for Australian taxpayers.",
          backgroundImageUrl: "tax.jpg",
        }}
      />
      <section className="container py-14 md:py-20">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Tax time made clearer</p>
          <h2 className="text-3xl md:text-4xl">Accurate lodgement and practical advice for your personal tax position</h2>
          <p className="text-lg leading-8 text-muted-foreground">
            We review income, deductions and ATO requirements carefully so you can lodge with confidence and plan ahead.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.href} className="bg-zinc-50 p-7 dark:bg-zinc-900">
              <h3 className="text-2xl">{service.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{service.summary}</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link href={service.href}>Learn More →</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
      <ContactUs />
    </div>
  );
}
