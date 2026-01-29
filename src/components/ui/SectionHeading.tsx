"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
    children: ReactNode;
    subtitle?: string;
    centered?: boolean;
}

export default function SectionHeading({
    children,
    subtitle,
    centered = false,
}: SectionHeadingProps) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : ""}`}>
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-4 block"
                >
                    {subtitle}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold font-outfit"
            >
                {children}
            </motion.h2>
        </div>
    );
}
