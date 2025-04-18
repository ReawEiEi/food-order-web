import type { Metadata } from "next";
import { Geist, Geist_Mono, Itim } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layouts/Navbar";
import PageContainer from "@/components/layouts/PageContainer";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layouts/Footer";

const itim = Itim({
  variable: "--font-itim",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Order",
  description: "Wep App for Food Order",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${itim.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <main>
          <Toaster position="top-right" />
          <Navbar />
          <PageContainer children={children} />
          <Footer />
        </main>
      </body>
    </html>
  );
}
