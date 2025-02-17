import { Html } from '@react-three/drei'
import { Project, Post, Hackathon } from '@/sanity/sanity.types'
import { NodeProps } from './Visualization';
import { MouseEvent } from 'react';
import { useIsMobile } from '@/hooks/useBreakpoint';

interface NodeDetailProps {
  data: Project | Post | Hackathon;
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

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  const handleNodeClick = (e: MouseEvent<HTMLDivElement>, node: NodeProps) => {
    e.preventDefault();
    e.stopPropagation();
    onNodeClick(node)
  }

  return (
    <Html
      // transform
      style={{
        width: isMobile ? '95dvw' : '80dvw',
        height: isMobile ?'95dvh' : '50dvh',
        maxWidth: '1280px', // max of canvas is 1440
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        // borderRadius: '10px',
        userSelect: '-moz-none',
        display: 'flex',
        justifyContent: 'center'
      }}
      center
    >
      <div className="px-4 py-8 md:py-2 space-y-4 h-full">
        <div className="flex justify-between items-center gap-x-2">
          <h2 className="text-3xl font-bold">{data.title}</h2>
          <button
          onClick={handleClose}
          className="select-none bg-gray-800 p-4 text-2xl hover:text-white hover:bg-gray-700 hover:cursor-pointer transition-colors rounded-full"
        >
          ✕
        </button>
        </div>

        {isMajorNode ? (
          <div className="space-y-4 h-[calc(100%-9rem)] overflow-hidden">
            <div
              className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto h-full"
              onWheel={handleScroll}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
            >
                {relatedNodes.map((node) => (
                  <div 
                    key={node.id}
                    className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex flex-col mb-2"
                    onClick={(e) => handleNodeClick(e, node)}
                  >
                    <h3 className="text-xl font-semibold mb-0.5">{node.data.title}</h3>
                    <p className="text-md text-gray-400">{node.data.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-300">{data.description}</p>
          </div>
        )}
      </div>
    </Html>
  )
}