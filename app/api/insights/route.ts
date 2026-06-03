import { NextResponse } from "next/server";
import { getPublishedPosts, getPostsByCategory, getPostBySlugService } from "@/lib/services/postService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    try {
        const posts = slug
            ? await getPostBySlugService(slug)
            : category
            ? await getPostsByCategory(category)
            : await getPublishedPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return error instanceof Error
            ? NextResponse.json({ ok: false, error: error.message }, { status: 400 })
            : NextResponse.json({ ok: false, error: "An unexpected error occurred" }, { status: 400 });
    }
}





