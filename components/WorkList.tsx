"use client";

import { Work } from "@/lib/works";
import WorkCard from "./WorkCard";
import { Zoom } from "react-awesome-reveal";
import Section from "./Section";

export default function WorkList({ works }: { works: Work[] }) {
  if (!works || works.length === 0) {
    return null;
  }

  return (
    <Section type="grow" className="overflow-hidden w-full flex flex-col">
      <Zoom
        triggerOnce
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
        cascade
        damping={0.1}
      >
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </Zoom>
    </Section>
  );
}
