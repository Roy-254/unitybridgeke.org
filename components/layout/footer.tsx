"use client";

import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[var(--primary-accent)] py-12 border-t border-white/10 text-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-6 h-6 text-[var(--secondary-accent)]" fill="currentColor" />
                            <span className="font-bold text-white">Unity Bridge Kenya</span>
                        </div>
                        <p className="text-sm text-gray-300">
                            A charitable organisation (registration pending) building bridges of hope across Kenya — one project at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/explore" className="hover:text-[var(--secondary-accent)] transition-colors">Our Projects</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-[var(--secondary-accent)] transition-colors">How It Works</Link></li>
                            <li><Link href="/about" className="hover:text-[var(--secondary-accent)] transition-colors">About Us</Link></li>
                            <li><Link href="/transparency" className="hover:text-[var(--secondary-accent)] transition-colors">Transparency</Link></li>
                            <li><Link href="/contact#faq" className="hover:text-[var(--secondary-accent)] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/contact" className="hover:text-[var(--secondary-accent)] transition-colors">Contact Us</Link></li>
                            <li><Link href="/track" className="hover:text-[var(--secondary-accent)] transition-colors">Track Donation</Link></li>
                            <li><Link href="/accountability" className="hover:text-[var(--secondary-accent)] transition-colors">How We Work</Link></li>
                            <li><Link href="/reports/2026" className="hover:text-[var(--secondary-accent)] transition-colors">Impact Report</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Connect</h4>
                        <p className="text-sm text-gray-300 mb-2">support@unitybridgeke.org</p>
                        <p className="text-sm text-gray-300 mb-4">0740 797 404</p>
                        <div className="flex gap-3">
                            <Link href="/get-involved#share" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--secondary-accent)] hover:text-white transition-colors" aria-label="Share options on Get Involved page">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--secondary-accent)] hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--secondary-accent)] hover:text-white transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--secondary-accent)] hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--secondary-accent)] hover:text-white transition-colors" aria-label="YouTube">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Unity Bridge Kenya. All rights reserved. Charitable Organisation (Registration Pending).</p>
                </div>
            </div>
        </footer>
    );
}
