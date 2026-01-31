"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface ParticleConfig {
    x: number;
    duration: number;
    delay: number;
}

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // Generate particle configs only on client after mount
    const particles = useMemo<ParticleConfig[]>(() => {
        if (!isMounted) return [];
        return [...Array(6)].map(() => ({
            x: Math.random() * window.innerWidth,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
    }, [isMounted]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        // Check if page is loaded
        const handleLoad = () => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 600);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Fallback timeout
        const timeout = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 600);
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            window.removeEventListener("load", handleLoad);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
                >
                    {/* Ambient Background Glow */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                            }}
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
                            }}
                        />
                    </div>

                    {/* Logo Container */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative flex flex-col items-center gap-8"
                    >
                        {/* Animated Logo */}
                        <div className="relative">
                            {/* Logo Glow Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute -inset-8 rounded-full opacity-50"
                                style={{
                                    background:
                                        "conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent, rgba(168, 85, 247, 0.3), transparent)",
                                }}
                            />

                            {/* Main Logo Text */}
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold font-outfit tracking-tighter relative z-10"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-white"
                                >
                                    ASR
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="text-blue-500"
                                >
                                    NOVA
                                </motion.span>
                            </motion.h1>
                        </div>

                        {/* Animated Dots */}
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.4, 1, 0.4],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                    className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                />
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-sm text-gray-500 tracking-widest uppercase"
                        >
                            Loading Experience
                        </motion.p>
                    </motion.div>

                    {/* Particle Effects - Only render after client mount */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {isMounted && particles.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-blue-500/30"
                                initial={{
                                    x: particle.x,
                                    y: window.innerHeight + 10,
                                }}
                                animate={{
                                    y: -10,
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
