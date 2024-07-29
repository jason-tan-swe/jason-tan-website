"use client";

import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import HeroPortrait from "@/components/HeroPortrait";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { buttonStyles } from "@/components/commonStyles";
import Section from "@/components/Section";
import { useEffect, useState } from "react";
import WorkList from "@/components/WorkList";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ProjectList from "@/components/ProjectList";
import { SocialIcon } from "react-social-icons";

export default function Home() {
  const [works, setWorks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getWork = async () => {
      try {
        const res = await fetch("/api/experience");
        if (res.status !== 200) {
          setWorks([]);
          // todo: setup logger
          return;
        }

        const data = await res.json();
        setWorks(data);
      } catch (err) {
        // todo: setup logger
        console.error(err);
      }
    };
    const getProjects = async () => {
      try {
        const res = await fetch("/api/project");
        if (res.status !== 200) {
          setProjects([]);
          // todo: setup logger
          return;
        }

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        // todo: setup logger
        console.error(err);
      }
    };
    getWork();
    getProjects();
  }, []);

  return (
    <main className="overflow-auto max-h-content pt-4">
      <Section
        className="flex flex-col justify-center items-center gap-4"
        type="fullscreen"
      >
        <Fade triggerOnce cascade direction="up">
          <HeroPortrait />

          <div className="flex flex-col justify-center items-center">
            {/* <Fade cascade direction="up"> */}
            <h2 className="text-2xl font-bold">Hey, my name is</h2>
            <h1 className="text-6xl font-extrabold text-emerald-500 opacity-90">
              Jason Tan
            </h1>
            <p className="font-thin">
              Builder, Creative Thinker, Software Engineer
            </p>
            {/* </Fade> */}
          </div>
          <Link
            href="/experience"
            className={`${buttonStyles} max-w-[350px] self-center shadow-neon bg-emerald-500 text-white border-emerald-200`}
          >
            My Portfolio <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link
            target="_blank"
            href="/JasonTan-Resume.pdf"
            className={`${buttonStyles} max-w-[350px] self-center border-emerald-500 text-emerald-500`}
          >
            Resume <FontAwesomeIcon icon={faDownload} />
          </Link>
        </Fade>
      </Section>
      <Section
        className="overflow-hidden flex flex-col justify-center items-center gap-4 my-12 px-6"
        type="grow"
      >
        <div className="flex items-center flex-col">
          <h2 className="font-bold text-5xl">Experience</h2>
          <p className="font-thin">Professional Software Engineering</p>
        </div>
        <WorkList works={works} />
      </Section>
      <Section
        className="flex flex-col justify-center items-center my-12 gap-12"
        type="grow"
      >
        <div className="flex items-center flex-col">
          <h2 className="font-bold text-5xl">Project Ventures</h2>
          <p className="font-thin">Exploring Tech & Products</p>
        </div>
        <ProjectList projects={projects} />
      </Section>
      <Section
        className="my-24 px-4 flex flex-col justify-center items-center gap-12"
        type="grow"
      >
        <h2 className="font-bold text-5xl text-center">
          Want to work together?
        </h2>
        <Link
          href="mailto: tjasonkyle@gmail.com"
          className={`${buttonStyles} max-w-[350px] self-center shadow-neon bg-emerald-500 text-white border-emerald-200`}
        >
          Send me a message
          <FontAwesomeIcon icon={faPaperPlane} />
        </Link>
      </Section>
      <footer className="px-4 sm:px-24 shadow-inner dark:bg-zinc-800 bg-white flex items-center justify-between py-4">
        <p className="font-bold">Copyright © 2024 Jason Tan</p>
        <ul className="flex gap-x-4 flex-row">
          <li>
            <SocialIcon
              target="_blank"
              className="transition-all hover:opacity-60"
              bgColor={"#10b981"}
              style={{
                borderColor: "#A7F3D0",
                boxShadow:
                  "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #10b981, 0 0 15px #10b981, 0 0 30px #10b981",
                borderRadius: "128px",
              }}
              url={"https://www.linkedin.com/in/jason-tan-software-engineer/"}
            />
          </li>
          <li>
            <SocialIcon
              target="_blank"
              className="transition-all hover:opacity-60"
              bgColor={"#10b981"}
              style={{
                borderColor: "#A7F3D0",
                boxShadow:
                  "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #10b981, 0 0 15px #10b981, 0 0 30px #10b981",
                borderRadius: "128px",
              }}
              url={"https://github.com/jason-tan-swe"}
            />
          </li>
        </ul>
      </footer>
    </main>
  );
}
