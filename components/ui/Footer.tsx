'use client'

import { usePathname } from "next/navigation"
import GitHub from "../socials/GitHub"
import LinkedIn from "../socials/LinkedIn"
import Twitter from "../socials/Twitter"
import Mail from "../socials/Mail"
import { useIsMobile } from "@/hooks/useBreakpoint"
import { useState, useEffect } from "react"

export default function Footer(){ 
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return null;

  if (pathname?.includes("/studio") || isMobile) {
    return null;
  }

  return (
      <footer className="py-8 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-neutral-400">{`© ${new Date().getFullYear().toString()} Jason Tan. All rights reserved.`}</p>
          </div>
      </footer>
  )
}