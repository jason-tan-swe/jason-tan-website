"use client";

import Link from "next/link";
import { sourceCodePro } from "@/app/fonts";
import GitHub from "../socials/GitHub";
import LinkedIn from "../socials/LinkedIn";
import Twitter from "../socials/Twitter";
import Mail from "../socials/Mail";

export default function Navbar() {
  if (typeof window === 'undefined' || window.location.pathname.includes("/studio")) {
    return null
  }

  return (
    <nav className="sticky top-0 z-10 bg-neutral-950/50 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className={`${sourceCodePro.className} text-xl font-bold hover:text-green-500 transition-colors`}>
          jason.tan
        </Link>

        <div className="flex space-x-4">
          <GitHub />
          <LinkedIn />
          <Twitter />
          <Mail />
        </div>
      </div>
    </nav>
  );
}
