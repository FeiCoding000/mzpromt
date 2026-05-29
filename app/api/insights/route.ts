import { NextResponse } from "next/server";
import { getPublishedPosts, getPostsByCategory } from "@/lib/services/postService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    try {
        const posts = category
            ? await getPostsByCategory(category)
            : await getPublishedPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return error instanceof Error
            ? NextResponse.json({ ok: false, error: error.message }, { status: 400 })
            : NextResponse.json({ ok: false, error: "An unexpected error occurred" }, { status: 400 });
    }
}

