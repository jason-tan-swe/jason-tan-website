"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useMediaQuery } from "usehooks-ts";
import theme from "tailwindcss/defaultTheme";
import Markdown from "react-markdown"
import './ExpandableBlogCard.css'

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readingTime: string;
  content: string;
}

export function ExpandableBlogCard({
  title,
  excerpt,
  date,
  slug,
  readingTime,
  content
}: BlogCardProps) {
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.screens.lg})`);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
      document.title = title;
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(false));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-end md:place-items-center z-[100]">
            {isSmallScreen &&
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => {
                  setActive(false)
                  setExpanded(false)
                }}
              >
                <CloseIcon />
              </motion.button>
            }
            
            <motion.div
              layoutId={`card-${id}`}
              ref={ref}
              className={`w-full max-w-[800px] flex flex-col bg-gradient-to-br from-neutral-900 to-neutral-800 sm:rounded-3xl overflow-auto`}
              initial={{ height: isSmallScreen ? '60vh' : '100%' }}
              animate={{ height: isSmallScreen ? (expanded ? '100vh' : '60vh') : '100%' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              onScroll={(e) => {
                const target = e.currentTarget;
                const scrollTop = target.scrollTop;
                const scrollHeight = target.scrollHeight;
                const clientHeight = target.clientHeight;
                const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
                
                if (scrollPercentage > 0.1 && !expanded) {
                  setExpanded(true);
                }
              }}
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h1
                      layoutId={`title-${id}`}
                      className="font-bold text-green-400"
                    >
                      {title}
                    </motion.h1>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mt-2">
                      <span>{date}</span>
                      <span>•</span>
                      <span>{readingTime}</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  layout
                  initial={{ height: isSmallScreen ? '60vh' : '100%' }}
                  animate={{ height: isSmallScreen ? (expanded ? '100%' : '60vh') : '100%' }}
                  exit={{ opacity: 0 }}
                  className={`text-neutral-400 text-sm md:text-base md:h-fit flex flex-col gap-3 overflow-hidden ${!expanded && '[mask:linear-gradient(to_bottom,white,white,transparent)]'}`}
                  onScroll={(e) => {
                    // HANDLES SMALL SCREEN SCROLLING
                    if (isSmallScreen) {
                      const target = e.currentTarget;
                      const scrollTop = target.scrollTop;
                      const scrollHeight = target.scrollHeight;
                      const clientHeight = target.clientHeight;
                      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
                      
                      if (scrollPercentage > 0.1 && !expanded) {
                        setExpanded(true);
                      }
                    }
                  }}
                >
                  <Markdown

                  >
                    {content}
                  </Markdown>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${id}`}
        onClick={() => setActive(true)}
        className="group block p-6 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 backdrop-blur-sm border border-neutral-800 rounded-lg relative overflow-hidden hover:bg-neutral-900 transition-colors duration-300 cursor-pointer shadow-[0px_1px_8px_0px_rgba(52,222,153,0)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(74,222,128,0.1)_50%,transparent_75%)] bg-[length:400%_400%] opacity-0 group-hover:opacity-100 animate-[gradient_6s_linear_infinite]"></div>
        <div className="space-y-3">
          <motion.h3
            layoutId={`title-${id}`}
            className="text-xl font-semibold text-neutral-100 group-hover:text-green-400 transition-colors"
          >
            {title}
          </motion.h3>
          <p className="text-neutral-400 line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

const CloseIcon = () => (
  <motion.svg
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
      transition: {
        duration: 0.05,
      },
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
