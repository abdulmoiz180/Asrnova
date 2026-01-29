"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    onClick?: () => void;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    onClick,
    className = "",
}: ButtonProps) {
    const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 glow",
        secondary: "bg-white text-black hover:bg-gray-200",
        outline: "border border-white/20 text-white hover:bg-white/10",
        ghost: "text-white underline hover:text-blue-400",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
}
