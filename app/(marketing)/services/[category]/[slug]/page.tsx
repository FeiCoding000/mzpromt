import ContactUs from "@/app/components/contact/ContactUs";
import HeroComponent from "@/app/components/main/HeroComponent";
import { Button } from "@/components/ui/button";
import { getServiceDetail, serviceDetails } from "@/lib/constants/service-details";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    category: service.category,
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const service = getServiceDetail(category, slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Management Zone`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const service = getServiceDetail(category, slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white font-sans dark:bg-black">
      <HeroComponent
        heroInfo={{
          title: service.title,
          subtitle: service.categoryTitle,
          description: service.summary,
          backgroundImageUrl: service.heroImage,
        }}
      />

      <section className="container py-14 md:py-20">
        <Link href={service.categoryHref} className="mb-10 inline-flex items-center text-sm font-medium">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to {service.categoryTitle}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <article className="space-y-10">
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Overview</p>
              <h2 className="text-3xl md:text-4xl">Practical accounting support for Australian obligations</h2>
              <p className="text-lg leading-8 text-muted-foreground">{service.overview}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InfoList title="This service is ideal for" items={service.bestFor} />
              <InfoList title="What we include" items={service.inclusions} />
            </div>

            <div className="border-y py-10">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Our process</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {service.process.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-dark text-sm text-white">
                      {index + 1}
                    </span>
                    <p className="leading-7 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="h-fit bg-zinc-50 p-8 dark:bg-zinc-900">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Next step</p>
            <h3 className="mt-4 text-2xl">Need help with {service.title.toLowerCase()}?</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Book a consultation and we will review your current position, key ATO or ASIC obligations, and the most practical way forward.
            </p>
            <Button asChild className="mt-8 rounded-none bg-brand-dark text-white hover:bg-brand-dark/90">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </aside>
        </div>
      </section>

      <ContactUs />
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-zinc-50 p-8 dark:bg-zinc-900">
      <h3 className="text-2xl">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-muted-foreground">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-brand-dark" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
