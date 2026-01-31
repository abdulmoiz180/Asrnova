import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CaseStudy } from "@/types/caseStudy";
import Link from "next/link";
import Contact from "@/components/Contact";

async function getCaseStudies(): Promise<CaseStudy[]> {
    const filePath = path.join(process.cwd(), "public", "caseStudies.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudies = await getCaseStudies();
    const study = caseStudies.find((s) => s.slug === slug);

    if (!study) {
        notFound();
    }

    return (
        <main className="min-h-screen relative">
            <Navbar />

            <article className="pt-32 pb-24 relative">
                <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                    <Link
                        href="/#projects"
                        className="text-blue-500 hover:text-blue-400 font-medium mb-8 inline-flex items-center gap-2 group transition-colors"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
                    </Link>

                    {/* Hero Section */}
                    <div className="mb-16">
                        <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4 block">
                            Case Study
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-white leading-tight">
                            {study.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                            {study.overview.description}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        <div className="glass-card p-6 text-center">
                            <span className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Status</span>
                            <span className="text-lg font-semibold text-green-400">{study.overview.status}</span>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <span className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Role</span>
                            <span className="text-lg font-semibold text-white">{study.overview.role}</span>
                        </div>
                        <div className="glass-card p-6 text-center col-span-2">
                            <span className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Platforms</span>
                            <span className="text-lg font-semibold text-white">{study.overview.platforms.join(" • ")}</span>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="space-y-16">
                        {/* Problem Statement */}
                        <section className="glass-card p-8 md:p-12 rounded-3xl border-red-500/20">
                            <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">!</span>
                                Problem Statement
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                {study.problemStatement.summary}
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {study.problemStatement.problems.map((problem, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-400">
                                        <span className="w-2 h-2 rounded-full bg-red-500/50" />
                                        {problem}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Solution */}
                        <section className="glass-card p-8 md:p-12 rounded-3xl border-green-500/20">
                            <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">✓</span>
                                The Solution
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                {study.solution.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {study.solution.coreConcepts.map((concept, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">
                                        {concept}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Features */}
                        <section>
                            <h2 className="text-2xl font-bold mb-8 text-white font-outfit">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {study.features.map((feature, i) => (
                                    <div key={i} className="glass-card p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
                                        <h3 className="text-lg font-semibold text-white mb-4">{feature.title}</h3>
                                        <ul className="space-y-2">
                                            {feature.details.map((detail, j) => (
                                                <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Tech Stack */}
                        <section className="glass-card p-8 md:p-12 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-8 text-white font-outfit">Tech Stack</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Frontend</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {study.techStack.frontend.map((tech, i) => (
                                            <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Backend</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {study.techStack.backend.map((tech, i) => (
                                            <span key={i} className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {study.techStack.services.map((tech, i) => (
                                            <span key={i} className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Architecture */}
                        <section>
                            <h2 className="text-2xl font-bold mb-8 text-white font-outfit">Architecture</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-6 rounded-2xl">
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Multi-Tenancy</h3>
                                    <p className="text-white font-medium">{study.architecture.multiTenancy}</p>
                                </div>
                                <div className="glass-card p-6 rounded-2xl">
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Realtime</h3>
                                    <p className="text-white font-medium">{study.architecture.realtime}</p>
                                </div>
                                <div className="glass-card p-6 rounded-2xl">
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Data Model</h3>
                                    <p className="text-gray-400 text-sm">{study.architecture.dataModel.join(" → ")}</p>
                                </div>
                            </div>
                        </section>

                        {/* Responsibilities */}
                        <section className="glass-card p-8 md:p-12 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-6 text-white font-outfit">My Responsibilities</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {study.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                                            {i + 1}
                                        </span>
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Challenges */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-white font-outfit">Challenges Overcome</h2>
                            <div className="flex flex-wrap gap-3">
                                {study.challenges.map((challenge, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium border border-yellow-500/20">
                                        {challenge}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Outcome & Impact */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-card p-8 rounded-3xl border-green-500/20">
                                <h2 className="text-xl font-bold mb-6 text-white font-outfit">Outcome</h2>
                                <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold mb-4">
                                    {study.outcome.status}
                                </span>
                                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3 mt-4">Roadmap</h3>
                                <ul className="space-y-2">
                                    {study.outcome.roadmap.map((item, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass-card p-8 rounded-3xl border-blue-500/20">
                                <h2 className="text-xl font-bold mb-6 text-white font-outfit">Impact</h2>
                                <ul className="space-y-3">
                                    {study.impact.map((item, i) => (
                                        <li key={i} className="text-gray-300 flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs mt-0.5">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-600/5 blur-3xl rounded-full -z-10" />
                <div className="absolute bottom-1/4 left-0 w-1/4 h-1/2 bg-purple-600/5 blur-3xl rounded-full -z-10" />
            </article>
            <Contact />
            <Footer />
        </main>
    );
}
