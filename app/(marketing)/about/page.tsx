import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, FileCheck2, ShieldCheck } from "lucide-react";

import HeroComponent from "@/app/components/main/HeroComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | MZ Prompt Accounts",
  description:
    "Learn about MZ Prompt Accounts: practical, ATO-aligned accounting and tax support for small businesses and individuals.",
};

const values = [
  {
    title: "Prompt response",
    description:
      "We keep communication clear and timely, so you are not left waiting when deadlines or tax questions come up.",
    icon: Clock,
  },
  {
    title: "Precise advice",
    description:
      "We focus on accurate records, practical tax planning, and careful compliance with current ATO requirements.",
    icon: FileCheck2,
  },
  {
    title: "Professional care",
    description:
      "We take the time to understand your business, explain your options, and support decisions with confidence.",
    icon: ShieldCheck,
  },
];

const supportAreas = [
  "Small business accounting, BAS and bookkeeping guidance",
  "Individual tax returns with clear, practical support",
  "Entity setup advice for companies, trusts and business structures",
  "ATO-aligned compliance, deadlines and ongoing advisory support",
];

export default function Page() {
  return (
    <main className="bg-zinc-50 text-brand-dark">
      <HeroComponent
        heroInfo={{
          subtitle: "ABOUT MZ PROMPT ACCOUNTS",
          title: "Accounting support built around prompt, precise and professional service.",
          description:
            "We help small businesses and individuals stay compliant, understand their numbers, and make confident financial decisions.",
          backgroundImageUrl: "about.jpg",
        }}
      />

      <section className="w-full bg-white py-16">
        <div className="container grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/70 uppercase">
              Who we are
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Practical accounting for busy business owners.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-brand-dark/80">
            <p>
              MZ Prompt Accounts provides smart accounting and tax support for
              small businesses, individuals and new entities. Our work is shaped
              by three promises: prompt communication, precise compliance, and
              professional guidance that is easy to understand.
            </p>
            <p>
              We stay across ATO policy changes and focus on strategies that keep
              your records organised, your obligations on track, and your business
              ready for its next step.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-16">
        <div className="container">
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/70 uppercase">
              Our approach
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Clear advice, careful work, reliable support.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Card key={value.title} className="rounded-none shadow-none">
                  <CardHeader>
                    <Icon className="size-10 text-brand-dark" aria-hidden="true" />
                    <CardTitle className="text-xl text-brand-dark">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-brand-dark/75">
                    {value.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-brand-dark py-16 text-white">
        <div className="container grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-[0.25em] text-white/70 uppercase">
              What we help with
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Accounting that keeps you compliant and confident.
            </h2>
            <p className="leading-8 text-white/75">
              Whether you are lodging an individual tax return, managing a small
              business, or setting up the right entity structure, we provide
              straightforward guidance matched to your needs.
            </p>
          </div>

          <ul className="space-y-4">
            {supportAreas.map((area) => (
              <li key={area} className="flex gap-3 text-white/85">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-amber-100" aria-hidden="true" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="container flex flex-col gap-6 text-center md:items-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/70 uppercase">
            Ready to talk?
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl">
            Get accounting support that is responsive, accurate and easy to work with.
          </h2>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="destructive" size="lg" className="text-amber-900">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
