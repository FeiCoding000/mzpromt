import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }: { content: string }) {
    const normalizedContent = content.replace(/\\n/g, "\n");

    return (
        <div className="space-y-4 leading-7 text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {normalizedContent}
            </ReactMarkdown>
        </div>
    );
}
