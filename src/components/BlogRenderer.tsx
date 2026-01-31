"use client";

import {
    BlogSection,
    BlogTable,
    ContentBlock,
    isFlexibleBlog,
    BlogPost,
    StructuredBlogPost,
    FlexibleBlogPost
} from "@/types/blog";
import { motion } from "framer-motion";

// Main renderer that handles both formats
interface BlogRendererProps {
    blog: BlogPost;
}

export default function BlogRenderer({ blog }: BlogRendererProps) {
    if (isFlexibleBlog(blog)) {
        return <FlexibleContentRenderer content={blog.content} />;
    }

    // It's a structured blog
    const structuredBlog = blog as StructuredBlogPost;
    return (
        <div className="space-y-16">
            {structuredBlog.sections?.map((section, idx) => (
                <StructuredSectionRenderer key={section.id} section={section} index={idx} />
            ))}
        </div>
    );
}

// Renderer for flexible content blocks
function FlexibleContentRenderer({ content }: { content: ContentBlock[] }) {
    return (
        <div className="space-y-8">
            {content.map((block, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                    {renderContentBlock(block)}
                </motion.div>
            ))}
        </div>
    );
}

function renderContentBlock(block: ContentBlock) {
    switch (block.type) {
        case "heading":
            return renderHeading(block.level, block.text);
        case "paragraph":
            return <p className="text-gray-300 leading-relaxed text-lg">{block.text}</p>;
        case "table":
            return (
                <FlexibleTableRenderer
                    title={block.title}
                    columns={block.columns}
                    rows={block.rows}
                />
            );
        case "list":
            return (
                <ul className={`space-y-2 text-gray-300 ${block.style === "numbered" ? "list-decimal" : "list-disc"} list-inside`}>
                    {block.items.map((item, i) => (
                        <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                </ul>
            );
        case "image":
            return (
                <figure className="my-8">
                    <img
                        src={block.src}
                        alt={block.alt || ""}
                        className="rounded-xl w-full object-cover"
                    />
                    {block.caption && (
                        <figcaption className="text-center text-gray-500 text-sm mt-3">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        default:
            return null;
    }
}

function renderHeading(level: number, text: string) {
    const baseClass = "font-bold font-outfit text-white";
    switch (level) {
        case 1:
            return <h1 className={`${baseClass} text-4xl mb-6`}>{text}</h1>;
        case 2:
            return <h2 className={`${baseClass} text-3xl mb-4 mt-12`}>{text}</h2>;
        case 3:
            return <h3 className={`${baseClass} text-2xl text-blue-400 mb-3`}>{text}</h3>;
        default:
            return <h4 className={`${baseClass} text-xl mb-2`}>{text}</h4>;
    }
}

function FlexibleTableRenderer({ title, columns, rows }: { title?: string; columns: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/10 glass-dark my-8">
            {title && (
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h4 className="font-semibold text-white">{title}</h4>
                </div>
            )}
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400 font-medium uppercase tracking-wider">
                    <tr>
                        {columns.map((header, i) => (
                            <th key={i} className="px-6 py-4 border-b border-white/10">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {rows.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                            {row.map((cell, j) => (
                                <td key={j} className="px-6 py-4 text-gray-300">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Renderer for structured sections (original format)
function StructuredSectionRenderer({ section, index }: { section: BlogSection; index: number }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <h2 className="text-3xl font-bold mb-6 font-outfit text-white">
                {section.title}
            </h2>

            {section.content?.map((para, pIdx) => (
                <p key={pIdx} className="text-gray-300 leading-relaxed mb-4 text-lg">
                    {para}
                </p>
            ))}

            {section.statisticsTable && (
                <div className="my-8">
                    <TableRenderer table={section.statisticsTable} />
                </div>
            )}

            {section.toolsTable && (
                <div className="my-8">
                    <TableRenderer table={section.toolsTable} />
                </div>
            )}

            {section.sdlcTable && (
                <div className="my-8">
                    <TableRenderer table={section.sdlcTable} />
                </div>
            )}

            {section.sentimentTable && (
                <div className="my-8">
                    <TableRenderer table={section.sentimentTable} />
                </div>
            )}

            {section.riskTable && (
                <div className="my-8">
                    <TableRenderer table={section.riskTable} />
                </div>
            )}

            {section.subsections?.map((sub, subIdx) => (
                <div key={subIdx} className="mt-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-400">
                        {sub.title}
                    </h3>
                    {sub.content.map((para, pIdx) => (
                        <p key={pIdx} className="text-gray-300 leading-relaxed text-lg">
                            {para}
                        </p>
                    ))}
                    {sub.comparisonTable && (
                        <div className="mt-6">
                            <TableRenderer table={sub.comparisonTable} />
                        </div>
                    )}
                </div>
            ))}
        </motion.section>
    );
}

function TableRenderer({ table }: { table: BlogTable }) {
    const headers = table.headers || table.columns || [];

    return (
        <div className="overflow-x-auto rounded-xl border border-white/10 glass-dark">
            {table.title && (
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h4 className="font-semibold text-white">{table.title}</h4>
                </div>
            )}
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400 font-medium uppercase tracking-wider">
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="px-6 py-4 border-b border-white/10">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {table.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                            {row.map((cell, j) => (
                                <td key={j} className="px-6 py-4 text-gray-300">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
