import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
export type ServicesProps = {
    title:string;
    description:string;
    icon?: React.ReactNode;
}


export default function Services({ services }: { services: ServicesProps[] }) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-4xl font-bold mb-8">Our Services</h1>
            <div className="w-full max-w-4xl space-y-6">
                {services.map((service, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{service.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
