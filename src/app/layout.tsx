import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Petit_Formal_Script,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import { LayoutShell } from "@/components/layout-shell";
import FloatingContact from "@/components/home/floating-contact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const petitFormalScript = Petit_Formal_Script({
  variable: "--font-petit-formal-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RealBiz Pro",
  description: "RealBiz Pro Enterprise Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${petitFormalScript.variable} h-full light`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>
            <LayoutShell>
              {children}
              <FloatingContact />
            </LayoutShell>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
