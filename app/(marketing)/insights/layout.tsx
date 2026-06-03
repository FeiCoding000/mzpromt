import type { ReactNode } from "react";
import HeroComponent from "@/app/components/main/HeroComponent";
import ContactUs from "@/app/components/contact/ContactUs";
import { getRecentPosts } from "@/lib/services/postService";
import PostListItem from "@/app/components/posts/PostListItem";

export default async function InsightsLayout({ children }: { children: ReactNode }) {
    const recentPosts = await getRecentPosts(3);

    const insightsProps = {
        title: "Insights",
        description: "Stay updated with the latest news and insights from our team.",
        backgroundImageUrl: "insights.jpg"
    };

    return (
        <>
            <HeroComponent heroInfo={insightsProps} />
            <section className="container py-10 flex flex-col bg-emerald-50 lg:flex-row gap-10">
                <main className="py-10 lg:w-3/4">
                    {children}
                </main>
                <aside className="container py-10 lg:w-1/4">
                    <h2 className="text-xl mb-6">Recent Posts</h2>
                    <div className="space-y-3">
                        {recentPosts.map((post) => (
                            <PostListItem key={post.id} post={post} />
                        ))}
                    </div>
                </aside>
            </section>
            <ContactUs />
        </>
    );
}
