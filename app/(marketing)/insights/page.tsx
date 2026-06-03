import FeaturedPost from "@/app/components/posts/FeaturedPost";
import PostCard from "@/app/components/posts/PostCard";
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
    
    const featuredPost = posts.find(post => post.isFeatured);

    return (
        <div>
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

            {!queryCategory && featuredPost && <div className="my-10 w-full"><FeaturedPost post={featuredPost} /> </div>}

            <div className="my-10 grid gap-6 md:grid-cols-2">
                {posts.map(post => (
                    post.isFeatured ? null : <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}