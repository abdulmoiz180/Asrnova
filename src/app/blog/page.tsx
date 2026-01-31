import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types/blog";
import Contact from "@/components/Contact";

async function getBlogs(): Promise<BlogPost[]> {
    const filePath = path.join(process.cwd(), "public", "blogs.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
}

export default async function BlogListingPage() {
    const blogs = await getBlogs();

    return (
        <main className="min-h-screen relative">
            <Navbar />

            <section className="pt-32 pb-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-16">
                        <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4 block">
                            Our Journal
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6">
                            Latest <span className="text-gradient">Insights</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
                            Deep dives into software engineering, AI, and the future of digital experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <BlogCard key={blog.slug} blog={blog} index={index} />
                        ))}
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-600/5 blur-3xl rounded-full -z-10" />
            </section>
            <Contact />
            <Footer />
        </main>
    );
}
