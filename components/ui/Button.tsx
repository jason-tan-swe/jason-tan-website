"use client"

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";

// Define button variants using cva
export const buttonVariants = cva(
  // Base styles that apply to all variants
  "relative inline-flex items-center justify-center font-medium transition-all",
  {
    variants: {
      variant: {
        // Default green button (previously rainbow-button)
        default: cn(
          "rounded-xl",
          "bg-emerald-400 text-black",
          "shadow-[0_2px_0_0_#059669,0_4px_8px_rgba(0,0,0,0.1)]", // emerald-600 for shadow
          "border-2 border-emerald-600",
          "after:absolute after:inset-0 after:rounded-xl after:border-t-2 after:border-white/30 after:pointer-events-none",
          "hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#059669,0_8px_16px_rgba(0,0,0,0.1)]",
          "active:translate-y-0.5 active:shadow-[0_0px_0_0_#059669]",
          "hover:bg-emerald-300",
        ),
        // New floating variant based on FloatingActionButton
        floating: cn(
          "rounded-2xl",
          "bg-emerald-400 text-black",
          "shadow-lg",
          "hover:bg-emerald-300",
          "transition-colors",
          "z-[999]"
        ),
        // For visualization filter buttons
        filter: "rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/[0.02] shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
        // For minimal buttons
        minimal: "rounded-full border disabled:bg-neutral-500 disabled:opacity-30 select-none hover:opacity-60 text-center gap-2",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-4 py-2",
        lg: "h-12 px-10 py-3",
        floating: "w-14 h-14", // New size for floating buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
