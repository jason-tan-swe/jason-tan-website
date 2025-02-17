import type { Metadata } from "next";
import { quicksand } from "./fonts";
import "./globals.css";
import ClientLayout from "./App";

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
        className={`font-quicksand h-dvh w-dvw bg-base text-neutral-100`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
