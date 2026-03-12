import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { BlogPost } from "@/types/blog";
import { CaseStudy } from "@/types/caseStudy";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asrnova.com";

    // Static pages
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${base}/`, changeFrequency: "monthly", priority: 1.0 },
        { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ];

    // Blog posts
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const blogsPath = path.join(process.cwd(), "public", "blogs.json");
        const blogs: BlogPost[] = JSON.parse(fs.readFileSync(blogsPath, "utf8"));
        blogRoutes = blogs.map((blog) => ({
            url: `${base}/blog/${blog.slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));
    } catch {
        // blogs.json may not exist
    }

    // Case studies
    let caseStudyRoutes: MetadataRoute.Sitemap = [];
    try {
        const casePath = path.join(process.cwd(), "public", "caseStudies.json");
        const studies: CaseStudy[] = JSON.parse(fs.readFileSync(casePath, "utf8"));
        caseStudyRoutes = studies.map((study) => ({
            url: `${base}/case-study/${study.slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));
    } catch {
        // caseStudies.json may not exist
    }

    return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
