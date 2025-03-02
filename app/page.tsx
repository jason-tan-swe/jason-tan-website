"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Loading from './loading';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingActionButton from '@/components/FloatingActionButton';
import ProfileDrawer from '@/components/ProfileDrawer';
import { useIsMobile } from '@/hooks/useBreakpoint';
import Link from 'next/link';
import { File } from 'lucide-react';
import HeroPortrait from '@/components/HeroPortrait';
import Button from '@/components/ui/Button';

const Visualization = dynamic(() => import('@/components/Visualization'), { 
  ssr: false,
  loading: () => <Loading className="h-[calc(100vh-4rem)]" />
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (
    <>
      <div className={`${isMobile ? 'h-[calc(100svh-4rem)]' : 'h-full'} w-full relative`}>
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loading className="h-full" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Visualization onLoad={() => setIsLoading(false)} />
      </div>

      {/* Desktop Profile Section */}
      {!isMobile && (
        <section
          aria-label="Jason Tan social links and resume"
          className="md:mt-4 flex flex-col items-center text-center py-4"
        >  
          <div className="flex flex-col md:flex-row mt-4 justify-evenly items-center md:items-start w-full px-8">
            <div className="self-start text-start flex flex-col gap-0 sm:gap-2">
              <h1 className="self-start text-3xl text-emerald-400 sm:text-5xl font-bold">jason tan</h1>
              <p className="self-start text-neutral-400">{`digital wayfarer ( builder ~ nomad ~ artist )`}</p>
            </div>
            <div className="self-center flex items-center justify-center flex-col">
              <HeroPortrait className="w-24 h-24 sm:w-32 sm:h-32 mt-4" />
              <span className="flex flex-col md:items-start mt-2">
                <Link target="_blank" href="/JasonTan-Resume.pdf">
                  <Button
                    className={`flex items-center self-center mt-2`}
                  >
                    <File /> Resume
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <FloatingActionButton 
            isProfileView={isProfileOpen} 
            onClick={() => setIsProfileOpen(!isProfileOpen)} 
          />
          <ProfileDrawer 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
          />
        </>
      )}
    </>
  );
}