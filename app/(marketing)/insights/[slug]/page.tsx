import { getPostBySlugService } from "@/lib/services/postService";
import ArticleHeader from "@/app/components/posts/ArticleHeader";
import MarkdownContent from "@/app/components/posts/MarkdownContent";
import ContactUs from "@/app/components/contact/ContactUs";
import Link from "next/dist/client/link";
import { ChevronLeft } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugService(slug);

  return (
    <div>
      <section className="container">
        <div className="mb-10 flex items-center gap-4">
          <Link href="/insights" className="text-sm font-medium">
            <ChevronLeft className="inline mr-2" />
            Back to Insights
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            <ArticleHeader post={post} />
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </section>
    </div>
  );
}
