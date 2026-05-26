import Image from "next/image"
import type { Post } from "@/db/schema"
export default function ArticleHeader({ post }: { post: Post }) {
    return (
        <div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div>
                <h2 className="text-sm text-gray-600">Published on {post.publishedAt?.toLocaleDateString()}</h2>
            </div>
            <Image className="w-full h-auto object-cover" src={post.coverImageUrl || "/default-image.jpg"} alt={post.title} width={800} height={400} />
        </div>
    )
}
