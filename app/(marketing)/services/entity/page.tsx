import HeroComponent from "@/app/components/main/HeroComponent";
export default function EntitySetupPage() {
  return (
    <div>
        <HeroComponent 
            heroInfo={{
                title: "Entity Setup Services",
                description: "We assist in setting up your business entity, ensuring compliance with legal requirements and optimizing for tax benefits.",
                backgroundImageUrl: "hero.jpg",
            }} 
        />
    </div>
  );
}