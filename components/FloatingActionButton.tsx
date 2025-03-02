"use client"

import { motion } from "framer-motion"
import { User2, Network } from "lucide-react"
import Button from "./ui/Button"

interface FloatingActionButtonProps {
  isProfileView: boolean;
  onClick: () => void;
}

export default function FloatingActionButton({ isProfileView, onClick }: FloatingActionButtonProps) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[999]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="floating"
        size="floating"
        onClick={onClick}
        className="flex items-center justify-center"
      >
        {isProfileView ? <Network className="w-6 h-6" /> : <User2 className="w-6 h-6" />}
      </Button>
    </motion.div>
  );
}