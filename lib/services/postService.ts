import { getAllPublishedPosts, getPostByCategory, PostCategory } from "@/lib/queries/posts";
import { categoryEnum } from "@/db/schema";

export async function getPublishedPosts() {
    return await getAllPublishedPosts();
}

export async function getPostsByCategory(category: PostCategory) {
    if (!categoryEnum.enumValues.includes(category)) {
        throw new Error("Invalid category.");
    }
    return await getPostByCategory(category);
}