import HeroComponent from "@/app/components/main/HeroComponent";
export default function IndividualTaxServicesPage() {
  return (
    <div>
        <HeroComponent 
            heroInfo={{
                title: "Individual Tax Services",
                description: "We provide comprehensive individual tax services to help you navigate the complexities of tax planning and compliance.",
                backgroundImageUrl: "hero.jpg",
            }} 
        />
    </div>
  );
}