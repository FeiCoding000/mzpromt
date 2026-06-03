import { getPostBySlugService } from "@/lib/services/postService";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const post = await getPostBySlugService(slug);

    if (!post) {
        return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: post });
}