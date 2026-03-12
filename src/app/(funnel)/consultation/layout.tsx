import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export const metadata = {
    title: "Book a Consultation | Asrnova",
    description:
        "Schedule a free 30-minute consultation with Asrnova to discuss your next digital project.",
};

export default function FunnelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            {/* Minimal header — logo only */}
            <header className="py-8 flex justify-center">
                <Link href="/">
                    <Image src={logo} alt="ASRNOVA" height={32} className="w-auto" />
                </Link>
            </header>

            {/* Funnel content */}
            <main className="flex-1 flex items-start justify-center px-4 pb-16">
                <div className="w-full max-w-2xl">{children}</div>
            </main>
        </div>
    );
}
