"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import LoadingAnimation from "@/public/loadingAnimation.json";

export default function Loading({ className }: { className?: string }) {
  return (
    <AnimatePresence>
      <motion.div 
        className={`${className} flex flex-col items-center justify-center bg-neutral-900 rounded-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <Lottie 
            height={350} 
            animationData={LoadingAnimation} 
            loop={true}
            autoplay={true}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice',
              progressiveLoad: true,
              hideOnTransparent: true
            }}
            style={{
              filter: 'drop-shadow(0 0 12px rgba(52, 211, 153, 0.2))',
              willChange: 'transform'
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}