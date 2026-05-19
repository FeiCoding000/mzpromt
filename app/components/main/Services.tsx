import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/dist/client/link";
export type ServiceCardData = {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function Services({
  services,
}: {
  services: ServiceCardData[];
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black container mx-auto py-8">
      
      <div className="w-full text-left">
        <h2 className="text-3xl mb-8">Our Services</h2>
        </div>
      <div className="w-full space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-none shadow-none border-none *:[img]:rounded-none ring-0"
          >
            {service.imageUrl && (
              <Image
                src={service.imageUrl}
                alt={service.title}
                width={400}
                height={200}
                loading="eager"
                className="object-cover rounded-none w-full h-48 mb-4"
              />
            )}
            <h3 className="text-xl mb-2">{service.title.toUpperCase()}</h3>
            <p>{service.description}</p>
            <Button variant="link" className="px-0">
                <Link href={`/services/${service.slug}`}>
                  Learn More →
                </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
