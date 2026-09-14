import type { Metadata } from "next";
<<<<<<< HEAD
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
=======
import { Inter, Poppins } from "next/font/google";
>>>>>>> niloy
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import { LayoutShell } from "@/components/layout-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

<<<<<<< HEAD
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
=======
const poppins = Poppins({
  variable: "--font-poppins",
>>>>>>> niloy
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

<<<<<<< HEAD
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

=======
>>>>>>> niloy
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
<<<<<<< HEAD
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full light`}
=======
      className={`${inter.variable} ${poppins.variable} h-full light`}
>>>>>>> niloy
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
