import { NextResponse } from "next/server";
import { getPublishedPosts, getPostsByCategory } from "@/lib/services/postService";

export async function GET() {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const { category } = await request.json();
    if (!category) {
        return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    try {
        const posts = await getPostsByCategory(category);
        return NextResponse.json(posts);
    } catch (error) {
     return error instanceof Error
        ? NextResponse.json({ ok: false, error: error.message }, { status: 400 })
        : NextResponse.json({ ok: false, error: "An unexpected error occurred" }, { status: 400 });
    }
}
