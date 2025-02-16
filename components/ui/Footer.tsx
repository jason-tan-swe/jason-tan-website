'use client'

import { usePathname } from "next/navigation"
import GitHub from "../socials/GitHub"
import LinkedIn from "../socials/LinkedIn"
import Twitter from "../socials/Twitter"
import Mail from "../socials/Mail"

export default function Footer(){ 
  const pathname = usePathname();
  
  if (pathname?.includes("/studio")) {
    return null;
  }

    return (
        <footer className="py-8 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <p className="text-neutral-400">© 2024 Jason Tan</p>
            <div className="flex space-x-4">
                <GitHub />
                <LinkedIn />
                <Twitter />
                <Mail />
            </div>
            </div>
        </footer>
    )
}