"use client"

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Analytics } from "@vercel/analytics/react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={`max-w-7xl mx-auto`}>
        {children}
      </main>
      <Footer />
      <Analytics />
    </>
  )
}

export default ClientLayout;