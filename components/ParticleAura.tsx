import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, Float32BufferAttribute, Group } from 'three'
import { Mesh, Color } from 'three'

interface ParticleAuraProps {
  color: string
  count?: number
  size?: number
  radius?: number
  speed?: number
}

export const ParticleAura: React.FC<ParticleAuraProps> = ({
  color,
  count = 100,
  size = 0.02,
  radius = 1,
  speed = 0.2
}) => {
  const points = useRef<Points>(null)
  const geometry = useRef<BufferGeometry>(null)

  // Generate initial particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2
      
      pos[i * 3] = Math.cos(angle) * Math.sin(phi) * radius
      pos[i * 3 + 1] = Math.sin(angle) * Math.sin(phi) * radius
      pos[i * 3 + 2] = Math.cos(phi) * radius
    }
    return pos
  }, [count, radius])

  // Animation loop
  useFrame((state, delta) => {
    if (points.current && geometry.current) {
      points.current.rotation.x += delta * speed
      points.current.rotation.y += delta * speed * 0.5

      const positions = geometry.current.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]
        const z = positions[i3 + 2]

        // Add some movement
        positions[i3] = x + Math.sin(state.clock.elapsedTime + i) * 0.01
        positions[i3 + 1] = y + Math.cos(state.clock.elapsedTime + i) * 0.01
        positions[i3 + 2] = z + Math.sin(state.clock.elapsedTime + i) * 0.01
      }
      geometry.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={2}
        sizeAttenuation
      />
    </points>
  )
}