import ContactUs from "@/app/components/contact/ContactUs";
import HeroComponent from "@/app/components/main/HeroComponent";
import FeaturedPost from "@/app/components/posts/FeaturedPost";
import PostCard from "@/app/components/posts/PostCard";
import PostListItem from "@/app/components/posts/PostListItem";
import type { Post } from "@/db/schema";
import { categoryEnum } from "@/db/schema";
import { getPostsByCategory, getPublishedPosts } from "@/lib/services/postService";
import Link from "next/link";

async function getInsightsPosts(category?: string): Promise<Post[]> {
    if (category && categoryEnum.enumValues.includes(category as typeof categoryEnum.enumValues[number])) {
        return getPostsByCategory(category);
    }

    return getPublishedPosts();
}

export default async function Page( { searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const categories = categoryEnum.enumValues;
    const queryCategory = (await searchParams).category;
    const links = categories.map(category => ({
        name: category,
        href: `/insights?category=${category}`,
    }));


    const posts = await getInsightsPosts(queryCategory);
    
    const insightsProps = {
        title: "Insights",
        description: "Stay updated with the latest news and insights from our team.",
        backgroundImageUrl: "insights.jpg"
    };


    const featuredPost = posts.find(post => post.isFeatured);
    const recentPosts = posts.slice(0, 3);

    return (
        <div>
            <HeroComponent heroInfo={insightsProps} />
            <section className="container py-10 flex flex-col bg-emerald-50 lg:flex-row gap-10">

                <main className="py-10 lg:w-3/4">
                    <div className="mb-10 flex items-center gap-4"> 
                        <Link href={"/insights"} className="text-sm font-medium ">
                            All
                        </Link>
                        {links.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={"text-sm font-medium "}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {featuredPost && <div className="my-10 w-full"><FeaturedPost post={featuredPost} /> </div>}

                    <div className="my-10 grid gap-6 md:grid-cols-2">
                    {posts.map(post => (
                        post.isFeatured ? null : <PostCard key={post.id} post={post} />
                    ))}
                    </div>

                </main>
                <aside className="container py-10 lg:w-1/4">
                    <h2 className="text-xl mb-4">Recent Posts</h2>
                    <div className="space-y-1">
                        {recentPosts.map(post => (
                            <PostListItem key={post.id} post={post} />
                        ))}
                    </div>
                </aside>
            </section>
            <ContactUs />
        </div>
    )
}