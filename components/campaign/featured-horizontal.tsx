"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Share2, Check } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon, CopyLinkIcon } from "@/components/ui/social-icons";
import { shareToPlatform } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import { getCoverImage } from "@/lib/utils";
import { type FeaturedProject } from "@/lib/mock-data";

export function FeaturedHorizontal({ projects }: { projects: FeaturedProject[] }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // We calculate horizontal scroll based on how many items we have
    // This allows the right-most tile to be fully exposed before the user finishes scrolling
    // We use calc(-100% + 100vw) so the scroll perfectly stops when the right edge of the content hits the right edge of the screen, regardless of the number of items.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

    const [showShareMenu, setShowShareMenu] = useState(false);
    const [shareUrl, setShareUrl] = useState("https://unitybridgeke.org/#our-impact");
    const [copied, setCopied] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(`${window.location.origin}/#our-impact`);
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
                setShowShareMenu(false);
            }
        }
        if (showShareMenu) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showShareMenu]);

    const handleShareOption = async (platform: string) => {
        const text = "Check out the impact Unity Bridge Kenya is making — verified projects changing lives across Kenya!";
        if (platform === "whatsapp") {
            window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`, "_blank");
            setShowShareMenu(false);
        } else if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
            setShowShareMenu(false);
        } else if (platform === "instagram" || platform === "tiktok") {
            // Android: Intent URL opens app directly. iOS: navigator.share. Desktop: clipboard.
            await shareToPlatform(platform as "instagram" | "tiktok", shareUrl, text, () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
            setShowShareMenu(false);
        } else if (platform === "copy") {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => { setCopied(false); setShowShareMenu(false); }, 1800);
        }
    };


    return (
        <section id="our-impact" ref={targetRef} className="relative bg-[var(--bg-primary)] overflow-hidden">
            {/* Header: Left-aligned text, right-aligned button, scrolls away naturally */}
            <div className="container-custom pt-16 pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
                    <div className="max-w-2xl text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary-green)] mb-2 block">OUR IMPACT</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-none">Featured Projects</h2>
                        <p className="text-[var(--text-secondary)] text-sm md:text-base opacity-70 leading-relaxed max-w-lg mt-2">
                            Verified projects needing your support right now.
                        </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                        <Link href="/explore">
                            <Button variant="outline" size="sm" className="rounded-full px-8 hover:bg-[var(--primary-green)] hover:text-white transition-all font-bold border-[var(--border-light)] text-[var(--text-primary)] h-11 text-xs group uppercase tracking-widest">
                                View All Projects
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        {/* Share button */}
                        <div className="relative" ref={shareRef}>
                            <button
                                onClick={() => setShowShareMenu(prev => !prev)}
                                aria-label="Share this section"
                                className="w-11 h-11 rounded-full border border-[var(--border-light)] bg-transparent flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)] hover:bg-[var(--primary-green)]/8 transition-all duration-200"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>

                            {showShareMenu && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                    {[
                                        { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon className="w-5 h-5" /> },
                                        { id: "facebook", label: "Facebook", icon: <FacebookIcon className="w-5 h-5" /> },
                                        { id: "instagram", label: copied ? "Copied! → Instagram" : "Instagram", icon: <InstagramIcon className="w-5 h-5" /> },
                                        { id: "tiktok", label: copied ? "Copied! → TikTok" : "TikTok", icon: <TikTokIcon className="w-5 h-5" /> },
                                        { id: "copy", label: copied ? "Copied!" : "Copy Link", icon: <CopyLinkIcon className="w-5 h-5 text-[var(--text-muted)]" /> },
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleShareOption(opt.id)}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors text-left"
                                        >
                                            <span className="shrink-0">{opt.icon}</span>
                                            <span className={copied && (opt.id === "instagram" || opt.id === "tiktok" || opt.id === "copy") ? "text-emerald-500 font-semibold" : ""}>{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full flex overflow-hidden py-10">
                {/* Shadow indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee items-center gap-6 md:gap-8 px-6">
                    {/* Group 1 */}
                    {projects.map((project) => {
                        const coverImage = getCoverImage(project.images);
                        const categoryColor = CATEGORY_COLORS[project.category as keyof typeof CATEGORY_COLORS] ?? CATEGORY_COLORS.other;
                        const categoryLabel = CATEGORY_LABELS[project.category as keyof typeof CATEGORY_LABELS] ?? project.category;

                        return (
                            <div key={`group1-${project.id}`} className="w-[300px] md:w-[420px] shrink-0">
                                <Card className="overflow-hidden group min-h-[460px] flex flex-col border-[var(--border-light)] bg-[var(--bg-secondary)] shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl items-stretch hover:-translate-y-2">
                                    <div className="relative h-[220px] overflow-hidden shrink-0">
                                        <Image
                                            src={coverImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            sizes="(max-width: 768px) 300px, 420px"
                                        />
                                        <div className="absolute top-5 left-5">
                                            <span className={`px-4 py-1.5 text-[9px] font-black rounded-full uppercase tracking-widest backdrop-blur-md shadow-lg border border-white/10 ${categoryColor}`}>
                                                {categoryLabel}
                                            </span>
                                        </div>
                                    </div>

                                    <CardContent className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base md:text-lg font-black text-[var(--text-primary)] line-clamp-1 leading-tight mb-2 group-hover:text-[var(--primary-green)] transition-colors">
                                                {project.title.replace(/^(Upcoming|Future)\s+/i, "")}
                                            </h3>
                                            <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed opacity-75">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-[var(--border-light)]/40 overflow-hidden">
                                            <Link href={`/campaign/${project.slug}`} className="w-full">
                                                <Button className="w-full h-12 rounded-xl bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white font-bold text-base group/btn shadow-lg shadow-green-900/10">
                                                    Support Now
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                    
                    {/* Group 2 (Duplicate for seamless loop) */}
                    {projects.map((project) => {
                        const coverImage = getCoverImage(project.images);
                        const categoryColor = CATEGORY_COLORS[project.category as keyof typeof CATEGORY_COLORS] ?? CATEGORY_COLORS.other;
                        const categoryLabel = CATEGORY_LABELS[project.category as keyof typeof CATEGORY_LABELS] ?? project.category;

                        return (
                            <div key={`group2-${project.id}`} className="w-[300px] md:w-[420px] shrink-0">
                                <Card className="overflow-hidden group min-h-[460px] flex flex-col border-[var(--border-light)] bg-[var(--bg-secondary)] shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl items-stretch hover:-translate-y-2">
                                    <div className="relative h-[220px] overflow-hidden shrink-0">
                                        <Image
                                            src={coverImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            sizes="(max-width: 768px) 300px, 420px"
                                        />
                                        <div className="absolute top-5 left-5">
                                            <span className={`px-4 py-1.5 text-[9px] font-black rounded-full uppercase tracking-widest backdrop-blur-md shadow-lg border border-white/10 ${categoryColor}`}>
                                                {categoryLabel}
                                            </span>
                                        </div>
                                    </div>

                                    <CardContent className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base md:text-lg font-black text-[var(--text-primary)] line-clamp-1 leading-tight mb-2 group-hover:text-[var(--primary-green)] transition-colors">
                                                {project.title.replace(/^(Upcoming|Future)\s+/i, "")}
                                            </h3>
                                            <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed opacity-75">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-[var(--border-light)]/40 overflow-hidden">
                                            <Link href={`/campaign/${project.slug}`} className="w-full">
                                                <Button className="w-full h-12 rounded-xl bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white font-bold text-base group/btn shadow-lg shadow-green-900/10">
                                                    Support Now
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
