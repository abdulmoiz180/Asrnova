"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    onClick,
    className = "",
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 glow disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: "bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed",
        outline: "border border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed",
        ghost: "text-white underline hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed",
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
}
