import ContactUs from "@/app/components/contact/ContactUs";
import HeroComponent from "@/app/components/main/HeroComponent";

export default function IndividualTaxServicesPage() {
  const individualTaxServiceProps = {
    title: "Individual Tax Services",
    description: "We provide comprehensive individual tax services to help you navigate the complexities of tax planning and compliance.",
    backgroundImageUrl: "tax.jpg",
  };

  return (
    <div>
        <HeroComponent 
            heroInfo={individualTaxServiceProps}
        />
        <ContactUs />
    </div>
  );
}