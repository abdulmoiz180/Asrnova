"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <section className="section-padding bg-gradient-to-b from-transparent to-blue-900/10">
            <div className="max-w-4xl mx-auto text-center">
                <SectionHeading subtitle="What They Say" centered>
                    Trusted by Innovators
                </SectionHeading>

                {testimonials.map((testimonial) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <GlassCard className="!p-12 md:!p-16">
                            <span className="text-6xl text-blue-500/20 font-serif absolute top-8 left-8">“</span>
                            <p className="text-xl md:text-2xl italic leading-relaxed text-gray-300 mb-8 relative z-10">
                                {testimonial.quote}
                            </p>
                            <div className="flex flex-col items-center">
                                <h4 className="text-lg font-bold font-outfit">{testimonial.author}</h4>
                                <p className="text-blue-500 text-sm">{testimonial.role}</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
