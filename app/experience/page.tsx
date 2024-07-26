import Image from "next/image";
import { getAllWorkData } from "@/lib/works";
import WorkCard from "@/components/WorkCard";
import WorkList from "@/components/WorkList";
import Section from "@/components/Section";
import { Fade } from "react-awesome-reveal";

export default function Experience() {
  const works = getAllWorkData();
  return (
    <Section className="max-h-content overflow-auto p-8" type="fullscreen">
      {/* <Fade direction="up" fraction={0}> */}
      <h1 className="text-2xl font-bold">Experience</h1>
      <h2 className="font-thin mb-2">Professional Software Engineering</h2>
      {/* </Fade> */}
      <WorkList works={works} />
    </Section>
  );
}
