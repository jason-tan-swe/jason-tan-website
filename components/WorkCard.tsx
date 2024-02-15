import { Work } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({ work }: { work: Work }) {
    return (
        <Link
            href={`/experience/${work.link}`}
            className="hover:opacity-60 min-h-[220px] pt-4 border-t-2 min-w-[300px] flex items-center gap-4 flex-col text-xl font-bold rounded-xl bg-neutral-50 drop-shadow-lg"
        >
            <div>
                <p className="text-center">{work.title}</p>
                <p className="text-thin font-light">{work.role.name}</p>
            </div>
            <div className="border-b-2 w-full"></div>
            <Image width={256} height={256} src={work.image} alt={work.title} />
        </Link>
    );
}
