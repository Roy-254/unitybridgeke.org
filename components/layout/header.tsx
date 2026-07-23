"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import { MEGA_NAV, COMPACT_NAV } from "./nav-data";
import { MegaPanel } from "./mega-panel";
import { CompactPanel } from "./compact-panel";
import { MobileMenu } from "./mobile-menu";

// ─────────────────────────────────────────────────────────────────
//  FEATURE FLAG — set false to revert to compact dropdown menus
// ─────────────────────────────────────────────────────────────────
const FULL_WIDTH_MEGA_MENU = true;

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 16);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const openDropdown = (label: string) => { 
        if (leaveTimer.current) clearTimeout(leaveTimer.current); 
        setActiveDropdown(label); 
    };
    
    const closeDropdown = () => { 
        leaveTimer.current = setTimeout(() => setActiveDropdown(null), 120); 
    };
    
    const stayOpen = () => { 
        if (leaveTimer.current) clearTimeout(leaveTimer.current); 
    };

    const toggleMobileSection = (label: string) =>
        setMobileExpanded(prev => prev === label ? null : label);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 relative text-white",
                isScrolled || mobileOpen
                    ? "bg-[var(--primary-accent)] shadow-lg border-b border-white/10"
                    : "bg-[var(--primary-accent)] border-b border-white/10"
            )}
            onMouseLeave={closeDropdown}
        >
            <nav className="container-custom">
                {/* ── Main bar ── */}
                <div className="flex items-center justify-between h-16 xl:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0" onClick={() => setActiveDropdown(null)}>
                        <div className="relative w-9 h-9 xl:w-11 xl:h-11 shrink-0">
                            <Image src="/logo.webp" alt="Unity Bridge Kenya" fill className="object-contain" priority />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-base xl:text-lg font-bold text-white whitespace-nowrap hidden sm:block">Unity Bridge Kenya</span>
                            <span className="text-base font-bold text-white sm:hidden">Unity Bridge</span>
                            <span className="text-[10px] font-semibold text-[var(--secondary-accent)] uppercase tracking-widest hidden sm:block">Building Bridges of Hope</span>
                        </div>
                    </Link>

                    {/* Desktop nav triggers */}
                    <div className="hidden xl:flex items-center gap-0.5">
                        {FULL_WIDTH_MEGA_MENU
                            ? MEGA_NAV.map(item => (
                                <button
                                    key={item.label}
                                    onMouseEnter={() => openDropdown(item.label)}
                                    aria-expanded={activeDropdown === item.label}
                                    aria-haspopup="true"
                                    className={cn(
                                        "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150",
                                        activeDropdown === item.label
                                            ? "text-[var(--secondary-accent)] bg-white/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.label}
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                                </button>
                            ))
                            : COMPACT_NAV.map(item => (
                                <div key={item.label} className="relative" onMouseEnter={() => openDropdown(item.label)} onMouseLeave={closeDropdown}>
                                    <button className={cn(
                                        "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150",
                                        activeDropdown === item.label
                                            ? "text-[var(--secondary-accent)] bg-white/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    )}>
                                        {item.label}
                                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                                    </button>
                                    {activeDropdown === item.label && (
                                        <CompactPanel menu={item} onClose={() => setActiveDropdown(null)} stayOpen={stayOpen} onLeave={closeDropdown} />
                                    )}
                                </div>
                            ))
                        }
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href="/donate" className="hidden sm:block" onClick={() => setActiveDropdown(null)}>
                            <Button variant="primary" size="sm" className="font-bold shadow-md shadow-black/20 px-5">
                                Donate Now
                            </Button>
                        </Link>
                        <button
                            className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile menu ── */}
                <MobileMenu 
                    isOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    expandedSection={mobileExpanded}
                    onToggleSection={toggleMobileSection}
                    megaNav={MEGA_NAV}
                    compactNav={COMPACT_NAV}
                    useMegaMenu={FULL_WIDTH_MEGA_MENU}
                />
            </nav>

            {/* ── Full-width mega panels (outside container, inside header) ── */}
            {activeDropdown && !mobileOpen && FULL_WIDTH_MEGA_MENU && (() => {
                const menu = MEGA_NAV.find(m => m.label === activeDropdown);
                return menu ? <MegaPanel key={activeDropdown} menu={menu} onClose={() => setActiveDropdown(null)} /> : null;
            })()}
        </header>
    );
}
