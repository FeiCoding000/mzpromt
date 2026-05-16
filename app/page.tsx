import Hero from "./components/main/Hero";
import Services, { ServicesProps } from "./components/main/Services";
const services: ServicesProps[] = [
    
    {
        title: "Web Development",
        description: "We build responsive and modern websites tailored to your needs.",
    },
    {
        title: "Mobile App Development",
        description: "Creating user-friendly mobile applications for both iOS and Android platforms.",
    },
    {
        title: "UI/UX Design",
        description: "Designing intuitive and engaging user interfaces for your digital products.",
    },
    {
        title: "Digital Marketing",
        description: "Helping you reach your target audience through effective online marketing strategies.",
    },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Services services={services} />
    </div>
  );
}
