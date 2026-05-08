import { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
    const appUrl = env.NEXT_PUBLIC_APP_URL;

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/explore", "/campaign/"],
                disallow: ["/admin", "/dashboard", "/api/", "/auth/"],
            },
        ],
        sitemap: `${appUrl}/sitemap.xml`,
    };
}
