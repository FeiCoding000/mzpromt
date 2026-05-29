import { getAllPublishedPosts, getPostByCategory, PostCategory } from "@/lib/queries/posts";
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