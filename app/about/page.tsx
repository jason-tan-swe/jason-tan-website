"use client";

import HeroPortrait from "@/components/HeroPortrait";
import Section from "@/components/Section";
import Lottie from "lottie-react";
import CodingAnimation from "@/public/code-lottie.json";
import { Fade } from "react-awesome-reveal";

export default function About() {
  const about =
    "As an emerging software engineer, Jason has always had a love for building digital services and solutions to problems that provide impact in the world. He has many experiences cultivating his craft by building applications and designing beautiful produts. ";

  const aboutMore =
    "When not occupied with coding, he loves to reach out to other people to chat with about their life stories and get active with his body. He is currently a student from the University of Guelph and authors beautiful applications designed for world-wide solutions.";

  const sectionStyles = "flex flex-col gap-4";
  return (
    <main className="overflow-auto max-h-content snap-mandatory snap-y p-4">
      <Section
        type="fullscreen"
        className={`snap-normal snap-start ${sectionStyles} justify-center items-center`}
        aria-label="Hero Information"
      >
        <HeroPortrait />
        <h1 className="text-2xl font-bold">I&apos;m Jason!</h1>
        <p className="text-center font-thin px-2">
          Jason is a software engineer located in Toronto, Ontario.
        </p>
        <p className="text-center font-thin px-2">
          Born and raised in Toronto, he loves exploring new ideas and meeting
          people from all walks of life.
        </p>
      </Section>
      <Section
        type="fullscreen"
        className={`snap-normal snap-start font-thin ${sectionStyles}`}
        aria-label="His Passion"
      >
        <h1 className="self-start font-bold text-6xl">His Passion</h1>
        <p className="md:pr-12">{about}</p>
        <p className="md:pr-12">{aboutMore}</p>
        <Lottie
          style={{ height: "350px" }}
          animationData={CodingAnimation}
          loop
          autoplay
        />
      </Section>
      {/* <Section
        type="fullscreen"
        className={`snap-normal snap-start ${sectionStyles}`}
        aria-label="His Skills"
      >
        <h1 className="self-start font-bold text-6xl">His Skills</h1>
      </Section> */}
    </main>
  );
}
