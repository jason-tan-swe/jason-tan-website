"use client"

import { useWindowSize } from "usehooks-ts";

export function useBreakpoint() {
  const { width } = useWindowSize();

  if (width < 640) return "xs"; // Below `sm`
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl"; // Above `1536px`
}

export function useIsMobile() {
  const breakpoint = useBreakpoint();
  if (breakpoint == "sm" || breakpoint == "xs") {
    return true;
  }
  return false;
}