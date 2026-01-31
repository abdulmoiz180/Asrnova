import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogRenderer from "@/components/BlogRenderer";
import { BlogPost, isFlexibleBlog, isStructuredBlog, StructuredBlogPost } from "@/types/blog";
import Link from "next/link";
import Contact from "@/components/Contact";

async function getBlogs(): Promise<BlogPost[]> {
    const filePath = path.join(process.cwd(), "public", "blogs.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blogs = await getBlogs();
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        notFound();
    }

    const isStructured = isStructuredBlog(blog);
    const structuredBlog = isStructured ? (blog as StructuredBlogPost) : null;

    return (
        <main className="min-h-screen relative">
            <Navbar />

            <article className="pt-32 pb-24 relative">
                <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
                    <Link
                        href="/blog"
                        className="text-blue-500 hover:text-blue-400 font-medium mb-8 inline-flex items-center gap-2 group transition-colors"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Journal
                    </Link>

                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            {blog.meta.category && (
                                <span className="text-blue-400 font-semibold tracking-widest uppercase text-xs px-2 py-1 rounded bg-blue-500/10">
                                    {blog.meta.category}
                                </span>
                            )}
                            {blog.meta.publishedYear && (
                                <span className="text-gray-500 text-sm">
                                    {blog.meta.publishedYear}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-white leading-tight">
                            {blog.meta.title}
                        </h1>
                        {blog.meta.subtitle && (
                            <p className="text-xl text-blue-400 font-medium italic">
                                {blog.meta.subtitle}
                            </p>
                        )}
                    </div>

                    <div className="glass-card p-8 md:p-12 rounded-3xl mb-16 border-blue-500/20">
                        {/* Introduction section for structured blogs */}
                        {structuredBlog?.introduction && (
                            <div className="mb-12 pb-12 border-b border-white/10">
                                <h2 className="text-2xl font-bold mb-6 text-white font-outfit">Introduction</h2>
                                <p className="text-gray-300 text-lg leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">
                                    {structuredBlog.introduction.summary}
                                </p>

                                {blog.meta.tags && blog.meta.tags.length > 0 && (
                                    <div className="mt-8 flex flex-wrap gap-2">
                                        {blog.meta.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-full text-gray-400 border border-white/10">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags for flexible blogs at top */}
                        {isFlexibleBlog(blog) && blog.meta.tags && blog.meta.tags.length > 0 && (
                            <div className="mb-8 flex flex-wrap gap-2">
                                {blog.meta.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-full text-gray-400 border border-white/10">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Main content renderer */}
                        <BlogRenderer blog={blog} />

                        {/* Conclusion section for structured blogs */}
                        {structuredBlog?.conclusion && (
                            <div className="mt-16 pt-12 border-t border-white/10">
                                <h2 className="text-2xl font-bold mb-6 text-white font-outfit">Conclusion</h2>
                                <div className="space-y-4">
                                    {structuredBlog.conclusion.content.map((para, i) => (
                                        <p key={i} className="text-gray-300 text-lg leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* References for structured blogs */}
                        {structuredBlog?.references && structuredBlog.references.length > 0 && (
                            <div className="mt-16 pt-12 border-t border-white/10">
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">References & Reading</h3>
                                <ul className="space-y-4">
                                    {structuredBlog.references.map((ref, i) => (
                                        <li key={i}>
                                            <a
                                                href={ref.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 transition-colors flex flex-col"
                                            >
                                                <span className="font-semibold">{ref.title}</span>
                                                <span className="text-sm text-gray-500">Source: {ref.source}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-blue-600/5 blur-3xl rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-600/5 blur-3xl rounded-full -z-10" />
            </article>
            <Contact />
            <Footer />
        </main>
    );
}
