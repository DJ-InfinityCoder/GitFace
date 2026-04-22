import type { Metadata, Viewport } from "next";
import { DM_Sans, Fira_Code } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gitface.dilip.live"),
  title: {
    default: "GitFace — GitHub Profile README Generator",
    template: "%s | GitFace",
  },
  description:
    "Transform your GitHub profile into a professional showcase. Build a stunning README in 60 seconds with high-fidelity stats, contribution streaks, and brand-accurate tech badges.",
  keywords: [
    "GitHub Profile README Generator",
    "GitHub Stats SVG",
    "README.md Builder",
    "Developer Portfolio Generator",
    "GitHub Contribution Streaks",
    "GitHub Trophies",
    "Markdown README Templates",
    "Tech Stack Icons",
    "GitHub Activity Heatmap",
    "GitFace",
    "Professional GitHub Profile",
    "Open Source Branding",
    "Developer CV",
  ],
  authors: [{ name: "GitFace Team" }],
  creator: "GitFace",
  publisher: "GitFace",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitface.dilip.live",
    siteName: "GitFace — Professional READMEs",
    title: "GitFace — The Ultimate GitHub Profile README Generator",
    description:
      "Stop settling for a boring GitHub profile. Create a high-fidelity, professional README with dynamic stats, streaks, and custom badges in under a minute.",
    images: [
      {
        url: "/gitface_logo_withname_light_not_scaled.png",
        width: 1200,
        height: 630,
        alt: "GitFace Professional README Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitFace — The Ultimate GitHub Profile README Generator",
    description:
      "Transform your GitHub profile with dynamic stats and high-fidelity tech badges. Build a professional README in seconds.",
    images: ["/gitface_logo_withname_light_not_scaled.png"],
    creator: "@gitface",
  },
  icons: {
    icon: "/gitface_logo_withoutname_light.png",
    shortcut: "/gitface_logo_withoutname_light.png",
    apple: "/gitface_logo_withoutname_light.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Inline script to prevent theme flash on page load
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('gitface-theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${firaCode.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta
          name="google-site-verification"
          content="LUxkWfxLL0S1eRoIX7IcujdeJwHpaytxZN54eA1KhdQ"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-gh-bg transition-colors duration-300"
      >
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XYZ"} />
    </html>
  );
}
