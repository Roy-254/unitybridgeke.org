"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./nav-data";

interface MegaPanelProps {
    menu: MegaMenu;
    onClose: () => void;
}

export function MegaPanel({ menu, onClose }: MegaPanelProps) {
    const colCount = menu.columns.length;

    return (
        <div
            className="absolute top-full left-0 w-full bg-[var(--bg-primary)] border-b border-[var(--border-light)] shadow-2xl z-50"
            style={{ animation: "megaMenuEnter 0.22s ease-out forwards" }}
        >
            {/* Accent line */}
            <div className="h-0.5 bg-gradient-to-r from-[var(--primary-green)] via-[var(--primary-blue)] to-[var(--primary-green)]" />

            <div className="container-custom py-7">
                <div
                    className="grid gap-0 divide-x divide-[var(--border-light)]"
                    style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
                >
                    {/* ── Featured panel with image ── */}
                    <div className="pr-7">
                        <div className="relative rounded-xl overflow-hidden" style={{ minHeight: "260px", height: "100%" }}>
                            <Image
                                src={menu.featured.image}
                                alt={menu.featured.heading}
                                fill
                                className="object-cover"
                                sizes="280px"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            {/* Content — heading + CTA only */}
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <h3 className="text-base font-extrabold text-white leading-snug mb-3">{menu.featured.heading}</h3>
                                <Link href={menu.featured.cta.href} onClick={onClose} className="block" prefetch={false}>
                                    <span className="flex items-center justify-center w-full py-2 text-xs font-bold bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white rounded-lg transition-colors">
                                        {menu.featured.cta.label} →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── Link columns ── */}
                    {menu.columns.map((col, i) => (
                        <div key={col.heading} className={cn("flex flex-col gap-1", i === 0 ? "px-7" : "px-7")}>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary-green)] mb-2 pb-2 border-b border-[var(--border-light)]">
                                {col.heading}
                            </h4>
                            {col.links.map(link =>
                                link.external ? (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-green)] hover:translate-x-1 transition-all duration-150 py-1 font-medium flex items-center gap-1"
                                    >
                                        {link.label}
                                        <span className="text-[10px] opacity-50">↗</span>
                                    </a>
                                ) : (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={onClose}
                                        prefetch={false}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-green)] hover:translate-x-1 transition-all duration-150 py-1 font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
