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

export const VisualizationFilter: React.FC<{
  activeType: 'project' | 'blog' | 'hackathon' | null;
  onTypeChange: (type: 'project' | 'blog' | 'hackathon' | null) => void;
}> = ({ activeType, onTypeChange }) => {
  return (
    <div className="hidden md:flex bottom-4 items-center justify-center gap-2">
      <FilterButton 
        type="project"
        isActive={activeType === 'project'}
        onClick={() => onTypeChange(activeType === 'project' ? null : 'project')}
      />
      <FilterButton 
        type="blog"
        isActive={activeType === 'blog'}
        onClick={() => onTypeChange(activeType === 'blog' ? null : 'blog')}
      />
      <FilterButton 
        type="hackathon"
        isActive={activeType === 'hackathon'}
        onClick={() => onTypeChange(activeType === 'hackathon' ? null : 'hackathon')}
      />
    </div>
  );
};