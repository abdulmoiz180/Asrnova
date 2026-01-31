"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost, isFlexibleBlog, isStructuredBlog, FlexibleBlogPost, StructuredBlogPost } from "@/types/blog";

interface BlogCardProps {
    blog: BlogPost;
    index: number;
}

function getExcerpt(blog: BlogPost): string {
    if (isStructuredBlog(blog)) {
        const structured = blog as StructuredBlogPost;
        return structured.introduction?.summary || blog.meta.subtitle || "";
    }

    // For flexible blogs, find the first paragraph
    const flexible = blog as FlexibleBlogPost;
    const firstPara = flexible.content.find(block => block.type === "paragraph");
    if (firstPara && firstPara.type === "paragraph") {
        // Truncate long paragraphs
        return firstPara.text.length > 200
            ? firstPara.text.substring(0, 200) + "..."
            : firstPara.text;
    }

    return blog.meta.subtitle || "";
}

export default function BlogCard({ blog, index }: BlogCardProps) {
    const excerpt = getExcerpt(blog);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group glass-card overflow-hidden hover:border-blue-500/50 transition-all duration-300"
        >
            <Link href={`/blog/${blog.slug}`}>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        {blog.meta.category && (
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/10 text-blue-400 uppercase tracking-wider">
                                {blog.meta.category}
                            </span>
                        )}
                        {blog.meta.publishedYear && (
                            <span className="text-xs text-gray-500">
                                {blog.meta.publishedYear}
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.meta.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                        {excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs font-medium text-gray-400">
                            By {blog.meta.author || "Asrnova"}
                        </span>
                        <span className="text-blue-500 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Read More →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
