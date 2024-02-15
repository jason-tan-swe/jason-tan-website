import Image from "next/image";
import { getAllWorkData } from "@/lib/works";
import WorkCard from "@/components/WorkCard";
import WorkList from "@/components/WorkList";

export default function Experience() {
    const works = getAllWorkData();
    return <WorkList works={works} />;
}
