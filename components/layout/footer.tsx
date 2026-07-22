"use client";

import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[var(--bg-tertiary)] py-12 border-t border-[var(--border-light)]">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-6 h-6 text-[var(--primary-green)]" fill="currentColor" />
                            <span className="font-bold text-[var(--text-primary)]">Unity Bridge Kenya</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">
                            A registered charity organisation building bridges of hope across Kenya — one project at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                            <li><Link href="/explore" className="hover:text-[var(--primary-green)]">Our Projects</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-[var(--primary-green)]">How It Works</Link></li>
                            <li><Link href="/about" className="hover:text-[var(--primary-green)]">About Us</Link></li>
                            <li><Link href="/transparency" className="hover:text-[var(--primary-green)]">Transparency</Link></li>
                            <li><Link href="/contact#faq" className="hover:text-[var(--primary-green)]">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                            <li><Link href="/contact" className="hover:text-[var(--primary-green)]">Contact Us</Link></li>
                            <li><Link href="/track" className="hover:text-[var(--primary-green)]">Track Donation</Link></li>
                            <li><Link href="/accountability" className="hover:text-[var(--primary-green)]">How We Work</Link></li>
                            <li><Link href="/reports/2026" className="hover:text-[var(--primary-green)]">Impact Report</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4">Connect</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">support@unitybridgeke.org</p>
                        <p className="text-sm text-[var(--text-secondary)] mb-4">0740 797 404</p>
                        <div className="flex gap-3">
                            <Link href="/get-involved#share" className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--primary-green)] hover:text-white transition-colors" aria-label="Share options on Get Involved page">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--primary-green)] hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--primary-green)] hover:text-white transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--primary-green)] hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--primary-green)] hover:text-white transition-colors" aria-label="YouTube">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-light)] text-center text-sm text-[var(--text-secondary)]">
                    <p>&copy; {new Date().getFullYear()} Unity Bridge Kenya. All rights reserved. Registered Charity Organisation.</p>
                </div>
            </div>
        </footer>
    );
}
