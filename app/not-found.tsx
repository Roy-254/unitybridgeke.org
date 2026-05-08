"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary-green)]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--primary-blue)]/5 rounded-full blur-[120px]" />

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* Visual element */}
                <div className="relative w-64 h-64 mx-auto mb-8 animate-float">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-green)]/20 to-[var(--primary-blue)]/20 rounded-full blur-2xl" />
                    <div className="relative flex items-center justify-center w-full h-full">
                        <span className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--primary-green)] to-[var(--primary-blue)] opacity-20">404</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Heart className="w-24 h-24 text-[var(--primary-green)] opacity-80" fill="currentColor" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
                    Page Not Found
                </h1>
                
                <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto leading-relaxed">
                    Oops! It seems the bridge you&apos;re looking for hasn&apos;t been built yet, or it might have moved.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold shadow-xl shadow-green-900/20">
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold border-[var(--border-light)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
                            <Search className="w-5 h-5 mr-2" />
                            Browse Projects
                        </Button>
                    </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-[var(--border-light)]/50">
                    <p className="text-sm text-[var(--text-muted)]">
                        Need help? <Link href="/contact" className="text-[var(--primary-green)] font-bold hover:underline">Contact our support team</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
