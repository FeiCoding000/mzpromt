"use client";
import HeroComponent from "@/app/components/main/HeroComponent";
import CatergoryFilter from "@/app/components/posts/CatergoryFilter";
import FeaturedPost from "@/app/components/posts/FeaturedPost";
import PostCard from "@/app/components/posts/PostCard";
import PostListItem from "@/app/components/posts/PostListItem";
import type { Post } from "@/db/schema";
import { useState } from "react";

export default function Page() {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const insightsProps = {
        title: "Insights",
        description: "Stay updated with the latest news and insights from our team.",
        backgroundImageUrl: "insights.jpg"
    };

    const mockedPosts: Post[] = [
        {
            id: 1,
            title: "ATO New Tax Measures: Essential Updates for Australian Small Businesses",
            slug: "post-1",
            excerpt: "This is a brief excerpt of the first post.",
            category: "Tax",
            status: "published",
            isFeatured: true,
            content: "Content of the first post. More details about the first post go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            coverImageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
            publishedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            title: "Understanding the New Accounting Standards for Small Businesses",
            slug: "post-2",
            category: "Accounting",
            status: "published",
            isFeatured: false,
            excerpt: "This is a brief excerpt of the second post.",
            content: "Content of the second post. More details about the second post go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            coverImageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
            publishedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            title: "Top 5 Financial Tips for Small Business Owners in 2024",
            slug: "post-3",
            excerpt: "This is a brief excerpt of the third post.",
            category: "Business",
            status: "published",
            isFeatured: false,
            content: "Content of the third post. More details about the third post go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            coverImageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
            publishedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const categories = Array.from(new Set(mockedPosts.map(post => post.category))).concat("All").reverse();
    const featuredPost = mockedPosts.find(post => post.isFeatured);

    const onCategorySelect = (category: string) => {
        console.log("Selected category:", category);
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredPosts(mockedPosts);
        } else {
            setFilteredPosts(mockedPosts.filter(post => post.category === category));
        }
    };

    return (
        <div>
            <HeroComponent heroInfo={insightsProps} />
            <section className="container py-10 flex flex-col bg-emerald-50 lg:flex-row gap-10">

                <main className="py-10 lg:w-3/4">
                    <div>
                    <CatergoryFilter categories={categories} onCategorySelect={onCategorySelect} />
                    </div>

                    
                    {featuredPost &&  selectedCategory === "All" && <div className="my-10 w-full"><FeaturedPost post={featuredPost} /> </div>}

                    <div className="my-10 grid gap-6 md:grid-cols-2">
                    {filteredPosts.map(post => (
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