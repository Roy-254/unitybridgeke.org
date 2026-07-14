import {
    Users, Phone, Heart, BarChart3,
    HandHeart, UserPlus, Handshake, Share2,
    HelpCircle, Globe, TrendingUp,
    type LucideIcon,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────
export interface CompactNavItem { 
    label: string; 
    href: string; 
    icon: LucideIcon; 
    desc: string; 
    external?: boolean; 
}

export interface CompactMenu { 
    label: string; 
    cols: 1 | 2; 
    items: CompactNavItem[]; 
}

export interface MegaLink { 
    label: string; 
    href: string; 
    external?: boolean; 
}

export interface MegaColumn { 
    heading: string; 
    links: MegaLink[]; 
}

export interface MegaFeatured {
    heading: string; 
    body: string;
    cta: { label: string; href: string };
    icon: LucideIcon; 
    image: string;
    stats?: { value: string; label: string }[];
}

export interface MegaMenu { 
    label: string; 
    featured: MegaFeatured; 
    columns: MegaColumn[]; 
}

// ═══════════════════════════════════════════════════════════════════
//  COMPACT nav data (FULL_WIDTH_MEGA_MENU = false)
// ═══════════════════════════════════════════════════════════════════
export const COMPACT_NAV: CompactMenu[] = [
    {
        label: "About Us", cols: 1,
        items: [
            { label: "Who We Are", href: "/about", icon: Users, desc: "Our story and values" },
            { label: "Mission & Vision", href: "/about#mission", icon: Heart, desc: "What drives us forward" },
            { label: "Accountability", href: "/accountability", icon: BarChart3, desc: "How we use funds" },
            { label: "Contact Us", href: "/contact", icon: Phone, desc: "Get in touch" },
        ],
    },
    {
        label: "Get Involved", cols: 2,
        items: [
            { label: "Make a Donation", href: "/explore", icon: HandHeart, desc: "Support a project today" },
            { label: "Volunteer With Us", href: "/get-involved#volunteer", icon: UserPlus, desc: "Lend your time & skills" },
            { label: "Partner With Us", href: "/get-involved#partner", icon: Handshake, desc: "Corporate & NGO partnerships" },
            { label: "Spread the Word", href: "/get-involved#share", icon: Share2, desc: "Help us reach more people" },
        ],
    },
    {
        label: "Impact", cols: 1,
        items: [
            { label: "Our Work", href: "/our-work", icon: BarChart3, desc: "Active initiatives & stories" },
            { label: "How We Help", href: "/how-it-works", icon: HelpCircle, desc: "Our process & approach" },
            { label: "Impact Report 2026", href: "/reports/2026", icon: Globe, desc: "Our 2026 report" },
        ],
    },
];

// ═══════════════════════════════════════════════════════════════════
//  MEGA nav data (FULL_WIDTH_MEGA_MENU = true)
// ═══════════════════════════════════════════════════════════════════
export const MEGA_NAV: MegaMenu[] = [
    {
        label: "About Us",
        featured: {
            icon: TrendingUp,
            image: "/site-images/community-leaders.webp",
            heading: "Lifting burdens, building futures",
            body: "Unity Bridge Kenya bridges the gap between donors and verified charitable initiatives — from school fees to emergency relief.",
            cta: { label: "Our Full Story", href: "/about" },
        },
        columns: [
            {
                heading: "Who We Are",
                links: [
                    { label: "Our Story", href: "/about#story" },
                    { label: "Mission & Vision", href: "/about#mission" },
                    { label: "Our Values", href: "/about#values" },
                    { label: "Our Team", href: "/about#team" },
                ],
            },
            {
                heading: "Accountability",
                links: [
                    { label: "How We Use Funds", href: "/accountability#funds" },
                    { label: "Project Verification", href: "/accountability#verification" },
                ],
            },
            {
                heading: "Connect",
                links: [
                    { label: "Contact Us", href: "/contact" },
                    { label: "FAQs", href: "/contact#faq" },
                ],
            },
        ],
    },
    {
        label: "Get Involved",
        featured: {
            icon: HandHeart,
            image: "/site-images/volunteer-impact.webp",
            heading: "Join us in making a difference",
            body: "Whether you donate, volunteer, or share — every action helps a Kenyan family overcome hardship. No act is too small.",
            cta: { label: "Donate Now", href: "/donate" },
            stats: [
                { value: "KES 950K+", label: "Total Raised" },
                { value: "200+", label: "Supporters" },
                { value: "3", label: "Focus Areas" },
            ],
        },
        columns: [
            {
                heading: "Give",
                links: [
                    { label: "Make a Donation", href: "/explore" },
                    { label: "Corporate Giving", href: "/get-involved#partner" },
                ],
            },
            {
                heading: "Act",
                links: [
                    { label: "Volunteer With Us", href: "/get-involved#volunteer" },
                    { label: "Become a Partner", href: "/get-involved#partner" },
                    { label: "Host a Fundraiser", href: "/get-involved#fundraise" },
                ],
            },
            {
                heading: "Share",
                links: [
                    { label: "Spread the Word", href: "/get-involved#share" },
                ],
            },
        ],
    },
    {
        label: "Impact",
        featured: {
            icon: Globe,
            image: "/site-images/children-joy.webp",
            heading: "Real change, real people",
            body: "Track how donations are used and follow the progress of every project we fund. Transparency is at the heart of what we do.",
            cta: { label: "See Our Work", href: "/our-work" },
            stats: [
                { value: "KES 950K+", label: "Raised to date" },
                { value: "3", label: "Active projects" },
                { value: "2026", label: "Year founded" },
            ],
        },
        columns: [
            {
                heading: "Our Work",
                links: [
                    { label: "Current Projects", href: "/explore" },
                    { label: "Project Updates", href: "/our-work#updates" },
                    { label: "How It Works", href: "/how-it-works" },
                ],
            },
            {
                heading: "Reports",
                links: [
                    { label: "Impact Report 2026", href: "/reports/2026" },
                    { label: "Transparency Dashboard", href: "/transparency" },
                    { label: "Track Your Donation", href: "/track" },
                ],
            },
        ],
    },
];
