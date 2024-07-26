"use client";

import { Project } from "@/lib/works";
import ProjectCard from "./ProjectCard";
import { Zoom } from "react-awesome-reveal";

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-6 items-center justify-center flex-row flex-wrap">
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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Zoom>
    </div>
  );
}
