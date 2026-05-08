"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { CompactMenu } from "./nav-data";

interface CompactPanelProps {
    menu: CompactMenu;
    onClose: () => void;
    stayOpen: () => void;
    onLeave: () => void;
}

export function CompactPanel({ menu, onClose, stayOpen, onLeave }: CompactPanelProps) {
    return (
        <div
            className="absolute top-full left-1/2 mt-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)] shadow-2xl overflow-hidden z-50 p-2"
            style={{ animation: "dropdownEnter 0.2s ease-out forwards", transformOrigin: "top center", minWidth: menu.cols === 2 ? "480px" : "260px" }}
            onMouseEnter={stayOpen}
            onMouseLeave={onLeave}
        >
            <div className="h-0.5 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] rounded-full mb-3 mx-2" />
            <div className={cn("grid gap-1", menu.cols === 2 ? "grid-cols-2" : "grid-cols-1")}>
                {menu.items.map(sub => {
                    const Icon = sub.icon;
                    return (
                        <Link key={sub.href + sub.label} href={sub.href} onClick={onClose} prefetch={false}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors group">
                            <div className="w-8 h-8 rounded-lg bg-[var(--primary-green)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary-green)]/20 transition-colors mt-0.5">
                                <Icon className="w-4 h-4 text-[var(--primary-green)]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary-green)] transition-colors leading-tight">{sub.label}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">{sub.desc}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
