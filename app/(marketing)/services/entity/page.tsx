import HeroComponent from "@/app/components/main/HeroComponent";
export default function EntitySetupPage() {
  const entitySetupProps = {
    title: "Entity Setup Services",
    description:
      "Our entity setup services help you establish the right legal structure for your business, ensuring compliance and optimizing tax benefits.",
    backgroundImageUrl: "entity.jpg",
  };
  return (
    <>
      <div>
        <HeroComponent heroInfo={entitySetupProps} />
      </div>
    </>
  );
}
