"use client";

import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";

interface Feature {
    id: string;
    title: string;
    description: string;
}

interface WhyUsProps {
    features: Feature[];
}

export default function WhyUs({ features }: WhyUsProps) {
    return (
        <section id="about" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="Why Choose Us" centered>
                    Building Software That Matters
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <GlassCard key={feature.id} delay={index * 0.1}>
                            <h3 className="text-xl font-bold mb-4 font-outfit text-gradient">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
