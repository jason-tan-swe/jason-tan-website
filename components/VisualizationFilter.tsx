import { FaCode, FaPen, FaTrophy } from 'react-icons/fa';

interface FilterButtonProps {
  type: 'project' | 'blog' | 'hackathon';
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, isActive, onClick }) => {
  const getIcon = () => {
    switch (type) {
      case 'project': return <FaCode className="" />;
      case 'blog': return <FaPen className="" />;
      case 'hackathon': return <FaTrophy className="" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'project': return isActive ? 'bg-[#00ff88]/20' : 'hover:bg-[#00ff88]/10';
      case 'blog': return isActive ? 'bg-[#ff0088]/20' : 'hover:bg-[#ff0088]/10';
      case 'hackathon': return isActive ? 'bg-[#0088ff]/20' : 'hover:bg-[#0088ff]/10';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        px-4 py-2 rounded-full
        text-sm font-medium
        backdrop-blur-md
        transition-all duration-200
        border border-white/10
        gap-2
        ${getColor()}
        ${isActive ? 'text-white' : 'text-white/70'}
      `}
    >
      {getIcon()}
      {type.charAt(0).toUpperCase() + type.slice(1)}s
    </button>
  );
};

interface VisualizationFilterProps {
  activeType: 'project' | 'blog' | 'hackathon' | null;
  onTypeChange: (type: 'project' | 'blog' | 'hackathon' | null) => void;
}

export const VisualizationFilter = ({ 
  activeType,
  onTypeChange 
}: VisualizationFilterProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onTypeChange(activeType === 'project' ? null : 'project')}
        className={`
          px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-200
          border border-white/[0.02] 
          shadow-[0_2px_4px_rgba(0,0,0,0.1)]
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_0_8px_rgba(0,255,136,0.1)]
          ${activeType === 'project' 
            ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20' 
            : 'bg-[#2a2a30]/30 text-gray-400/90 hover:bg-[#2a2a30]/50 hover:border-[#00ff88]/10'
          }
        `}
      >
        Projects
      </button>

      <button
        onClick={() => onTypeChange(activeType === 'blog' ? null : 'blog')}
        className={`
          px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-200
          border border-white/[0.02]
          shadow-[0_2px_4px_rgba(0,0,0,0.1)]
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_0_8px_rgba(255,0,136,0.1)]
          ${activeType === 'blog'
            ? 'bg-[#ff0088]/10 text-[#ff0088] border-[#ff0088]/20'
            : 'bg-[#2a2a30]/30 text-gray-400/90 hover:bg-[#2a2a30]/50 hover:border-[#ff0088]/10'
          }
        `}
      >
        Blogs
      </button>

      <button
        onClick={() => onTypeChange(activeType === 'hackathon' ? null : 'hackathon')}
        className={`
          px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-200
          border border-white/[0.02]
          shadow-[0_2px_4px_rgba(0,0,0,0.1)]
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_0_8px_rgba(0,136,255,0.1)]
          ${activeType === 'hackathon'
            ? 'bg-[#0088ff]/10 text-[#0088ff] border-[#0088ff]/20'
            : 'bg-[#2a2a30]/30 text-gray-400/90 hover:bg-[#2a2a30]/50 hover:border-[#0088ff]/10'
          }
        `}
      >
        Hackathons
      </button>
    </div>
  );
};