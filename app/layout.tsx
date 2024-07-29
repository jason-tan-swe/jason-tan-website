import type { Metadata } from "next";
import { robotoMono, sourceCodePro } from "./fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Jason Tan - Homepage",
  description:
    "Jason Tan Software Engineer Homepage Portfolio based in Toronto, Ontario from the University of Guelph",
  authors: [{ name: "Jason Tan" }],
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
    <html lang="en">
      <body
        className={`${robotoMono.variable} dark:bg-zinc-800 bg-neutral-100 text-neutral-700 dark:text-neutral-100 overflow-hidden max-h-screen h-screen`}
      >
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <Navbar />
        {/* <div className="max-h-content overflow-auto items-center flex justify-center p-4"> */}
        {children}
        {/* </div> */}
      </body>
    </html>
  );
}
