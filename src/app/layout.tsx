import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "SAT OS",
    template: "%s | SAT OS",
  },
  description:
    "A private SAT preparation platform built around pattern recognition, spaced repetition and honest score estimation.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14161f" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Reading the stored theme on the server means the correct palette is in the
  // first paint, with no flash of the wrong theme.
  let theme = "dark";
  try {
    const user = await getCurrentUser();
    if (user) theme = user.settings.theme;
  } catch {
    // Not signed in, or the database is not reachable yet. Dark is the default.
  }

  return (
    <html lang="en-GB" data-theme={theme} suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
