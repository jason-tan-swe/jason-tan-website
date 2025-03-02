import { Html, Text } from '@react-three/drei'
import { Project, Post, Hackathon } from '@/sanity/sanity.types'
import { NodeProps } from '../Visualization';
import { MouseEvent, useState } from 'react';
import { useIsMobile } from '@/hooks/useBreakpoint';
import { ContentRenderer } from './ContentRenderer';
import { format } from 'date-fns'
import { PortableTextBlock } from '@portabletext/types'
import { ContentBlock } from './ContentRenderer'
import { ImageRenderer } from './ImageRenderer';

interface NodeDetailProps {
  data: {
    _type?: string;
    title?: string;
    details?: ContentBlock[];
    [key: string]: any;
  };
  isMajorNode?: boolean;
  relatedNodes?: NodeProps[];
  onClose: () => void;
  onNodeClick?: (node: NodeProps) => void;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({
  data,
  onClose,
  onNodeClick = () => {},
  isMajorNode = false,
  relatedNodes = [],
}) => {
  const isMobile = useIsMobile();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const questsUrl = process.env.NODE_ENV === 'development' 
    ? 'http://quests.localhost:3000'
    : `https://quests.${baseUrl.replace('https://', '')}`;

  const getNodeUrl = () => {
    switch (data._type) {
      case 'project':
        return `${questsUrl}/projects/${data.slug?.current}`;
      case 'hackathon':
        return `${questsUrl}/hackathons/${data.slug?.current}`;
      case 'post':
        return `${questsUrl}/blogs/${data.slug?.current}`;
      default:
        return questsUrl;
    }
  };

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isScrollable = element.scrollHeight > element.clientHeight;
    
    if (isScrollable) {
      const isAtTop = element.scrollTop === 0;
      const isAtBottom = Math.abs(element.scrollTop + element.clientHeight - element.scrollHeight) < 1;
      
      // Allow propagation if we're at the edges and trying to scroll further
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return;
      }
      
      // Prevent the event from bubbling up to parent scrollable elements
      e.stopPropagation();
    }
  }

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    // Similar logic for touch events
    const element = e.currentTarget;
    const isScrollable = element.scrollHeight > element.clientHeight;
    
    if (isScrollable) {
      e.stopPropagation();
    }
  }

  const handleNodeClick = (e: MouseEvent<HTMLDivElement>, node: NodeProps) => {
    e.preventDefault();
    e.stopPropagation();
    onNodeClick(node)
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM dd, yyyy')
  }

  const renderDates = () => {
    if ('publishedAt' in data) {
      return <span>Published: {formatDate(data.publishedAt || '')}</span>
    }
    
    if ('startDate' in data && data.startDate) {
      return (
        <span>
          {data.endDate 
            ? `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`
            : `Started: ${formatDate(data.startDate)}`
          }
        </span>
      )
    }

    return null
  }

  const renderTools = () => {
    if (!('tools' in data) || !data.tools?.length) return null

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {data.tools.map((tool: string, index: string) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
          >
            {tool}
          </span>
        ))}
      </div>
    )
  }

  return (
    <Html
      style={{
        width: isMobile ? '95dvw' : '100svw',
        height: isMobile ? '95dvh' : '55dvh',
        padding: '1rem',
        maxWidth: '1000px',
        maxHeight: '700px',
        background: 'linear-gradient(to bottom, rgba(32, 31, 36, 0.97), rgba(28, 27, 32, 0.94))',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '1.5rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        boxShadow: `
          0 0 50px rgba(0, 0, 0, 0.2),
          inset 0 0 30px rgba(255, 255, 255, 0.02),
          0 2px 4px rgba(0, 255, 136, 0.01)
        `,
      }}
      center
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 select-none bg-[#2a2a30]/50 p-3 text-lg 
          hover:text-white hover:bg-[#2a2a30]/80 hover:cursor-pointer transition-all duration-200 
          rounded-full backdrop-blur-sm border border-white/5 flex items-center gap-2
          shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
      >
        <span className="text-sm font-medium text-gray-400/90">ESC</span>
        ✕
      </button>

      <div 
        className="px-6 py-8 md:py-4 space-y-6 h-full overflow-y-auto
          scrollbar-thin scrollbar-thumb-[#2a2a30] scrollbar-track-transparent"
        onWheel={handleScroll}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
      >
        <div className="flex items-center gap-x-2">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-gray-300/90">{data.title}</h2>
        </div>

        {isMajorNode ? (
          <div className="space-y-4 h-full">
            <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
              {relatedNodes.map((node) => (
                <div 
                  key={node.id}
                  className="p-6 bg-[#2a2a30]/30 backdrop-blur-sm rounded-xl 
                    hover:bg-[#2a2a30]/50 transition-all duration-200 flex flex-col mb-2 
                    cursor-pointer border border-white/[0.02] hover:border-white/[0.05]
                    shadow-[0_4px_8px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
                  onClick={(e) => handleNodeClick(e, node)}
                >
                  <h3 className="text-xl font-semibold mb-2">{node.data.title}</h3>
                  <p className="text-md text-gray-400/90">{node.data.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 p-5 bg-[#2a2a30]/30 backdrop-blur-sm rounded-xl
              border border-white/[0.02] shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <div className="flex flex-wrap gap-4 text-sm text-gray-400/90">
                {renderDates()}
                {'readingTime' in data && data.readingTime && (
                  <span>Reading time: {data.readingTime} min</span>
                )}
              </div>
              {renderTools()}
            </div>

            {data.mainImage && (
              <div className="relative rounded-xl overflow-hidden
                shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                <ImageRenderer image={data.mainImage} />
              </div>
            )}

            {data.details && (
              <div className="prose prose-invert max-w-none
                prose-p:text-gray-300/90 prose-headings:text-white/90
                prose-strong:text-white/90 prose-code:text-white/90
                prose-a:text-[#00ff88] prose-a:no-underline hover:prose-a:text-[#00ff88]/80">
                <ContentRenderer details={data.details} />
              </div>
            )}
          </div>
        )}
      </div>
    </Html>
  );
}; 