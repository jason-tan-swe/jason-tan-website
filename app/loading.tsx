"use client";

import Lottie from "lottie-react";
import LoadingAnimation from "@/public/loadingAnimation.json";

export default function Loading({ className = "" }: { className: string }) {
  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <Lottie height={350} animationData={LoadingAnimation} loop autoplay />
    </div>
  );
}
