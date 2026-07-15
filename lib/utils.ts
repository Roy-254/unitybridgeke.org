import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format currency in Kenyan Shillings
 */
export function formatCurrency(amount: number, currency: "KES" | "USD" = "KES"): string {
    if (currency === "KES") {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Format large numbers with K, M suffixes
 */
export function formatCompactNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

/**
 * Calculate percentage
 */
export function calculatePercentage(current: number, target: number): number {
    if (target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
}

/**
 * Format date relative to now (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}

/**
 * Calculate days remaining until deadline
 */
export function getDaysRemaining(deadline: Date | string): number {
    const now = new Date();
    const end = new Date(deadline);
    const diffInMs = end.getTime() - now.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Validate Kenyan phone number
 */
export function isValidKenyanPhone(phone: string): boolean {
    // Kenyan phone numbers: +254XXXXXXXXX or 07XXXXXXXX or 01XXXXXXXX
    const regex = /^(\+254|0)[17]\d{8}$/;
    return regex.test(phone);
}

/**
 * Format Kenyan phone number to international format
 */
export function formatKenyanPhone(phone: string): string {
    // Remove any spaces or dashes
    const cleaned = phone.replace(/[\s-]/g, "");

    // If starts with 0, replace with +254
    if (cleaned.startsWith("0")) {
        return "+254" + cleaned.slice(1);
    }

    // If starts with 254, add +
    if (cleaned.startsWith("254")) {
        return "+" + cleaned;
    }

    // If already starts with +254, return as is
    if (cleaned.startsWith("+254")) {
        return cleaned;
    }

    return phone;
}

/**
 * Share on WhatsApp
 */
export function shareOnWhatsApp(text: string, url: string): void {
    const message = encodeURIComponent(`${text}\n\n${url}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
}

/**
 * Share on Facebook
 */
export function shareOnFacebook(url: string): void {
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
    );
}

/**
 * Share on Twitter
 */
export function shareOnTwitter(text: string, url: string): void {
    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank"
    );
}

/**
 * Get the cover image for a campaign (lowest order_index)
 */
export function getCoverImage(images?: { storage_url: string; order_index: number }[] | string[]): string {
    if (!images || images.length === 0) return "/placeholder-campaign.jpg";

    // Handle array of strings (legacy/fallback)
    if (typeof images[0] === "string") {
        return images[0] as string;
    }

    // Handle structured objects
    const structuredImages = images as { storage_url: string; order_index: number }[];
    return [...structuredImages].sort((a, b) => a.order_index - b.order_index)[0].storage_url;
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error("Failed to copy:", err);
        return false;
    }
}

/**
 * Share to Instagram or TikTok:
 * - Android : Intent URL → opens the target app directly with text pre-loaded (no OS share sheet).
 * - iOS/other: navigator.share() — native share sheet (best available on iOS).
 * - Desktop  : clipboard copy fallback, then calls onCopied().
 */
export async function shareToPlatform(
    platform: "instagram" | "tiktok",
    url: string,
    text: string,
    onCopied?: () => void
): Promise<void> {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const fullText = `${text}\n\n${url}`;

    // Always copy the content to clipboard first so the user can paste it
    try {
        await navigator.clipboard.writeText(fullText);
    } catch (err) {
        try {
            const textarea = document.createElement("textarea");
            textarea.value = fullText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        } catch { /* ignore */ }
    }

    // Trigger visual feedback (e.g. showing "Copied! → Instagram")
    onCopied?.();

    if (isAndroid) {
        // Android Intent URL: directly targets the installed app, bypassing the OS share sheet.
        // S.browser_fallback_url is used when the app is not installed.
        const packages: Record<string, string> = {
            instagram: "com.instagram.android",
            tiktok: "com.zhiliaoapp.musically",
        };
        const fallbacks: Record<string, string> = {
            instagram: "https://www.instagram.com/",
            tiktok: "https://www.tiktok.com/",
        };
        const encodedText = encodeURIComponent(fullText);
        const fallback = encodeURIComponent(fallbacks[platform]);
        window.location.href = `intent://#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=${encodedText};package=${packages[platform]};S.browser_fallback_url=${fallback};end`;
    } else if (isIOS) {
        // iOS: Immediately attempt to deep-link to the app, falling back to the browser.
        const schemes: Record<string, string> = {
            instagram: "instagram://",
            tiktok: "tiktok://",
        };
        const webFallbacks: Record<string, string> = {
            instagram: "https://www.instagram.com/",
            tiktok: "https://www.tiktok.com/",
        };

        const scheme = schemes[platform];
        const fallback = webFallbacks[platform];
        const start = Date.now();
        window.location.href = scheme;

        setTimeout(() => {
            if (Date.now() - start < 1500) {
                window.location.href = fallback;
            }
        }, 1000);
    } else {
        // Desktop / Other: Open web page in a new window/tab so they can paste it.
        const webUrls: Record<string, string> = {
            instagram: "https://www.instagram.com/",
            tiktok: "https://www.tiktok.com/upload",
        };
        window.open(webUrls[platform], "_blank", "noopener,noreferrer");
    }
}
