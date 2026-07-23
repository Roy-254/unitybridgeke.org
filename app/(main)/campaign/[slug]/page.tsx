// Server Component — fetches real campaign by slug, returns 404 if not found
import { notFound } from "next/navigation";
import { getCampaignBySlug } from "@/lib/supabase/queries";
import { CampaignDetailClient } from "@/components/campaign/campaign-detail-client";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const campaign = await getCampaignBySlug(slug);
        if (!campaign) return { title: "Campaign Not Found — Unity Bridge Kenya" };
        return {
            title: `${campaign.title} — Unity Bridge Kenya`,
            description: campaign.story?.slice(0, 160),
            openGraph: {
                title: campaign.title,
                description: campaign.story?.slice(0, 160),
                images: campaign.images?.[0]?.storage_url ? [campaign.images[0].storage_url] : [],
            },
        };
    } catch {
        return { title: "Unity Bridge Kenya" };
    }
}

export default async function CampaignDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // Try live Supabase data; fall back to a demo campaign for development
    let campaign: any = null;

    try {
        campaign = await getCampaignBySlug(slug);
    } catch {
        // Supabase not configured
    }

    // Demo fallback so you can see the UI without Supabase configured
    if (!campaign) {
        if (slug === "every-kid-studies" || slug === "clearing-hospital-bills" || slug === "impacting-lives" || slug === "sisters-shield" || slug === "restoring-our-environment" || slug === "mens-mental-health") {
            campaign = DEMO_CAMPAIGNS[slug] ?? DEMO_CAMPAIGNS["every-kid-studies"];
        } else {
            notFound();
        }
    }

    return <CampaignDetailClient campaign={campaign} />;
}

// ─── Demo campaigns for development (no Supabase required) ───
const DEMO_CAMPAIGNS: Record<string, any> = {
    "restoring-our-environment": {
        id: "demo-5",
        title: "Restoring Our Environment",
        slug: "restoring-our-environment",
        category: "community",
        county: "Kenya",
        story: `Across Kenya, informal dumpsites have taken hold in open fields and neglected areas. Roadside drainage channels are often choked with rubbish, becoming flood hazards during the rainy season. Meanwhile, many public parks, markets, and schools go without the basic upkeep they deserve.

Through our Restoring Our Environment initiative, we organise coordinated, volunteer-led clean-up drives that tackle these challenges. Every shilling raised funds equipment, protective gear, transport, and materials for our teams on the ground.

We focus on three areas of action:
1. Open-Area Litter Collection: Removing solid waste from open fields and informal dumpsites, rescuing shared spaces for the community.
2. Drainage Channel Restoration: Clearing roadside drains of debris and rubbish to ensure water flows freely, preventing flooding and water damage.
3. Public Space Revitalisation: Deep-cleaning and repairing schools, markets, and parks to restore dignity to public facilities.

Litter and blocked drains are not just eyesores — they are public health hazards. Stagnant water breeds mosquitoes. Overflowing waste contaminates water sources. Neglected public spaces breed insecurity. Our clean-up drives create immediate, visible impact that communities can see and feel, building a culture of environmental stewardship.`,
        current_amount: 0,
        target_amount: 800000,
        deadline: null,
        created_at: "2026-02-15T09:00:00Z",
        view_count: 540,
        is_verified: true,
        creator: { id: "u5", full_name: "Unity Bridge Kenya", is_verified: true, county: "Nairobi" },
        images: [
            { storage_url: "/environment-hero.webp", order_index: 0 },
            { storage_url: "/volunteers-cleaning.webp", order_index: 1 },
        ],
        documents: [],
        updates: [],
        donations: [],
    },
    "sisters-shield": {
        id: "demo-4",
        title: "The Sisters' Shield Initiative",
        slug: "sisters-shield",
        category: "women_empowerment",
        county: "Kenya",
        story: `Empowerment begins with safety and opportunity. For many women in Kenya, the path to independence is blocked by systemic barriers, harmful cultural practices, and economic dependency. The Sisters' Shield Initiative at Unity Bridge Kenya is more than just a fund — it is a lifeline.

Many women face challenges that limit their ability to live freely and build independent futures—ranging from restrictive environments and lack of access to education, to financial barriers that make it difficult to take the first step forward. At Unity Bridge Kenya, we respond by providing targeted financial support where it matters most—whether that means helping someone transition into a safer environment, funding access to education or skills training, or offering capital to start small income-generating initiatives.

While our role is primarily financial, we recognize that some situations require deeper, specialized support. In such cases, we work alongside trusted partner organizations to ensure that every woman we assist has access to the broader care and protection she may need, creating a more complete and sustainable path toward independence.

Together, we are not just rebuilding lives; we are shielding the futures of Kenya's women.`,
        current_amount: 50000,
        target_amount: 1000000,
        deadline: null,
        created_at: "2026-03-01T12:00:00Z",
        view_count: 850,
        is_verified: true,
        creator: { id: "u4", full_name: "Unity Bridge Kenya", is_verified: true, county: "Nairobi" },
        images: [
            { storage_url: "/sisters-shield.webp", order_index: 0 },
        ],
        documents: [],
        updates: [],
        donations: [],
    },
    "every-kid-studies": {
        id: "demo-1",
        title: "Making sure every kid studies",
        slug: "every-kid-studies",
        category: "school_fees",
        county: "Kenya",
        story: `Education is the most powerful tool we can give a child — but for thousands of Kenyan families, the cost of school fees remains an insurmountable barrier.

At Unity Bridge Kenya, our Education Initiative works to ensure that no child is forced out of the classroom due to financial hardship. We partner with schools, community leaders, and educators across all regions of Kenya to identify students at risk of dropping out, verify their circumstances, and pay their school fees directly to the institution.

From primary school tuition in rural Turkana to secondary examination fees in Nairobi's informal settlements, every donation to this initiative guarantees that a child stays enrolled, stays hopeful, and stays on the path toward their future.

We believe that sustained access to education is the single greatest investment in Kenya's next generation. When you support this initiative, you are not just paying a fee — you are keeping a door open for a child who deserves every chance to succeed.`,
        current_amount: 350000,
        target_amount: 500000,
        deadline: null,
        created_at: "2026-01-15T10:00:00Z",
        view_count: 1250,
        is_verified: false,
        creator: { id: "u1", full_name: "Unity Bridge Kenya", is_verified: false, county: "Nairobi" },
        images: [
            { storage_url: "/school-fees-project.webp", order_index: 0 },
        ],
        documents: [],
        updates: [],
        donations: [],
    },
    "clearing-hospital-bills": {
        id: "demo-2",
        title: "Clearing hospital bills",
        slug: "clearing-hospital-bills",
        category: "medical",
        county: "Kenya",
        story: `A medical emergency should not become a financial catastrophe — yet for millions of Kenyans, that is exactly what happens.

Our Medical Relief Initiative at Unity Bridge Kenya focuses on one of the most urgent and often invisible crises in Kenya's healthcare system: patients and families trapped by unpaid hospital bills, unable to be discharged, and facing deteriorating health with no means to cover the cost of their care.

We work directly with hospitals and healthcare facilities across the country to identify those most in need, verify their circumstances, and clear their outstanding bills. From maternity fees for young mothers to surgical costs for accident victims, our support goes straight to the medical institution — transparent, direct, and fully accountable.

Your contribution helps free patients from hospital debt and restores dignity to families at some of the most vulnerable moments of their lives. No one should have to stay sick because they cannot afford to get well.`,
        current_amount: 180000,
        target_amount: 500000,
        deadline: null,
        created_at: "2026-01-20T08:00:00Z",
        view_count: 3200,
        is_verified: false,
        creator: { id: "u2", full_name: "Unity Bridge Kenya", is_verified: false, county: "Nairobi" },
        images: [
            { storage_url: "/medical-relief-project.webp", order_index: 0 },
        ],
        documents: [],
        updates: [],
        donations: [],
    },
    "impacting-lives": {
        id: "demo-3",
        title: "Impacting lives of the less privileged",
        slug: "impacting-lives",
        category: "community",
        county: "Kenya",
        story: `Access to clean water, sanitation, and basic community infrastructure remains one of the most pressing challenges facing rural and peri-urban communities across Kenya. Entire households — predominantly women and children — spend hours each day travelling long distances to reach unsafe water sources, sacrificing time, health, and economic opportunity in the process.

Unity Bridge Kenya's Community Development Initiative partners with local leaders, certified engineers, and community committees to fund and install sustainable infrastructure in the areas that need it most. Our approach is community-led: we identify the need, conduct feasibility studies, fund the solution, and establish local management structures to ensure long-term sustainability.

From borehole drilling and pump installation to sanitation upgrades and community resource centres, every project we fund serves hundreds of households and is designed to last for generations. The communities we work with contribute land, local knowledge, and volunteer labour — we contribute the funding that makes it all possible.

Your donation transforms the daily reality of entire villages — giving back time, restoring health, and unlocking opportunity for Kenya's most underserved communities.`,
        current_amount: 420000,
        target_amount: 600000,
        deadline: null,
        created_at: "2026-01-10T07:00:00Z",
        view_count: 5400,
        is_verified: false,
        creator: { id: "u3", full_name: "Unity Bridge Kenya", is_verified: false, county: "Nairobi" },
        images: [
            { storage_url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200", order_index: 0 },
        ],
        documents: [],
        updates: [],
        donations: [],
    },
    "mens-mental-health": {
        id: "demo-6",
        title: "Breaking the Silence: Men's Mental Health",
        slug: "mens-mental-health",
        category: "community",
        county: "Kenya",
        story: `In Kenya, societal expectations often demand that men remain stoic and strong, leaving little room for vulnerability. This silent crisis has led to rising rates of depression, anxiety, and tragically, suicide among men who feel they have nowhere to turn.

Our Men's Mental Health initiative is breaking this silence. We are funding community-based support groups, providing access to professional counselors, and creating safe spaces where men can speak openly without judgment.

Your support helps subsidize therapy sessions, train peer-support leaders, and run awareness campaigns that dismantle the stigma surrounding men's mental health. Together, we can ensure that no man has to fight his battles alone.`,
        current_amount: 0,
        target_amount: 450000,
        deadline: null,
        created_at: "2026-03-10T09:00:00Z",
        view_count: 310,
        is_verified: true,
        creator: { id: "u6", full_name: "Unity Bridge Kenya", is_verified: true, county: "Nairobi" },
        images: [
            { storage_url: "/mens-mental-health-project.png", order_index: 0 },
        ],
        documents: [],
        updates: [],
        donations: [],
    },
};

