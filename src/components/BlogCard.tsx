import Link from "next/link";
import type { BlogPost } from "@/lib/blogPosts";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.datePublished).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white/5 border border-border rounded-2xl p-6 hover:bg-white/8 hover:border-gold/30 transition-all duration-200"
    >
      <div className="mb-4">
        <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${post.categoryColor}`}>
          {post.category}
        </span>
      </div>
      <h2 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-gold transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-white/5 pt-4">
        <span>{date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
