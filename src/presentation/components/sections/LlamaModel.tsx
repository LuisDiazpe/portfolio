import { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const AURORA_COLORS = [
    new THREE.Color('#00ffcc'),
    new THREE.Color('#00b4ff'),
    new THREE.Color('#7c3aed'),
    new THREE.Color('#0e7490'),
]

const auroraVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vNormal     = normalize(normalMatrix * normal);
  vPosition   = position;
  vUv         = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const auroraFragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform float uMouseX;
uniform float uMix;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform float uPulse;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.2);

  // Two overlapping aurora waves
  float wave1 = sin(vUv.y * 6.0 + uTime * 1.2) * 0.5 + 0.5;
  float wave2 = sin(vUv.y * 10.0 - uTime * 0.8 + vUv.x * 4.0) * 0.5 + 0.5;
  float wave  = mix(wave1, wave2, 0.4);

  // Color shift with mouse
  vec3 col1   = mix(uColor1, uColor2, wave);
  vec3 col2   = mix(uColor2, uColor3, wave);
  vec3 aurora = mix(col1, col2, clamp(uMix + uMouseX * 0.4, 0.0, 1.0));

  // Pulse glow (breathing)
  float glow  = 1.0 + uPulse * 0.3;

  vec3 baseFur    = vec3(0.04, 0.08, 0.14);
  vec3 finalColor = baseFur
    + aurora * fresnel * 2.4 * glow
    + aurora * wave * 0.18;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function LlamaInner({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const groupRef  = useRef<THREE.Group>(null)
    const matRef    = useRef<THREE.ShaderMaterial | null>(null)
    const { scene } = useGLTF('/Llama.glb')
    const [ready, setReady] = useState(false)

    // Smooth state
    const rotY     = useRef(0)
    const rotX     = useRef(0)
    const walkCycle = useRef(0)   // 0→2π walk loop
    const baseY    = -1.52

    useEffect(() => {
        const box    = new THREE.Box3().setFromObject(scene)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        scene.position.set(-center.x, -center.y + size.y / 2, -center.z)
        scene.scale.setScalar(2.8 / Math.max(size.x, size.y, size.z))
        setReady(true)
    }, [scene])

    useEffect(() => {
        const mat = new THREE.ShaderMaterial({
            vertexShader:   auroraVertexShader,
            fragmentShader: auroraFragmentShader,
            uniforms: {
                uTime:   { value: 0 },
                uMouseX: { value: 0 },
                uMix:    { value: 0 },
                uPulse:  { value: 0 },
                uColor1: { value: AURORA_COLORS[0] },
                uColor2: { value: AURORA_COLORS[1] },
                uColor3: { value: AURORA_COLORS[2] },
            },
            transparent: true,
            side: THREE.DoubleSide,
        })
        scene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = mat
                child.castShadow = true
            }
        })
        matRef.current = mat
    }, [scene])

    useFrame(({ clock }) => {
        const t  = clock.getElapsedTime()
        const mx = mouse.current.x
        const my = mouse.current.y

        if (matRef.current) {
            const u = matRef.current.uniforms

            u.uTime.value = t

            const auroraIntensity = (Math.sin(t * 0.3) + 1) / 2

            u.uMix.value = auroraIntensity
            u.uPulse.value = auroraIntensity

            u.uMouseX.value += (mx * 0.4 - u.uMouseX.value) * 0.05
        }

        if (!groupRef.current) return

        walkCycle.current += 0.02

        const walkBob  = Math.sin(walkCycle.current * 2) * 0.06
        const walkSway = Math.sin(walkCycle.current) * 0.02

        const targetY = mx * 0.6
        const targetX = Math.max(-0.15, Math.min(0.15, -my * 0.15))

        rotY.current += (targetY - rotY.current) * 0.06
        rotX.current += (targetX - rotX.current) * 0.06

        groupRef.current.rotation.y = rotY.current
        groupRef.current.rotation.x = rotX.current

        groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03 + walkSway


        const breath = (Math.sin(t * 1.2) + 1) / 2
        groupRef.current.scale.y = 1 + breath * 0.02

        const progress = (t * 0.08) % (Math.PI * 2)

        groupRef.current.position.z = -Math.sin(progress) * 0.4
        groupRef.current.position.x =  Math.sin(progress * 0.5) * 0.2

        groupRef.current.position.y =
            baseY +
            Math.sin(t * 0.7) * 0.05 +
            walkBob
    })

    if (!ready) return null

    return (
        <group ref={groupRef} position={[0, -1.6, 0]}>
            <primitive object={scene} />
        </group>
    )
}

function AuroraParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const pointsRef = useRef<THREE.Points>(null)

    const { positions, colors } = (() => {
        const count = 180
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)
        const palette = [
            [0, 1, 0.8], [0, 0.71, 1],
            [0.49, 0.23, 0.93], [0.05, 0.45, 0.58],
        ]
        for (let i = 0; i < count; i++) {
            const r     = 2.0 + Math.random() * 2.2
            const theta = Math.random() * Math.PI * 2
            const phi   = Math.random() * Math.PI
            pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
            pos[i*3+1] = r * Math.cos(phi)
            pos[i*3+2] = r * Math.sin(phi) * Math.sin(theta)
            const c = palette[Math.floor(Math.random() * palette.length)]
            col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2]
        }
        return { positions: pos, colors: col }
    })()

    useFrame(({ clock }) => {
        if (!pointsRef.current) return
        const t = clock.getElapsedTime()
        pointsRef.current.rotation.y = t * 0.10
        pointsRef.current.rotation.x = Math.sin(t * 0.025) * 0.12
        pointsRef.current.position.y = Math.sin(t * 0.4) * 0.3   // energy ascending
        pointsRef.current.rotation.z = mouse.current.x * 0.10
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.030} vertexColors transparent opacity={0.7} sizeAttenuation />
        </points>
    )
}

export function LlamaModel() {
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current = {
                x: (e.clientX / window.innerWidth)  * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            }
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0.2, 4], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.12} />
                <pointLight position={[2, 3, 2]}   intensity={0.9}  color="#00ffcc" />
                <pointLight position={[-2, 1, -1]} intensity={0.55} color="#7c3aed" />
                <pointLight position={[0, -1, 3]}  intensity={0.35} color="#00b4ff" />
                {/* Backlight from mountain/aurora direction */}
                <pointLight position={[0, 2, -3]}  intensity={0.4}  color="#00ffcc" />

                <AuroraParticles mouse={mouse} />

                <Suspense fallback={null}>
                    <LlamaInner mouse={mouse} />
                </Suspense>
            </Canvas>
        </div>
    )
}

useGLTF.preload('/Llama.glb')