import { Billboard, Html } from '@react-three/drei'
import { Project, Post, Hackathon } from '@/sanity/sanity.types'

interface NodeDetailProps {
  data: Project | Post | Hackathon
  onClose: () => void
}

export const NodeDetail: React.FC<NodeDetailProps> = ({ data, onClose }) => {
  return (
    <Html
      transform
      style={{
        width: '800px', // Will be scaled down by the parent group
        height: '600px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
      }}
      center
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="bg-gray-600 w-32 h-32 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-300">{data.description}</p>
      </div>
    </Html>
  )
}