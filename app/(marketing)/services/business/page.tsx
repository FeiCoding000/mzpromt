import ContactUs from "@/app/components/contact/ContactUs";
import HeroComponent from "@/app/components/main/HeroComponent";
export default function BusinessServicesPage() {
    const businessServiceProps = 
        {
            title: "Business Services",
            description: "We offer a wide range of business services to help you grow and succeed in today's competitive market.",
            backgroundImageUrl: "business.jpg",
        };
  return (
    <div>
        <HeroComponent heroInfo={businessServiceProps} />
        <ContactUs />
    </div>
  );
}
