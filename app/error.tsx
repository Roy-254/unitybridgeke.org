"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]" />

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* Visual element */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl animate-pulse" />
                    <div className="relative flex items-center justify-center w-full h-full">
                        <AlertTriangle className="w-24 h-24 text-red-500 opacity-80" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 tracking-tight">
                    Something went wrong
                </h1>
                
                <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    An unexpected error occurred while building the bridge. We&apos;ve been notified and are working on it.
                </p>

                {error.digest && (
                    <div className="mb-10 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-light)] inline-block">
                        <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">Error ID</p>
                        <p className="text-xs font-mono text-[var(--text-primary)]">{error.digest}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        onClick={() => reset()}
                        className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-900/20"
                    >
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Try Again
                    </Button>
                    <Link href="/" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full h-14 px-8 rounded-2xl font-bold border-[var(--border-light)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-[var(--border-light)]/50">
                    <p className="text-sm text-[var(--text-muted)]">
                        Persistent issue? <Link href="/contact" className="text-red-500 font-bold hover:underline">Report a bug</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
