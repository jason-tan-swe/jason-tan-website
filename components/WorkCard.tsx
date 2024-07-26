import { Work } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/experience/${work.link}`}
      className="hover:opacity-60 min-h-[250px] pt-4 border-t-2 w-full max-w-[750px] flex grow items-center flex-col text-xl font-bold rounded-xl bg-neutral-50 dark:bg-zinc-700 drop-shadow-lg"
    >
      <div>
        <p className="text-center">{work.title}</p>
        <p className="text-thin font-light">{work.role.name}</p>
      </div>
      <div className="border-b-2 w-full"></div>
      <div className="z-10 self-center w-full h-[200px] sm:h-[300px] relative">
        <Image fill src={work.image} alt={work.title} />
      </div>
    </Link>
  );
}
