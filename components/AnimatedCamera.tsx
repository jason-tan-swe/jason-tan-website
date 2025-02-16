import { useRef, useEffect } from 'react'
import { NodeProps } from './Visualization'
import { CameraControls, CameraControlsProps } from '@react-three/drei'
import { Vector3 } from 'three';

interface AnimatedCameraProps extends CameraControlsProps {
  cameraProps: {
    px: number
    py: number
    pz: number
    tx: number
    ty: number
    tz: number
  };
  selectedNode: NodeProps | null;
}

const AnimatedCamera: React.FC<AnimatedCameraProps> = ({ selectedNode, ...props }) => {
  const controlsRef = useRef<CameraControls>(null)
  const oldNode = useRef<NodeProps | null>(null)

  useEffect(() => {
    const handleNodeAnimation = async () => {
      console.log('old', oldNode.current)
      if (!controlsRef.current) return
      if (selectedNode) {
        controlsRef.current.setLookAt(
          selectedNode.position[0] + 3,
          selectedNode.position[1] + 1.5,
          selectedNode.position[2] + 3,
          selectedNode.position[0],
          selectedNode.position[1],
          selectedNode.position[2],
          true // animate
        )
        oldNode.current = selectedNode;
      } else if (oldNode.current) {
        // controlsRef.current.setLookAt(20, 20, 20, 0, 0, 0, true)
        controlsRef.current.setLookAt(
          oldNode.current.position[0] + 20, // Further away but same direction
          oldNode.current.position[1] + 20,
          oldNode.current.position[2] + 20,
          oldNode.current.position[0],
          oldNode.current.position[1],
          oldNode.current.position[2],
          true
        )
        
        oldNode.current = null;
        setTimeout(async () => {
          if (controlsRef.current) {
            await controlsRef.current.setLookAt(20, 20, 20, 0, 0, 0, true)
          }
        }, 50)
      }
    }
    handleNodeAnimation()
  }, [selectedNode])

  return <CameraControls
    maxDistance={35}
    minDistance={8}
    distance={controlsRef?.current?.distance ?? 35}
    ref={controlsRef}
    {...props}
   />
}

export { AnimatedCamera }