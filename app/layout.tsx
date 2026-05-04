import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
    title: "Unity Bridge Kenya - Building Bridges of Hope",
    description: "Lifting burdens, building futures. Raise funds for school fees, medical bills, and urgent needs through transparent crowdfunding.",
    keywords: ["crowdfunding", "Kenya", "fundraising", "medical bills", "school fees", "M-Pesa", "donations"],
    authors: [{ name: "Unity Bridge Kenya" }],
    openGraph: {
        title: "Unity Bridge Kenya - Building Bridges of Hope",
        description: "Lifting burdens, building futures",
        type: "website",
        locale: "en_KE",
    },
};

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${robotoMono.variable}`}>
            <body className="antialiased">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--primary-green)] focus:text-white focus:rounded-lg">
                    Skip to main content
                </a>
                <ThemeProvider>
                    <AuthProvider>
                        <main id="main-content">
                            {children}
                        </main>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
