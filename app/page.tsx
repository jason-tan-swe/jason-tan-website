"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroPortrait from "@/components/HeroPortrait";
import { buttonStyles } from "@/components/commonStyles";
import { File } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Experience, type Hackathon, type Project } from "@/sanity/sanity.types";
import Visualization from "@/components/Visualization";

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
    <div className="h-full flex flex-col md:gap-4">
      <Visualization />
      {/* Hero Section */}
      <section
        aria-label="Jason Tan social links and resume"
        className="md:mt-2 h-full flex flex-col items-center text-center"
      >  
        <div className="flex flex-col md:flex-row mt-4 justify-evenly items-center md:items-start w-full px-8">
          <div className="self-start text-start flex flex-col gap-0 sm:gap-2">
            <h1 className="self-start text-2xl sm:text-5xl font-bold">jason tan</h1>
            <p className="self-start text-neutral-400">digital wayfarer (builder, nomad, designer) </p>
          </div>
          <div className="self-center flex items-center justify-center flex-col">
            <HeroPortrait className="w-24 h-24 sm:w-32 sm:h-32 mt-4" />
            <span className="flex flex-col md:items-start mt-2">
              <Link target="_blank" href="/JasonTan-Resume.pdf">
                <RainbowButton
                  className={`${buttonStyles} flex items-center self-center px-4 py-2 mt-2 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors`}
                  >
                    <File /> Resume
                </RainbowButton>
              </Link>
            </span>
          </div>
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
            feedItems.map((item, index) => (
              <div key={index}></div>
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
