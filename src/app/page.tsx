import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

async function getContent() {
  const filePath = path.join(process.cwd(), "public", "content.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

async function getBlogs() {
  const filePath = path.join(process.cwd(), "public", "blogs.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

export default async function Home() {
  const content = await getContent();
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero content={content.hero} />
      <Services services={content.services} />
      <Projects projects={content.projects} />
      <WhyUs features={content.whyAsrnova} />
      <Testimonials testimonials={content.testimonials} />
      <BlogSection blogs={blogs} />
      <Contact />
      <Footer />
    </main>
  );
}
