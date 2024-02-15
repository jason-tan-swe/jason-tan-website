import { getWorkData } from "@/lib/works";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

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
        title: `Jason Tan - ${
            work.success ? work.data?.work.title : "Not Found"
        }`,
    };
}

export default function Work({ params }: { params: { workId: string } }) {
    const { workId } = params;
    const work = getWorkData(workId);
    if (!work.success) {
        notFound();
    }
    return <p>Post: {workId}</p>;
}
