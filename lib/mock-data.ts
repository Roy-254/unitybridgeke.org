import { CAMPAIGN_CATEGORIES } from "./constants";

export interface FeaturedProject {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    images: { storage_url: string; order_index: number }[];
    current_amount?: number;
    target_amount?: number;
    is_urgent?: boolean;
    view_count?: number;
}

/**
 * Shared mock project data used across homepage, explore, and other pages
 * when live data is unavailable or as placeholders.
 */
export const MOCK_PROJECTS: FeaturedProject[] = [
    {
        id: "2",
        slug: "clearing-hospital-bills",
        title: "Clearing hospital bills",
        description: "Supporting families burdened by medical debt, ensuring quality healthcare is accessible without financial ruin.",
        category: CAMPAIGN_CATEGORIES.MEDICAL,
        images: [{ storage_url: "/medical-relief-project.webp", order_index: 0 }],
        current_amount: 180000,
        target_amount: 500000,
        is_urgent: false,
        view_count: 89
    },
    {
        id: "1",
        slug: "every-kid-studies",
        title: "Making sure every kid studies",
        description: "Providing tuition support and learning materials to help underprivileged students stay in school and unlock their potential.",
        category: CAMPAIGN_CATEGORIES.SCHOOL_FEES,
        images: [{ storage_url: "/school-fees-project.webp", order_index: 0 }],
        current_amount: 350000,
        target_amount: 500000,
        is_urgent: false,
        view_count: 45
    },
    {
        id: "5",
        slug: "sisters-shield",
        title: "The Sisters' Shield Initiative",
        description: "Helping women overcome barriers by providing access to education, safe transitions, and financial support for a more secure and empowered future",
        category: CAMPAIGN_CATEGORIES.WOMEN_EMPOWERMENT,
        images: [{ storage_url: "/sisters-shield.webp", order_index: 0 }],
        current_amount: 0,
        target_amount: 1000000,
        is_urgent: true,
        view_count: 0
    },
    {
        id: "3",
        slug: "impacting-lives",
        title: "Impacting lives of the less privileged",
        description: "Community-led initiatives providing essential resources and sustainable support for vulnerable families across Kenya.",
        category: CAMPAIGN_CATEGORIES.COMMUNITY,
        images: [{ storage_url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop", order_index: 0 }],
        current_amount: 420000,
        target_amount: 600000,
        is_urgent: false,
        view_count: 120
    },
    {
        id: "4",
        slug: "restoring-our-environment",
        title: "Restoring Our Environment",
        description: "Cleaning up Kenya — collecting litter from informal dumpsites, unclogging roadside drainage channels, and revitalising public parks, markets, schools, and community buildings.",
        category: CAMPAIGN_CATEGORIES.COMMUNITY,
        images: [{ storage_url: "/environment-hero.webp", order_index: 0 }],
        current_amount: 0,
        target_amount: 800000,
        is_urgent: false,
        view_count: 0
    },
];
