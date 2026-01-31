"use client";

import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import Link from "next/link";

interface BlogSectionProps {
    blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
    // Show only the latest 3 blogs on the home page
    const featuredBlogs = blogs.slice(0, 3);

    return (
        <section id="blog" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4 block"
                        >
                            Insight & Innovation
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold font-outfit"
                        >
                            Latest from <span className="text-gradient">Our Blog</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-2 text-white font-semibold hover:text-blue-400 transition-colors"
                        >
                            View All Articles
                            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400/10 transition-all">
                                →
                            </span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredBlogs.map((blog, index) => (
                        <BlogCard key={blog.slug} blog={blog} index={index} />
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 -right-64 w-128 h-128 bg-blue-600/10 blur-3xl rounded-full -z-10" />
            <div className="absolute bottom-0 -left-64 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full -z-10" />
        </section>
    );
}
