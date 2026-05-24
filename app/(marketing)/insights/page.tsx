import HeroComponent from "@/app/components/main/HeroComponent";
export default function Page() {
    const insightsProps = {
        title: "Insights",
        description: "Stay updated with the latest news and insights from our team.",
        backgroundImageUrl: "insights.jpg"
    };
    return (
        <div>
            <HeroComponent heroInfo={insightsProps} />
        </div>
    )
}