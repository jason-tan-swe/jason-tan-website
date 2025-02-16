"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import LoadingAnimation from "@/public/loadingAnimation.json";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <Lottie height={350} animationData={LoadingAnimation} loop autoplay />
    </div>
  );
}
