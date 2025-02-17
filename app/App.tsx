"use client"

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Analytics } from "@vercel/analytics/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient();

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main className={`max-w-7xl mx-auto`}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </QueryClientProvider>
    </>
  )
}

export default App;