import Services from "@/app/components/main/Services"
import { getAllServices } from "@/lib/queries/services";
import HeroComponent from "@/app/components/main/HeroComponent";

export default async function Page() {
    const services = await getAllServices();
    return (
        <div>
            <HeroComponent 
                heroInfo={{
                    title: "Our Services",
                    description: "Explore the range of professional services we offer to support your business needs.",
                    backgroundImageUrl: "tax.jpg"
                }} 
            />
            <Services services={services} />
        </div>
    )
}