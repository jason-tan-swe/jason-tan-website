"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroPortrait from "@/components/HeroPortrait";
import { buttonStyles } from "@/components/commonStyles";
import { File } from "lucide-react";
import GitHub from "@/components/socials/GitHub";
import Mail from "@/components/socials/Mail";
import LinkedIn from "@/components/socials/LinkedIn";
import Twitter from "@/components/socials/Twitter";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Experience, type Hackathon, type Project } from "@/sanity/sanity.types";
import BlogCard from "@/components/BlogCard";

type FeedItem = Hackathon | Project | Experience

export default function Home() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const [experienceRes, projectsRes, hackathonRes] = await Promise.all([
          fetch("/api/experience"),
          fetch("/api/project"),
          fetch("/api/hackathon"),
        ]);

        const experienceData = await experienceRes.json();
        const projectsData = await projectsRes.json();
        const hackathonData = await hackathonRes.json();

        // Combine and sort by date
        const combined = [
          ...(experienceData?.data || []),
          ...(projectsData?.data || []),
          ...(hackathonData?.data || []),
          // @ts-ignore: Subtracting dates
        ].sort((a: FeedItem, b: FeedItem) => new Date(b._createdAt) - new Date(a._createdAt));

        console.log(combined)
        setFeedItems(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false)
      }
    };

    getFeed();
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Hero Section */}
      <section
        aria-label="Jason Tan social links and resume"
        className="h-full flex flex-col items-center text-center gap-4"
      >  
        <div className="flex flex-col mt-4 justify-evenly items-center md:items-start w-full px-8">
          <HeroPortrait className="w-48 h-48 mb-4" />
          <span className="flex flex-col md:items-start mt-4">
            <h1 className="text-5xl font-bold mb-2">Jason Tan</h1>
            <p className="text-neutral-400">Software Engineer</p>
            <Link target="_blank" href="/JasonTan-Resume.pdf">
              <RainbowButton
                className={`${buttonStyles} flex items-center self-center px-4 py-2 mt-2 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors`}
                >
                  <File /> Resume
              </RainbowButton>
            </Link>
            </span>
        </div>
        <div className="bottom-8 flex space-x-6">
          <GitHub />
          <LinkedIn />
          <Twitter />
          <Mail />
        </div>
      </section>

      <section
        aria-label="Jason Tan experience and blog posts feed"
        className="w-full flex flex-row flex-wrap items-center"
      >
        <div className="items-center flex flex-row flex-wrap gap-4 w-full px-8">
          {isLoading && <>
            <div className="animate-pulse bg-neutral-800 w-full h-20 rounded-lg" />
          </>}
          {!isLoading && (
            feedItems.map((item) => (
              <></>
              // <BlogCard 
              //   key={item._id}
              //   title={item.title!}
              //   date={item.date}
              //   readingTime={item.readingTime}
              //   excerpt={item.excerpt}
              //   slug={item.slug}
              // />
            ))
          )}
          {/* TODO: Add Blogs */}
          
        </div>
      </section>
    </div>
  );
}
