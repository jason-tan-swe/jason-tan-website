import { Billboard, Html } from '@react-three/drei'
import { Project, Post, Hackathon } from '@/sanity/sanity.types'
import { NodeProps } from './Visualization';
import { MouseEvent, useMemo } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

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

  const breakpoint = useBreakpoint()
  const detailBoxDimensions = useMemo(() => {
    let width = 0;
    let height = 0;

    switch(breakpoint) {
      case "xs":
        width = 500;
        height = 800;
        break;
      case "sm":
        width = 1000;
        height = 800;
        break;
      default:
          width = 1200;
          height = 900;
          break;
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
    }

  }, [breakpoint])

  return (
    <Html
      transform
      style={{
        width: detailBoxDimensions.width,
        height: detailBoxDimensions.height,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
      }}
      center
    >
      <div className="space-y-4 h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-bold">{data.title}</h2>
          <button
            onClick={handleClose}
            className="bg-gray-800 w-36 h-24 text-2xl hover:text-white hover:bg-gray-700 hover:cursor-pointer transition-colors rounded-2xl"
          >
            ✕ Close
          </button>
        </div>

        {isMajorNode ? (
          <div className="space-y-4 h-[calc(100%-9rem)] overflow-hidden">
            <p className="text-gray-300 text-3xl">Related items:</p>
            <div
              className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto h-full"
              onWheel={handleScroll}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
            >
              {/* <div className="pb-12"> Added wrapper div with bottom padding */}
                {relatedNodes.map((node) => (
                  <div 
                    key={node.id}
                    className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex flex-col mb-6"
                    onClick={(e) => handleNodeClick(e, node)}
                  >
                    <h3 className="text-4xl font-semibold mb-4">{node.data.title}</h3>
                    <p className="text-2xl text-gray-400">{node.data.description}</p>
                  </div>
                ))}
              {/* </div> */}
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