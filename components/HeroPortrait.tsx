"use client";

import Image from "next/image";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "usehooks-ts";

const neonPortraitStyles =
    "rounded-full border-2 border-emerald-200 shadow-neon";

export default function HeroPortrait({ className }: { className?: string }) {
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.screens.sm})`);
    return (
        <Image
            className={`${className} ${neonPortraitStyles}`}
            width={isSmallScreen ? 224 : 256}
            height={isSmallScreen ? 224 : 256}
            src={"/self-portrait.jpg"}
            alt="Image of Jason Tan"
        />
    );
}
