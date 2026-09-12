import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import { LayoutShell } from "@/components/layout-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
      className={`${inter.variable} ${poppins.variable} h-full light`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>
            <LayoutShell>{children}</LayoutShell>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
