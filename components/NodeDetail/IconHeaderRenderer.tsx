import * as Icons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface IconHeaderProps {
  header: {
    text: string;
    icon?: string;
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
}

export const IconHeaderRenderer = ({ header }: IconHeaderProps) => {
  const Icon = header.icon ? (Icons[header.icon as keyof typeof Icons] as LucideIcon) : null;
  const size = header.size || 'h3'

  const sizeClasses = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base'
  }

  return (
    <div 
      className={`flex items-center gap-2 font-bold ${sizeClasses[size]} my-4`}
      role="heading"
      aria-level={parseInt(size.charAt(1))}
    >
      {Icon && <Icon className="w-6 h-6" aria-hidden="true" />}
      <span>{header.text}</span>
    </div>
  )
} 