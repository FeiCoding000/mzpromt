import Services from "@/app/components/main/Services"
import { getAllServices } from "@/lib/queries/services";

export default async function Page() {
    const services = await getAllServices();
    return (
             <Services services={services} />
    )
}