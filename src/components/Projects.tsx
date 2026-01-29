"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import Button from "./ui/Button";

interface Project {
    id: string;
    title: string;
    overview: string;
    features: string;
    techStack: string[];
    actionLabel: string | null;
}

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section id="projects" className="section-padding bg-black/50">
            <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="Success Stories">
                    Featured Projects
                </SectionHeading>

                <div className="flex flex-col gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <GlassCard className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden !p-0">
                                <div className={`p-8 md:p-12 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                                    <h3 className="text-3xl font-bold mb-6 font-outfit">{project.title}</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {project.overview}
                                    </p>
                                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                        {project.features}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {project.actionLabel && (
                                        <Button variant="outline" className="px-8">
                                            {project.actionLabel}
                                        </Button>
                                    )}
                                </div>

                                <div className={`aspect-video bg-gradient-to-br from-blue-900/40 to-purple-900/40 relative group ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                                        <span className="text-6xl font-bold font-outfit tracking-tighter invisible">IMAGE</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
