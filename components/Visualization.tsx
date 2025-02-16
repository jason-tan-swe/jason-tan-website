"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { mockProjects, mockBlogPosts, mockHackathons } from '@/lib/mock/visualizationData';
import { Hackathon, Project, Post } from '@/sanity/sanity.types';
import { Mesh, Group, DoubleSide } from 'three';
import { Text3D, Line, Billboard, Sparkles, Center, } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useSpring,} from '@react-spring/three'
import { ParticleAura } from './ParticleAura';
import { NodeDetail } from './NodeDetail'
import { AnimatedCamera } from './AnimatedCamera';
import { VisualizationFilter } from './VisualizationFilter';

export interface NodeProps {
  id: string;
  type: 'project' | 'blog' | 'hackathon';
  position: [number, number, number];
  data: Project | Post | Hackathon;
  size?: number;
  isMajorNode?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

interface CameraPosition {
  position: [number, number, number]
  target: [number, number, number]
}


const ParticleRing = ({ radius, color }: { radius: number; color: string }) => {
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      temp.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0,
      ]);
    }
    return temp;
  }, [radius]);

  const particleRef = useRef<Group>(null);

  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={particleRef}>
      {particles.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const Node: React.FC<NodeProps> = ({ id, type, position, data, size = 1, isMajorNode = false, isHighlighted = false, isSelected = false, onClick }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  const scale = isSelected ? 1.5 : 1

  const color = useMemo(() => {
    switch (type) {
      case 'project': return '#00ff88';
      case 'blog': return '#ff0088';
      case 'hackathon': return '#0088ff';
      default: return '#ffffff';
    }
  }, [type]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  const baseOpacity = isMajorNode ? 0.3 : 0.01;
  const activeOpacity = isMajorNode ? 0.8 : 0.3;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <group position={position} scale={scale}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHighlighted ? activeOpacity : baseOpacity}
          wireframe={true}
        />
      </mesh>

      <ParticleAura
        color={color}
        count={isMajorNode ? 150 : 50}
        size={isMajorNode ? 0.03 : 0.02}
        radius={size * 1.2}
        speed={0.2}
      />

      {isMajorNode && (
        <Billboard
          follow
        >
          <Center
            position={type === 'blog' ? [-3, -(size + 2.5), 0] : [-5, -(size + 2.5), 0]}
          >
            <Text3D
              font={'/fonts/q.json'}
              position={[0, -(size + 1), 0]} // Move down by sphere radius (size) plus some padding
              size={size * 0.7}
              height={0.2}
              curveSegments={32}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              {data.title || id}
              <meshPhongMaterial
                color={color}
                depthWrite={false}
                emissive={type === 'project' ? '#004422' : color} // Darker emissive for projects
                emissiveIntensity={isHighlighted ? (type === 'project' ? 3 : 2) : 0.5}
                toneMapped={false}
                side={DoubleSide}
                flatShading={false}
              />
              <ParticleRing radius={10} color={color} />
            </Text3D>
          </Center>
        </Billboard>
      )}
    </group>
  );
};

const EdgeConnections = ({ nodes, type, isHighlighted, majorNode }: { 
  nodes: NodeProps[],
  type: 'project' | 'blog' | 'hackathon',
  isHighlighted: boolean,
  majorNode: NodeProps
}) => {
  const color = useMemo(() => {
    switch (type) {
      case 'project': return '#00ff88';
      case 'blog': return '#ff0088';
      case 'hackathon': return '#0088ff';
      default: return '#ffffff';
    }
  }, [type]);

  return (
    <>
      {/* Connect minor nodes to major node with higher opacity */}
      {nodes.map((node) => (
        <Line
          key={`${majorNode.id}-${node.id}`}
          points={[
            majorNode.position,
            node.position
          ]}
          color={color}
          lineWidth={isHighlighted ? 1.5 : 0.4}
          opacity={isHighlighted ? 0.8 : 0.15}
          transparent
          depthTest={true}    // Enable depth testing
        />
      ))}

      {/* Connect minor nodes to each other with lower opacity */}
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((target, j) => (
          <Line
            key={`${node.id}-${target.id}`}
            points={[
              node.position,
              target.position
            ]}
            color={color}
            lineWidth={isHighlighted ? 1 : 0.2}
            opacity={isHighlighted ? 0.6 : 0.1}
            transparent
            depthTest={true}    // Enable depth testing
          />
        ))
      )}
    </>
  );
};

const Visualization = () => {
  const [highlightedType, setHighlightedType] = useState<'project' | 'blog' | 'hackathon' | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeProps | null>(null)
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>({
    position: [20, 20, 20],
    target: [0, 0, 0]
  })
  const clickedNode = useRef(false);
  const isPanning = useRef(false);

  const handleCanvasClick = () => {
    if (!clickedNode.current && !isPanning.current) {
      setHighlightedType(null);
    }
    clickedNode.current = false;
  };

  // Update the useSpring configuration in the Visualization component
  const { cameraProps } = useSpring({
    cameraProps: {
      px: cameraPosition.position[0],
      py: cameraPosition.position[1],
      pz: cameraPosition.position[2],
      tx: cameraPosition.target[0],
      ty: cameraPosition.target[1],
      tz: cameraPosition.target[2]
    },
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
      precision: 0.001
    },
  })

  const handleZoomOut = () => {
    clickedNode.current = true;
    setCameraPosition({
      position: [30, 30, 30],
      target: [0, 0, 0]
    })
    setSelectedNode(null)
    console.log("ZOOMED OUT")
  }

  useEffect(() => {
    console.log('cam = ', cameraPosition)
  }, [cameraPosition])
  
  // Update handleNodeClick
  const handleNodeClick = (node: NodeProps) => {
    clickedNode.current = true
    setHighlightedType(highlightedType === node.type ? null : node.type);
    if (selectedNode?.id === node.id) {
      // Zoom out
      handleZoomOut();
    } else {
      // Zoom in
      console.log("ZOOMING IN", node.position)
      setCameraPosition({
        position: [
          node.position[0] + 8, // Move further out
          node.position[1] + 3, // Less vertical offset
          node.position[2] + 8  // Move further out
        ],
        target: node.position
      })
      setSelectedNode(node)
    }
  }
  // console.log('cam', cameraProps)
  
  // Create node data
  // Inside the Visualization component, replace the existing nodes useMemo with:
  const nodes = useMemo(() => {
    const getRandomPosition = (index: number, total: number, offset: number = 0): [number, number, number] => {
      const radius = 12;
      // Use golden ratio for better distribution
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      
      // Add randomness while maintaining good distribution
      const i = index + offset;
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / total);
      
      // Add small random offset to prevent exact overlaps
      const jitter = 1.5;
      const randomOffset = [
        (Math.random() - 0.5) * jitter,
        (Math.random() - 0.5) * jitter,
        (Math.random() - 0.5) * jitter
      ];
  
      return [
        radius * Math.sin(phi) * Math.cos(theta) + randomOffset[0],
        radius * Math.sin(phi) * Math.sin(theta) + randomOffset[1],
        radius * Math.cos(phi) + randomOffset[2]
      ];
    };
  
    const totalNodes = mockProjects.length + mockBlogPosts.length + mockHackathons.length;
  
    const projectNodes = mockProjects.map((project, i) => ({
      id: `project-${i}`,
      type: 'project' as const,
      position: getRandomPosition(i, totalNodes, 0),
      data: project
    }));
  
    const blogNodes = mockBlogPosts.map((post, i) => ({
      id: `blog-${i}`,
      type: 'blog' as const,
      position: getRandomPosition(i, totalNodes, mockProjects.length),
      data: post
    }));
  
    const hackathonNodes = mockHackathons.map((hackathon, i) => ({
      id: `hackathon-${i}`,
      type: 'hackathon' as const,
      position: getRandomPosition(i, totalNodes, mockProjects.length + mockBlogPosts.length),
      data: hackathon
    }));
  
    return {
      projects: projectNodes,
      blogs: blogNodes,
      hackathons: hackathonNodes
    };
  }, []);

  // Update the majorNodes positions to be more spread out
  const majorNodes = useMemo(() => [
    {
      id: 'major-projects',
      type: 'project' as const,
      position: [-5, 5, 0] as [number, number, number],
      data: { title: 'Projects' },
      size: 3,
      isMajorNode: true
    },
    {
      id: 'major-blogs',
      type: 'blog' as const,
      position: [5, 5, 0] as [number, number, number],
      data: { title: 'Blogs' },
      size: 3,
      isMajorNode: true
    },
    {
      id: 'major-hackathons',
      type: 'hackathon' as const,
      position: [0, -5, 0] as [number, number, number],
      data: { title: 'Hackathons' },
      size: 3,
      isMajorNode: true
    }
  ], []) as NodeProps[];

  return (
    <div className="w-full m-auto h-[360px] sm:h-[500px] md:h-[500px] lg:h-[700px] md:py-2">
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100 }}
        onClick={handleCanvasClick}
        gl={{ antialias: true, alpha: true }}
        dpr={[1,2]}
      >
        <AnimatedCamera
          selectedNode={selectedNode}
          cameraProps={cameraProps}
          onStart={() => {
            isPanning.current = true;
          }}
          onEnd={() => {
            setTimeout(() => {
              isPanning.current = false;
            }, 10);
          }}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sparkles
          count={200}
          size={0.4}
          speed={0.2}
          opacity={0.15}
          scale={15}
          noise={0.1}
          color={0x444444}
        />
        {/* Render edges */}
        <EdgeConnections 
          nodes={nodes.projects}
          type="project"
          isHighlighted={highlightedType === 'project'}
          majorNode={majorNodes[0]}
        /> 
        <EdgeConnections 
          nodes={nodes.blogs}
          type="blog"
          isHighlighted={highlightedType === 'blog'}
          majorNode={majorNodes[1]}
        />
        <EdgeConnections 
          nodes={nodes.hackathons}
          type="hackathon"
          isHighlighted={highlightedType === 'hackathon'}
          majorNode={majorNodes[2]}
        />

        {/* Render all nodes */}
        {Object.entries(nodes).map(([groupType, nodeList]) =>
          nodeList.map(node => (
              <Node
                key={node.id}
                {...node}
                isHighlighted={highlightedType === node.type} // Changed from 'type' to 'node.type'
                onClick={() => handleNodeClick(node)}
              />
          ))
        )}

        {/* Render major category nodes */}
        {majorNodes.map(node => (
          <Node
            key={node.id}
            {...node}
            isHighlighted={highlightedType === node.type}
            onClick={() => handleNodeClick(node)}
          />
        ))}
        {selectedNode && (
          <group position={selectedNode.position}>
            <mesh>
              <sphereGeometry args={[1.2, 32, 32]} /> {/* Slightly larger than the node */}
              <meshBasicMaterial 
                color={selectedNode.type === 'project' ? '#00cc66' : 
                      selectedNode.type === 'blog' ? '#ff0088' : '#0088ff'}
                transparent
                opacity={0.1}
              />
            </mesh>
            <Billboard
              follow={true}
              lockX={false}
              lockY={false}
              lockZ={false}
            >
              <group scale={0.15}> {/* Scale down the detail panel */}
                <NodeDetail
                  data={selectedNode.data}
                  onClose={handleZoomOut}
                />
              </group>
            </Billboard>
          </group>
        )}

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
            intensity={2}
          />
        </EffectComposer>
      </Canvas>
      <VisualizationFilter
        activeType={highlightedType}
        onTypeChange={setHighlightedType}
      />
    </div>
  );
};

export default Visualization;
