"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { InlineWidget } from "react-calendly";
import { submitLeadData } from "./actions";

/* ------------------------------------------------------------------ */
/*  Schema                                                            */
/* ------------------------------------------------------------------ */
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().min(1, "Company is required"),
    email: z.string().email("Please enter a valid email"),
    projectType: z.array(z.string()).min(1, "Select at least one project type"),
    budget: z.string().min(1, "Please select a budget range"),
});

type FormValues = z.infer<typeof formSchema>;

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */
const STEPS = ["Basics", "Project", "Budget", "Book"];

const PROJECT_TYPES = [
    { id: "web", label: "Web App Development", icon: "🌐" },
    { id: "mobile", label: "Mobile App", icon: "📱" },
    { id: "integration", label: "System Integration", icon: "⚙️" },
];

const BUDGETS = [
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-15k", label: "$5,000 – $15,000" },
    { value: "15k-50k", label: "$15,000 – $50,000" },
    { value: "50k-plus", label: "$50,000 +" },
];

const CALENDLY_URL = "https://calendly.com/moiza8684/30min";

/* ------------------------------------------------------------------ */
/*  Animations                                                        */
/* ------------------------------------------------------------------ */
const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function ConsultationPage() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        trigger,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            company: "",
            email: "",
            projectType: [],
            budget: "",
        },
    });

    const selectedTypes = watch("projectType");

    /* helpers -------------------------------------------------------- */
    const next = async () => {
        let valid = false;
        if (step === 0) valid = await trigger(["name", "company", "email"]);
        if (step === 1) valid = await trigger("projectType");
        if (step === 2) valid = await trigger("budget");

        if (!valid) return;

        if (step === 2) {
            // Submit lead data before showing Calendly
            setServerError(null);
            startTransition(async () => {
                const res = await submitLeadData(getValues());
                if (!res.success) {
                    setServerError("Submission failed. Please try again.");
                    return;
                }
                setDirection(1);
                setStep(3);
            });
            return;
        }

        setDirection(1);
        setStep((s) => s + 1);
    };

    const back = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    const toggleProjectType = (id: string) => {
        const current = getValues("projectType");
        const updated = current.includes(id)
            ? current.filter((t) => t !== id)
            : [...current, id];
        setValue("projectType", updated, { shouldValidate: true });
    };

    /* ---------------------------------------------------------------- */
    /*  Render                                                          */
    /* ---------------------------------------------------------------- */
    return (
        <div className="space-y-8 relative">
            {/* Back to Home Navigation */}
            <div className="absolute -top-12 left-0">
                <Link
                    href="/"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Home
                </Link>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {STEPS.map((label, i) => (
                        <span
                            key={label}
                            className={
                                i <= step ? "text-blue-400" : "text-gray-600"
                            }
                        >
                            {label}
                        </span>
                    ))}
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={false}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Card */}
            <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden min-h-[420px]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* ------ STEP 0: Basics ------ */}
                        {step === 0 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold font-outfit">
                                        Let&apos;s get to know you
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Tell us the basics so we can personalise your experience.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <Field
                                        label="Full Name"
                                        error={errors.name?.message}
                                    >
                                        <input
                                            {...register("name")}
                                            placeholder="Jane Doe"
                                            className="funnel-input"
                                        />
                                    </Field>

                                    <Field
                                        label="Company"
                                        error={errors.company?.message}
                                    >
                                        <input
                                            {...register("company")}
                                            placeholder="Acme Inc."
                                            className="funnel-input"
                                        />
                                    </Field>

                                    <Field
                                        label="Email"
                                        error={errors.email?.message}
                                    >
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="jane@acme.com"
                                            className="funnel-input"
                                        />
                                    </Field>
                                </div>
                            </div>
                        )}

                        {/* ------ STEP 1: Project ------ */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold font-outfit">
                                        What do you need built?
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Select all that apply.
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    {PROJECT_TYPES.map((pt) => {
                                        const active =
                                            selectedTypes.includes(pt.id);
                                        return (
                                            <button
                                                key={pt.id}
                                                type="button"
                                                onClick={() =>
                                                    toggleProjectType(pt.id)
                                                }
                                                className={`flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 ${
                                                    active
                                                        ? "border-blue-500 bg-blue-500/10 text-white"
                                                        : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white"
                                                }`}
                                            >
                                                <span className="text-2xl">
                                                    {pt.icon}
                                                </span>
                                                <span className="font-medium">
                                                    {pt.label}
                                                </span>
                                                {active && (
                                                    <span className="ml-auto text-blue-400">
                                                        ✓
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {errors.projectType && (
                                    <p className="text-red-400 text-sm">
                                        {errors.projectType.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ------ STEP 2: Budget ------ */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold font-outfit">
                                        What&apos;s your budget range?
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        This helps us tailor the right solution for you.
                                    </p>
                                </div>

                                <Field
                                    label="Budget"
                                    error={errors.budget?.message}
                                >
                                    <select
                                        {...register("budget")}
                                        className="funnel-input"
                                    >
                                        <option value="" disabled>
                                            Select a range…
                                        </option>
                                        {BUDGETS.map((b) => (
                                            <option key={b.value} value={b.value}>
                                                {b.label}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                {serverError && (
                                    <p className="text-red-400 text-sm">
                                        {serverError}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ------ STEP 3: Calendly ------ */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold font-outfit">
                                        Pick a time that works
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Book a free 30-minute consultation with our team.
                                    </p>
                                </div>

                                <div className="rounded-xl overflow-hidden -mx-2">
                                    <InlineWidget
                                        url={CALENDLY_URL}
                                        prefill={{
                                            name: getValues("name"),
                                            email: getValues("email"),
                                        }}
                                        styles={{ height: "660px" }}
                                        pageSettings={{
                                            backgroundColor: "000000",
                                            primaryColor: "3b82f6",
                                            textColor: "ffffff",
                                            hideLandingPageDetails: true,
                                            hideEventTypeDetails: true,
                                            hideGdprBanner: true,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {step < 3 && (
                <div className="flex items-center justify-between">
                    {step > 0 ? (
                        <button
                            type="button"
                            onClick={back}
                            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                            ← Back
                        </button>
                    ) : (
                        <span />
                    )}

                    <button
                        type="button"
                        onClick={next}
                        disabled={isPending}
                        className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-all duration-300 glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Spinner /> Submitting…
                            </>
                        ) : step === 2 ? (
                            "Submit & Book"
                        ) : (
                            "Continue →"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */
function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            {children}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
}

function Spinner() {
    return (
        <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
    );
}
