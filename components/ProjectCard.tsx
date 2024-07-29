import { Project } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      target="_blank"
      className={`z-20 hover:opacity-60 transition-all flex bg-emerald-500 grow-[2] gap-6 flex-col px-4 pb-2 rounded-xl border-2 border-emerald-200 shadow-neon max-w-[250px] sm:max-w-[350px] sm:max-h-[400px]`}
    >
      <div className="z-10 rounded-xl border self-center w-[250px] h-[200px] sm:w-[350px] sm:h-[300px] relative">
        <Image
          className="rounded-xl border h-auto w-full"
          // width={200}
          // height={ 200}
          fill
          // objectFit="contain"
          src={project.image}
          alt={project.alt}
        />
      </div>
      <div className="text-white flex gap-0.5 flex-col mb-4">
        <h2 className="font-bold text-3xl">{project.title}</h2>
        <p className="text-sm">{project.description}</p>
      </div>
    </Link>
  );
}
