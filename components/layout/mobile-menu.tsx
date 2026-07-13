"use client";

import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CompactMenu, MegaMenu } from "./nav-data";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    expandedSection: string | null;
    onToggleSection: (label: string) => void;
    megaNav: MegaMenu[];
    compactNav: CompactMenu[];
    useMegaMenu: boolean;
}

const getDynamicShareHref = (href: string) => {
    if (typeof window === "undefined") return href;
    const origin = window.location.origin;
    if (href.includes("wa.me")) {
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Support Unity Bridge Kenya 🇰🇪 - Lifting burdens, building futures: ` + origin
        )}`;
    }
    if (href.includes("facebook.com/sharer")) {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(origin)}`;
    }
    return href;
};

export function MobileMenu({
    isOpen,
    onClose,
    expandedSection,
    onToggleSection,
    megaNav,
    compactNav,
    useMegaMenu
}: MobileMenuProps) {
    if (!isOpen) return null;

    // Build mobile link list from whichever data set is active
    const mobileItems = useMegaMenu
        ? megaNav.map(m => ({ 
            label: m.label, 
            icon: m.featured.icon, 
            links: m.columns.flatMap(c => c.links.map(l => ({ ...l, icon: m.featured.icon }))) 
        }))
        : compactNav.map(m => ({ 
            label: m.label, 
            icon: m.items[0]?.icon, 
            links: m.items.map(i => ({ label: i.label, href: i.href, icon: i.icon, external: i.external })) 
        }));

    return (
        <div className="xl:hidden border-t border-[var(--border-light)] py-3 animate-fade-in">
            <div className="space-y-0.5">
                {mobileItems.map(item => {
                    const isSectionOpen = expandedSection === item.label;
                    const Icon = item.icon;
                    return (
                        <div key={item.label}>
                            <button
                                onClick={() => onToggleSection(item.label)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                {item.label}
                                <ChevronDown className={cn("w-4 h-4 text-[var(--text-muted)] transition-transform duration-200", isSectionOpen && "rotate-180")} />
                            </button>
                            {isSectionOpen && (
                                <div className="ml-4 mb-2 space-y-0.5 animate-fade-in">
                                    {item.links.map(link =>
                                        link.external ? (
                                            <a key={link.label} href={getDynamicShareHref(link.href)} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--primary-green)] hover:bg-[var(--bg-secondary)] transition-colors">
                                                <Icon className="w-4 h-4 shrink-0" />
                                                {link.label} <span className="text-[10px] opacity-50">↗</span>
                                            </a>
                                        ) : (
                                            <Link key={link.label} href={link.href} onClick={onClose}
                                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--primary-green)] hover:bg-[var(--bg-secondary)] transition-colors">
                                                <Icon className="w-4 h-4 shrink-0" />
                                                {link.label}
                                            </Link>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="px-2 pt-3 mt-3 border-t border-[var(--border-light)]">
                <Link href="/donate" onClick={onClose}>
                    <Button variant="primary" className="w-full font-bold">
                        <Heart className="w-4 h-4" fill="currentColor" /> Donate Now
                    </Button>
                </Link>
            </div>
        </div>
    );
}
