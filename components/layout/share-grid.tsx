"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
    WhatsAppIcon,
    FacebookIcon,
    InstagramIcon,
    TikTokIcon,
} from "@/components/ui/social-icons";
import { shareToPlatform } from "@/lib/utils";

export function ShareGrid() {
    const [siteUrl, setSiteUrl] = useState("https://unitybridgeke.org");
    const [copiedFor, setCopiedFor] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSiteUrl(window.location.origin);
        }
    }, []);

    const shareText = "Support Unity Bridge Kenya 🇰🇪 — Lifting burdens, building futures.";
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${siteUrl}`)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;

    const handleNative = async (platform: "instagram" | "tiktok") => {
        await shareToPlatform(platform, siteUrl, shareText, () => {
            setCopiedFor(platform);
            setTimeout(() => setCopiedFor(null), 3000);
        });
    };

    const shareItems = [
        {
            id: "whatsapp",
            icon: <WhatsAppIcon className="w-8 h-8" />,
            iconBg: "bg-[#25D366]/10",
            title: "Share on WhatsApp",
            desc: "Send our link to your contacts, family groups, or church chats.",
            actionLabel: "Share via WhatsApp",
            onClick: () => window.open(whatsappUrl, "_blank", "noopener,noreferrer"),
        },
        {
            id: "facebook",
            icon: <FacebookIcon className="w-8 h-8" />,
            iconBg: "bg-[#1877F2]/10",
            title: "Share on Facebook",
            desc: "Post about a project you care about and tag our page.",
            actionLabel: "Share on Facebook",
            onClick: () => window.open(facebookUrl, "_blank", "noopener,noreferrer"),
        },
        {
            id: "instagram",
            icon: <InstagramIcon className="w-8 h-8" />,
            iconBg: "bg-pink-500/10",
            title: "Share on Instagram",
            desc: "Post our link in your story, pin it to your bio, or DM it to friends and family who care about Kenya.",
            actionLabel: copiedFor === "instagram" ? "Link copied! Paste on Instagram ✓" : "Share on Instagram",
            onClick: () => handleNative("instagram"),
        },
        {
            id: "tiktok",
            icon: <TikTokIcon className="w-8 h-8" />,
            iconBg: "bg-neutral-400/10",
            title: "Share on TikTok",
            desc: "Mention us in your next video, drop our link in the comments, or add it to your bio to inspire your followers to give.",
            actionLabel: copiedFor === "tiktok" ? "Link copied! Paste on TikTok ✓" : "Share on TikTok",
            onClick: () => handleNative("tiktok"),
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {shareItems.map(({ id, icon, iconBg, title, desc, actionLabel, onClick }) => {
                const isCopied = copiedFor === id;
                return (
                    <button
                        key={id}
                        onClick={onClick}
                        className="group p-5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-2xl hover:border-[var(--primary-green)]/40 transition-all text-left"
                    >
                        <span className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            {icon}
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-green)] transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                            {desc}
                        </p>
                        <span className={`text-xs font-bold flex items-center gap-1 transition-colors ${isCopied ? "text-emerald-500" : "text-[var(--primary-green)]"}`}>
                            {isCopied ? <Check className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                            {actionLabel}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
