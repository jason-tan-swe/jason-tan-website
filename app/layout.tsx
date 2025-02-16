import type { Metadata } from "next";
import { robotoMono, sourceCodePro, quicksand } from "./fonts";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://jasontan.co"),
  title: "Jason Tan - Homepage",
  description:
    "Jason Tan Software Engineer Portfolio based in Toronto, Ontario from the University of Guelph",
  authors: [{ name: "Jason Tan" }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Node.js",
    "Software Engineer",
    "Software Engineering",
    "University of Guelph",
    "Guelph",
    "Student",
    "Jason Tan",
  ],
  openGraph: {
    title: "Jason Tan - Homepage",
    description:
      "Jason Tan Software Engineer Homepage Portfolio based in Toronto, Ontario from the University of Guelph",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body
        className={`font-quicksand h-screen w-screen bg-base text-neutral-100 overflow-y-auto`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
