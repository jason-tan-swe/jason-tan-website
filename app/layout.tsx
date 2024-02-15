import type { Metadata } from "next";
import { robotoMono, sourceCodePro } from "./fonts";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Jason Tan - Homepage",
    description: "Jason Tan Homepage Portfolio",
    authors: [{ name: "Jason Tan" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${robotoMono.variable} bg-neutral-50 text-neutral-700 w-svh h-svh`}
            >
                <Navbar />
                {/* <div className="max-h-content overflow-auto items-center flex justify-center p-4"> */}
                {children}
                {/* </div> */}
            </body>
        </html>
    );
}
