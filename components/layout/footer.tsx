"use client";

import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)] py-12 border-t border-[var(--border-light)] transition-colors duration-300">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-6 h-6 text-[var(--secondary-accent)]" fill="currentColor" />
                            <span className="font-bold text-[var(--text-primary)] transition-colors duration-300">Unity Bridge Kenya</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                            A charitable organisation (registration pending) building bridges of hope across Kenya — one project at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4 transition-colors duration-300">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)] transition-colors duration-300">
                            <li><Link href="/explore" className="hover:text-[var(--primary-accent)] transition-colors">Our Projects</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-[var(--primary-accent)] transition-colors">How It Works</Link></li>
                            <li><Link href="/about" className="hover:text-[var(--primary-accent)] transition-colors">About Us</Link></li>
                            <li><Link href="/transparency" className="hover:text-[var(--primary-accent)] transition-colors">Transparency</Link></li>
                            <li><Link href="/contact#faq" className="hover:text-[var(--primary-accent)] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4 transition-colors duration-300">Support</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)] transition-colors duration-300">
                            <li><Link href="/contact" className="hover:text-[var(--primary-accent)] transition-colors">Contact Us</Link></li>
                            <li><Link href="/track" className="hover:text-[var(--primary-accent)] transition-colors">Track Donation</Link></li>
                            <li><Link href="/accountability" className="hover:text-[var(--primary-accent)] transition-colors">How We Work</Link></li>
                            <li><Link href="/reports/2026" className="hover:text-[var(--primary-accent)] transition-colors">Impact Report</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4 transition-colors duration-300">Connect</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-2 transition-colors duration-300">support@unitybridgeke.org</p>
                        <p className="text-sm text-[var(--text-secondary)] mb-4 transition-colors duration-300">0740 797 404</p>
                        <div className="flex gap-3">
                            <Link href="/get-involved#share" className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-white transition-colors" aria-label="Share options on Get Involved page">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-white transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-white transition-colors" aria-label="YouTube">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-light)] text-center text-sm text-[var(--text-muted)] transition-colors duration-300">
                    <p>&copy; {new Date().getFullYear()} Unity Bridge Kenya. All rights reserved. Charitable Organisation (Registration Pending).</p>
                </div>
            </div>
        </footer>
    );
}
