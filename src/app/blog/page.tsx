import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { blogPosts, BASE_URL } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Photo Booth Hire Blog — Tips, Guides & Prices | FunLoading360",
  description: "Expert advice on photo booth hire for weddings, parties, proms and corporate events across Essex, Kent & London.",
  openGraph: {
    title: "Photo Booth Hire Blog — FunLoading360",
    description: "Tips, guides and pricing advice for photo booth hire across Essex, Kent & London.",
    url: `${BASE_URL}/blog`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${BASE_URL}/blog` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-4 bg-gold/10 px-3 py-1 rounded-full">
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Photo Booth Hire Blog
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Expert guides, local tips, and honest advice for photo booth hire across Essex, Kent &amp; London.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
