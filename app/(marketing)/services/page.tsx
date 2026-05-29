import Services from "@/app/components/main/Services"
import { getAllServices } from "@/lib/queries/services";
import HeroComponent from "@/app/components/main/HeroComponent";
import ContactUs from "@/app/components/contact/ContactUs";

export default async function Page() {
    const services = await getAllServices();
    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black w-full">
            <HeroComponent 
                heroInfo={{
                    title: "Our Services",
                    description: "Explore the range of professional services we offer to support your business needs.",
                    backgroundImageUrl: "tax.jpg"
                }} 
            />
            <div className="mx-auto bg-zinc-50 w-full">
                <Services services={services} />
            </div>
            <ContactUs />
        </div>
    )
}