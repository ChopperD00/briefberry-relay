import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";

const satoshi = localFont({
    src: [
        {
            path: "../public/fonts/Satoshi-Light.woff2",
            weight: "300",
        },
        {
            path: "../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
        },
        {
            path: "../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
        },
        {
            path: "../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-satoshi",
});

export const metadata: Metadata = {
    title: "Briefberry",
    description: "AI Brief Generator Tailwind Kit",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Description no longer than 155 characters */}
                <meta
                    name="description"
                    content="Briefberry: AI Brief Generator Tailwind Kit"
                />
                {/* Product Name */}
                <meta
                    name="product-name"
                    content="AI Brief Generator Tailwind Kit"
                />
                {/* Twitter Card data */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@ui8" />
                <meta
                    name="twitter:title"
                    content="AI Brief Generator Tailwind Kit"
                />
                <meta
                    name="twitter:description"
                    content="Build AI powered brief generation tools with ready to use Tailwind code"
                />
                <meta name="twitter:creator" content="@ui8" />
                {/* Twitter Summary card images must be at least 120x120px */}
                <meta
                    name="twitter:image"
                    content="https://briefberry-cyan.vercel.app/twitter-card.png"
                />
                {/* Open Graph data for Facebook */}
                <meta
                    property="og:title"
                    content="AI Brief Generator Tailwind Kit"
                />
                <meta property="og:type" content="Article" />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/briefberry-ai-powered-brief-generation-ui-kit-coded"
                />
                <meta
                    property="og:image"
                    content="https://briefberry-cyan.vercel.app/fb-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Build AI powered brief generation tools with ready to use Tailwind code"
                />
                <meta
                    property="og:site_name"
                    content="AI Brief Generator Tailwind Kit"
                />
                <meta property="fb:admins" content="132951670226590" />
                {/* Open Graph data for LinkedIn */}
                <meta
                    property="og:title"
                    content="AI Brief Generator Tailwind Kit"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/briefberry-ai-powered-brief-generation-ui-kit-coded"
                />
                <meta
                    property="og:image"
                    content="https://briefberry-cyan.vercel.app/linkedin-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Build AI powered brief generation tools with ready to use Tailwind code"
                />
                {/* Open Graph data for Pinterest */}
                <meta
                    property="og:title"
                    content="AI Brief Generator Tailwind Kit"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/briefberry-ai-powered-brief-generation-ui-kit-coded"
                />
                <meta
                    property="og:image"
                    content="https://briefberry-cyan.vercel.app/pinterest-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Build AI powered brief generation tools with ready to use Tailwind code"
                />
            </head>
            <body
                className={`${satoshi.variable} bg-b-surface1 font-satoshi text-[1rem] text-t-primary antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
