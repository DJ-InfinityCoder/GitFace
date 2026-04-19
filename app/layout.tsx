import type { Metadata } from "next";
import { DM_Sans, Fira_Code } from "next/font/google";
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
  title: "GitFace — GitHub Profile README Generator",
  description:
    "Build a stunning GitHub profile README in 60 seconds. Drag-and-drop sections, live preview, and one-click copy.",
  keywords: [
    "GitHub",
    "README",
    "profile",
    "generator",
    "markdown",
    "developer tools",
  ],
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
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-gh-bg transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
