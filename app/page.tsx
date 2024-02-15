"use client";

import Image from "next/image";
import Link from "next/link";

import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import HeroPortrait from "@/components/HeroPortrait";

export default function Home() {
    return (
        <main className="h-content max-h-content p-4 flex flex-col items-center justify-center gap-4">
            <Fade direction="up" cascade damping={0.5}>
                <HeroPortrait className="rounded-full border-2 border-emerald-200 shadow-neon" />
                <div className="flex flex-col items-center">
                    <Fade cascade direction="up">
                        <h2 className="text-2xl font-bold">Hey, my name is</h2>
                        <h1 className="text-6xl font-extrabold text-emerald-500 opacity-90">
                            Jason Tan
                        </h1>
                        <p className="font-thin">
                            Builder, Creative Thinker, Software Engineer
                        </p>
                    </Fade>
                </div>
                <Link
                    href="/experience"
                    className="select-none hover:opacity-60 shadow-neon flex items-center gap-2 rounded-full px-8 py-4 text-xl font-bold bg-emerald-500 text-white border-emerald-200"
                >
                    My Portfolio <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </Fade>
        </main>
    );
}
