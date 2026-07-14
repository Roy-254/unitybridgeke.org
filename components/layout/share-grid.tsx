"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, Share2 } from "lucide-react";
import {
    WhatsAppIcon,
    FacebookIcon,
    InstagramIcon,
    TikTokIcon,
} from "@/components/ui/social-icons";

export function ShareGrid() {
    const [siteUrl, setSiteUrl] = useState("https://unitybridgeke.org");
    const [copiedFor, setCopiedFor] = useState<string | null>(null);
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSiteUrl(window.location.origin);
            setCanNativeShare(!!navigator.share);
        }
    }, []);

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Support Unity Bridge Kenya 🇰🇪 — Lifting burdens, building futures: ${siteUrl}`
    )}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;

    /**
     * Instagram & TikTok have no public web share URL API.
     * The correct approach is navigator.share() (native OS share sheet on mobile)
     * which pre-loads the URL and lets the user pick any installed app.
     * Falls back to clipboard copy on desktop where the API is unavailable.
     */
    const handleNativeShare = async (platform: "instagram" | "tiktok") => {
        const shareData = {
            title: "Unity Bridge Kenya",
            text: "Support Unity Bridge Kenya 🇰🇪 — Lifting burdens, building futures.",
            url: siteUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled — do nothing
            }
        } else {
            // Desktop fallback: copy link to clipboard
            await navigator.clipboard.writeText(siteUrl);
            setCopiedFor(platform);
            setTimeout(() => setCopiedFor(null), 3000);
        }
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
            desc: "Tap to open your phone's share sheet — choose Instagram to share our link in your story, bio, or DMs instantly.",
            actionLabel:
                copiedFor === "instagram"
                    ? "Link copied! Paste on Instagram ✓"
                    : canNativeShare
                    ? "Share on Instagram"
                    : "Copy link for Instagram",
            onClick: () => handleNativeShare("instagram"),
        },
        {
            id: "tiktok",
            icon: <TikTokIcon className="w-8 h-8" />,
            iconBg: "bg-neutral-400/10",
            title: "Share on TikTok",
            desc: "Tap to open your phone's share sheet — choose TikTok to drop our link in your bio, caption, or a video comment.",
            actionLabel:
                copiedFor === "tiktok"
                    ? "Link copied! Paste on TikTok ✓"
                    : canNativeShare
                    ? "Share on TikTok"
                    : "Copy link for TikTok",
            onClick: () => handleNativeShare("tiktok"),
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
                        <span
                            className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                            {icon}
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-green)] transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                            {desc}
                        </p>
                        <span
                            className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                                isCopied ? "text-emerald-500" : "text-[var(--primary-green)]"
                            }`}
                        >
                            {isCopied ? (
                                <Check className="w-3 h-3" />
                            ) : (
                                <ArrowRight className="w-3 h-3" />
                            )}
                            {actionLabel}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
