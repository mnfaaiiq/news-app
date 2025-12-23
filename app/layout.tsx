import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PulseNews | Modern News Aggregator",
  description: "Get the latest updates from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-sm text-muted-foreground">
                &copy; 2025 PulseNews. All rights reserved.
              </p>
              <nav className="flex items-center gap-4 text-sm font-medium">
                <Link href="/about" className="hover:underline underline-offset-4 font-normal">About</Link>
                <Link href="/privacy" className="hover:underline underline-offset-4 font-normal">Privacy</Link>
                <Link href="/terms" className="hover:underline underline-offset-4 font-normal">Terms</Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
