import { getAllWorkData } from "@/lib/works";
import WorkList from "@/components/WorkList";
import Section from "@/components/Section";

export default function Experience() {
  const works = getAllWorkData();
  return (
    <Section className="overflow-auto max-h-content px-8" type="fullscreen">
      <h1 className="text-2xl font-bold">Experience</h1>
      <h2 className="font-thin mb-2">Professional Software Engineering</h2>
      <WorkList works={works} />
    </Section>
  );
}
