import { useRef, useEffect, useState } from 'react'
import { NodeProps } from './Visualization'
import { CameraControls, CameraControlsProps } from '@react-three/drei'
import { Vector3 } from 'three';
import { useIsMobile } from '@/hooks/useBreakpoint';

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
  const [isEnabled, setIsEnabled] = useState(true);
  const isActive = useRef<boolean | undefined>(undefined);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleNodeAnimation = async () => {
      if (!controlsRef.current) return
      if (selectedNode) {
        if (oldNode.current) {
          // setIsEnabled(true)
        }

        oldNode.current = selectedNode;
        await controlsRef.current.setLookAt(
          selectedNode.position[0] + 3,
          selectedNode.position[1] + 1.5,
          selectedNode.position[2] + 3,
          selectedNode.position[0],
          selectedNode.position[1],
          selectedNode.position[2],
          true // animate
        )
        // setIsEnabled(selectedNode?.isMajorNode ? false : true);
      } else if (oldNode.current) {
        // setIsEnabled(true);
        controlsRef.current.setLookAt(
          oldNode.current.position[0] + 20, // Further away but same direction
          oldNode.current.position[1] + 20,
          oldNode.current.position[2] + 20,
          oldNode.current.position[0],
          oldNode.current.position[1],
          oldNode.current.position[2],
          true
        )
        setTimeout(async () => {
          if (controlsRef.current) {
            controlsRef.current.setLookAt(20, 20, 20, 0, 0, 0, true)
            // setIsEnabled(true)
            oldNode.current = null;
          }
        }, 1)
      }
    }
    handleNodeAnimation()
  }, [selectedNode])

  return <CameraControls
    maxDistance={isMobile ? 45 : 35}
    minDistance={8}
    enabled={isEnabled}
    distance={controlsRef?.current?.distance ?? isMobile ? 45 : 35}
    ref={controlsRef}
    active={isActive.current}
    {...props}
   />
}

export { AnimatedCamera }