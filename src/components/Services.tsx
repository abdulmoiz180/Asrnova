"use client";

import GlassCard from "./ui/GlassCard";
import SectionHeading from "./ui/SectionHeading";

interface Service {
    id: string;
    title: string;
    description: string;
}

interface ServicesProps {
    services: Service[];
}

export default function Services({ services }: ServicesProps) {
    return (
        <section id="services" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="What We Do">
                    Our Services
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <GlassCard key={service.id} delay={index * 0.1}>
                            <div className="mb-6 w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xl">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-outfit">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
