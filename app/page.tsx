import Hero from "./components/main/Hero";
import Services, { ServiceCardData } from "./components/main/Services";
import { getAllServices } from "@/lib/queries/services";


export default async function Home() {
  const services : ServiceCardData[] = await getAllServices();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Services services={services} />
    </div>
  );
}
