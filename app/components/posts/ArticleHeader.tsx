import Image from "next/image"
import type { Post } from "@/db/schema"
import { Avatar} from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
export default function ArticleHeader({ post }: { post: Post }) {
    return (
        <div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center space-x-4 mt-2 my-4">
                <Avatar>
                    <AvatarImage src={"/default-avatar.jpg"} alt={post.title} width={40} height={40} />
                </Avatar>
                <h2 className="text-sm text-gray-600">Published on {post.publishedAt?.toLocaleDateString()}</h2>
            </div>
            <Image className="w-full h-auto object-cover" src={post.coverImageUrl || "/default-image.jpg"} alt={post.title} width={800} height={400} />
        </div>
    )
}
