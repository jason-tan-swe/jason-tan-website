import { getWorkData } from "@/lib/works";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import HeroPortrait from "@/components/HeroPortrait";
import Link from "next/link";
import { buttonStyles } from "@/components/commonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

type Props = {
  params: { workId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.workId;

  // fetch data
  const work = await getWorkData(id);

  return {
    title: `Jason Tan - ${work.success ? work.data?.work.title : "Not Found"}`,
  };
}

export default function Work({ params }: { params: { workId: string } }) {
  const { workId } = params;
  const work = getWorkData(workId);
  if (!work.success) {
    notFound();
  }
  return (
    <main className="overflow-auto max-h-content">
      <div className="bg-white mt-8 mb-8 md:mx-20 mx-8 px-4 py-4 rounded-lg border-2 border-stone-700 flex items-center flex-col md:flex-row gap-6">
        <Link className={`${buttonStyles}  self-start`} href="/experience">
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
        </Link>
        <div className="prose md:mt-2">
          <h1>{work.data!.work.title}</h1>
          <p>{work.data!.work.description}</p>
          <p>{work.data!.work.role.type}</p>
          <p>{work.data!.work.role.name}</p>
          <p>{work.data!.work.role.length}</p>
          <p>{work.data!.work.role.jobType}</p>
          <p>{work.data!.work.stack}</p>
        </div>
      </div>
    </main>
  );
}
