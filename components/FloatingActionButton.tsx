"use client"

import { motion } from "framer-motion"
import { User2, Network } from "lucide-react"

interface FloatingActionButtonProps {
  isProfileView: boolean;
  onClick: () => void;
}

export default function FloatingActionButton({ isProfileView, onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-400 rounded-2xl shadow-lg flex items-center justify-center text-black hover:bg-emerald-300 transition-colors z-[999]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isProfileView ? <Network className="w-6 h-6" /> : <User2 className="w-6 h-6" />}
    </motion.button>
  )
}