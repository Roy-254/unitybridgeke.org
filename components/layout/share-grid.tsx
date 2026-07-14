"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export function ShareGrid() {
    const [shareUrl, setShareUrl] = useState("https://unitybridgeke.org");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, []);

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Support Unity Bridge Kenya 🇰🇪 - Lifting burdens, building futures: ` + shareUrl
    )}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(
        "Support Unity Bridge Kenya"
    )}&body=${encodeURIComponent(
        `I thought you'd want to know about this organisation doing great work in Kenya: ` + shareUrl
    )}`;

    const shareItems = [
        {
            icon: "💬",
            title: "Share on WhatsApp",
            desc: "Send our link to your contacts, family groups, or church chats.",
            href: whatsappUrl,
            label: "Share via WhatsApp",
        },
        {
            icon: "📘",
            title: "Share on Facebook",
            desc: "Post about a project you care about and tag us.",
            href: facebookUrl,
            label: "Share on Facebook",
        },
        {
            icon: "📧",
            title: "Tell Someone Today",
            desc: "Forward our website to a colleague, friend, or employer who gives.",
            href: emailUrl,
            label: "Share via Email",
        },
    ];

    return (
        <div className="grid sm:grid-cols-3 gap-5 text-left">
            {shareItems.map(({ icon, title, desc, href, label }) => (
                <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-2xl hover:border-[var(--primary-green)]/40 transition-colors"
                >
                    <span className="text-3xl block mb-3">{icon}</span>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-green)] transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                        {desc}
                    </p>
                    <span className="text-xs font-bold text-[var(--primary-green)] flex items-center gap-1">
                        {label} <ArrowRight className="w-3 h-3" />
                    </span>
                </a>
            ))}
        </div>
    );
}
