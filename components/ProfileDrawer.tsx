"use client"

import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";
import { File } from "lucide-react";
import { buttonStyles } from "./commonStyles";
import HeroPortrait from "./HeroPortrait";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const handleDragEnd = (event: any, { offset, velocity }: any) => {
    const swipe = Math.abs(velocity.y) > 500;
    const dragged = offset.y > 100;

    if (swipe || dragged) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed inset-x-0 bottom-0 h-[90vh] bg-neutral-900 rounded-t-3xl z-40 flex flex-col"
          >
            {/** Drag Handle */}
            <motion.div
              className="absolute inset-x-0 top-[-1px] h-12 cursor-grab active:cursor-grabbing bg-neutral-900 rounded-t-3xl z-10"
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.4}
              dragSnapToOrigin
              onDragEnd={handleDragEnd}
            >
              <div className="w-12 h-1.5 bg-neutral-700 rounded-full mx-auto mt-4" />
            </motion.div>

            {/* Content */}
            <motion.div 
              className="flex-1 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >              
              <div className="p-6 mt-8 max-w-md mx-auto space-y-8">
                <div className="flex flex-col items-center gap-6">
                  <HeroPortrait />
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-emerald-400">jason tan</h1>
                    <p className="text-neutral-400 mt-2">
                      {`digital wayfarer ( builder ~ nomad ~ artist )`}
                    </p>
                  </div>

                  <Link target="_blank" href="/JasonTan-Resume.pdf">
                    <RainbowButton
                      className={`${buttonStyles} flex items-center self-center px-4 py-2 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors`}
                    >
                      <File /> Resume
                    </RainbowButton>
                </Link>
                </div>

                {/* Mock content to demonstrate scrolling */}
                <div className="space-y-6">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-emerald-400">About Me</h2>
                    <p className="text-neutral-400">
                      Full-stack developer with a passion for building performant web applications.
                      Experienced in React, TypeScript, and Node.js. Currently focused on creating
                      delightful user experiences with modern web technologies.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-emerald-400">Skills</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "React", "TypeScript", "Node.js", "Next.js",
                        "GraphQL", "PostgreSQL", "AWS", "Docker",
                        "Git", "CI/CD", "REST APIs", "Testing"
                      ].map((skill) => (
                        <div key={skill} className="bg-neutral-800 p-3 rounded-lg text-neutral-300">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-emerald-400">Contact</h2>
                    <div className="space-y-2 text-neutral-400">
                      <p>Feel free to reach out for collaborations or just a chat!</p>
                      <p>Based in Toronto, ON</p>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
}