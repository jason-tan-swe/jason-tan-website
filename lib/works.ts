import path from "path";
import fs from "fs";
const worksDirectory = path.join(process.cwd(), "works");
const projectsDirectory = path.join(process.cwd(), "projects");

export type Work = {
  title: string;
  description: string;
  id: number;
  image: string;
  link: string;
  role: {
    name: string;
    type: string;
    length: string;
    jobType: string;
  };
  stack: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
};

export function getAllProjects(): Project[] {
  const projects = fs.readdirSync(projectsDirectory);
  return projects.map((project) => {
    const fullPath = path.join(projectsDirectory, project);
    const parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    return parsed;
  });
}

export function getAllWorkData(): Work[] {
  const works = fs.readdirSync(worksDirectory);
  return works.map((work) => {
    const fullPath = path.join(worksDirectory, work);
    const parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    return parsed;
  });
}

export function getWorkData(id: string) {
  const fullPath = path.join(worksDirectory, `${id}.json`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const work: Work = JSON.parse(fileContents);
    // Combine the data with the id
    return {
      success: true,
      data: {
        id,
        work,
      },
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}
