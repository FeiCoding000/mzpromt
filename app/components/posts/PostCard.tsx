import type { Post } from "@/db/schema";
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="h-100 border hover:shadow-lg transition-shadow duration-300 flex flex-col bg-cover bg-center rounded-lg overflow-hidden">
      <div
        className="w-full h-1/2"
        style={{
          backgroundImage: `url('${post.coverImageUrl}')`
        }}
      ></div>
      <div className="p-4 h-1/2">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600">
          Published on {post.publishedAt?.toLocaleDateString()}
        </p>
        <p className="text-gray-600">{post.excerpt}</p>
        <p className="text-sm mt-2">Read more...</p>
      </div>
    </div>
  );
}
