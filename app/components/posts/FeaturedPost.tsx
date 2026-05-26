import ArticleHeader from "./ArticleHeader";
import MarkdownContent from "./MarkdownContent";
import type { Post } from "@/db/schema";
export default function FeaturedPost({ post }: { post: Post }) {
    return (
        <div>
            <ArticleHeader post={post} />
            <MarkdownContent content={post.content} />
        </div>
    )
}