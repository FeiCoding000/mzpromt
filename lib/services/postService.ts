import { getAllPublishedPosts, getPostByCategory, getPostBySlug, PostCategory } from "@/lib/queries/posts";
import { categoryEnum } from "@/db/schema";

export async function getPublishedPosts() {
    return await getAllPublishedPosts();
}

export async function getPostsByCategory(category: string) {
    if (!categoryEnum.enumValues.includes(category as PostCategory)) {
        throw new Error("Invalid category.");
    }
    return await getPostByCategory(category as PostCategory);
}

export async function getPostBySlugService(slug: string) {
    const post = await getPostBySlug(slug);
    if (!post) {
        throw new Error("Post not found.");
    }
    return post;
}
