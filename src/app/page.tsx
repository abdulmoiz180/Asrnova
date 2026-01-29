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

async function getContent() {
  const filePath = path.join(process.cwd(), "public", "content.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

export default async function Home() {
  const content = await getContent();

  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero content={content.hero} />
      <Services services={content.services} />
      <Projects projects={content.projects} />
      <WhyUs features={content.whyAsrnova} />
      <Testimonials testimonials={content.testimonials} />
      <Contact />
      <Footer />
    </main>
  );
}
