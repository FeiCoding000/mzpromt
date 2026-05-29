import HeroComponent from "@/app/components/main/HeroComponent";
import FeaturedPost from "@/app/components/posts/FeaturedPost";
import PostCard from "@/app/components/posts/PostCard";
import PostListItem from "@/app/components/posts/PostListItem";
import type { Post } from "@/db/schema";
import { categoryEnum } from "@/db/schema";
import { headers } from "next/headers";
import Link from "next/link";

type SerializedPost = Omit<Post, "publishedAt" | "createdAt" | "updatedAt"> & {
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

async function getInsightsPosts(category?: string): Promise<Post[]> {
    const headersList = await headers();
    const host = headersList.get("host");

    if (!host) {
        throw new Error("Missing request host.");
    }

    const protocol = headersList.get("x-forwarded-proto") ?? "http";
    const url = new URL("/api/insights", `${protocol}://${host}`);

    if (category) {
        url.searchParams.set("category", category);
    }

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
        throw new Error("Failed to fetch insights posts.");
    }

    const posts = await response.json() as SerializedPost[];

    return posts.map(post => ({
        ...post,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
    }));
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

    return (
        <div>
            <HeroComponent heroInfo={insightsProps} />
            <section className="container py-10 flex flex-col bg-emerald-50 lg:flex-row gap-10">

                <main className="py-10 lg:w-3/4">

                    <div className="mb-10 flex items-center gap-6"> 
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
                <aside className="container lg:w-1/4">
                    <h2 className="text-xl mb-6">Recent Posts</h2>
                    <PostListItem />
                    <PostListItem />
                    <PostListItem />
                </aside>
            </section>

        </div>
    )
}