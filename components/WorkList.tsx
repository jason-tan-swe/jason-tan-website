"use client";

import { Work } from "@/lib/works";
import WorkCard from "./WorkCard";
import { Fade } from "react-awesome-reveal";
import { Zoom } from "react-awesome-reveal";
export default function WorkList({ works }: { works: Work[] }) {
    return (
        <div className="overflow-hidden p-4 flex flex-col h-full w-full">
            <Fade direction="up" fraction={0}>
                <h1 className="text-2xl font-bold">Experience</h1>
                <p className="font-thin">Professional Software Engineering</p>
            </Fade>
            <div className="h-full overflow-hidden flex sm:items-start items-center flex-col sm:flex-row gap-4 sm:flex-wrap">
                <Zoom cascade damping={0.1}>
                    {works.map((work) => (
                        <WorkCard key={work.id} work={work} />
                    ))}
                </Zoom>
            </div>
        </div>
    );
}
