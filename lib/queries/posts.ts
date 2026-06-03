import { posts, categoryEnum } from "@/db/schema";
import { db } from "@/lib/db";
import { eq, and, desc } from "drizzle-orm";

export async function getAllPublishedPosts() {
    const allPost = await db.select().from(posts).where(eq(posts.status, "published"));
    return allPost;
}

export type PostCategory = typeof categoryEnum.enumValues[number];

export async function getPostByCategory(category: PostCategory) {
    const post = await db.select().from(posts).where(and(eq(posts.status, "published"), eq(posts.category, category)));
    return post;
}

export async function getPostBySlug(slug: string) {
    const post = await db.select().from(posts).where(and(eq(posts.status, "published"), eq(posts.slug, slug))).limit(1);
    return post[0] || null;
}

export async function getRecentPublishedPosts(limit = 3) {
    const recentPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
        .limit(limit);

    return recentPosts;
}