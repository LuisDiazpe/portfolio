import { Suspense, useEffect, useRef, useCallback, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const AURORA_COLORS = [
    new THREE.Color('#00ffcc'),
    new THREE.Color('#00b4ff'),
    new THREE.Color('#7c3aed'),
]

// VERTEX SHADER
const vertShader = `
#include <common>
#include <skinning_pars_vertex>

varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
void main() {
  vUv = uv;
  #include <skinbase_vertex>
  #include <beginnormal_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  vNormal = normalize(transformedNormal);
  #include <begin_vertex>
  #include <skinning_vertex>
  vPosition = transformed;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}`

// FRAGMENT SHADER
const fragShader = `
varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
uniform float uTime; uniform float uMouseX; uniform float uMix;
uniform float uPulse; uniform float uHover;
uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.2);
  float wave1 = sin(vUv.y * 6.0 + uTime * 1.2) * 0.5 + 0.5;
  float wave2 = sin(vUv.y * 10.0 - uTime * 0.8 + vUv.x * 4.0) * 0.5 + 0.5;
  float wave  = mix(wave1, wave2, 0.4);
  vec3 col1   = mix(uColor1, uColor2, wave);
  vec3 col2   = mix(uColor2, uColor3, wave);
  vec3 aurora = mix(col1, col2, clamp(uMix + uMouseX * 0.4, 0.0, 1.0));
  float glow  = 1.0 + uPulse * 0.25 + uHover * 0.5;
  vec3 base   = vec3(0.04, 0.08, 0.14);
  gl_FragColor = vec4(base + aurora * fresnel * 2.4 * glow + aurora * wave * 0.18, 1.0);
}`

const A = {
    idle:     'AnimalArmature|Idle',
    idle2:    'AnimalArmature|Idle_2',
    headlow:  'AnimalArmature|Idle_Headlow',
    walk:     'AnimalArmature|Walk',
    gallop:   'AnimalArmature|Gallop',
    eating:   'AnimalArmature|Eating',
    hitL:     'AnimalArmature|Idle_HitReact_Left',
    hitR:     'AnimalArmature|Idle_HitReact_Right',
    headbutt: 'AnimalArmature|Attack_Headbutt',
    kick:     'AnimalArmature|Attack_Kick',
    death:    'AnimalArmature|Death',
    jump:     'AnimalArmature|Jump_toIdle'
}

type AKey = keyof typeof A
interface Mouse { x: number; y: number; vx: number; isDead: boolean; isAnimating: boolean; isActive: boolean }

function AlpacaInner({ mouse }: { mouse: React.MutableRefObject<Mouse> }) {
    const group   = useRef<THREE.Group>(null)
    const matRef  = useRef<THREE.ShaderMaterial | null>(null)
    const { scene, animations } = useGLTF('/Llama.glb')
    const { actions } = useAnimations(animations, group)

    const current   = useRef<AKey>('idle')
    const walkTimer = useRef(0)
    const rotY      = useRef(-2.4)
    const prevRY    = useRef(-2.4)

    const clickCount = useRef(0)
    const clickTimer = useRef<NodeJS.Timeout | null>(null)

    useMemo(() => {
        const box    = new THREE.Box3().setFromObject(scene)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        scene.position.set(-center.x, -center.y + size.y / 2, -center.z)
        scene.scale.setScalar(2.6 / Math.max(size.x, size.y, size.z))

        const mat = new THREE.ShaderMaterial({
            vertexShader: vertShader, fragmentShader: fragShader,
            uniforms: {
                uTime:   { value: 0 }, uMouseX: { value: 0 },
                uMix:    { value: 0 }, uPulse:  { value: 0 },
                uHover:  { value: 0 },
                uColor1: { value: AURORA_COLORS[0] },
                uColor2: { value: AURORA_COLORS[1] },
                uColor3: { value: AURORA_COLORS[2] },
            },
            transparent: true, side: THREE.DoubleSide,
        })
        scene.traverse((c: THREE.Object3D) => {
            if ((c as THREE.Mesh).isMesh) { (c as THREE.Mesh).material = mat; c.castShadow = true }
        })
        matRef.current = mat
    }, [scene])

    const play = useCallback((key: AKey, loop = true, speed = 1, onDone?: () => void, fadeTime = 0.3) => {
        const action = actions[A[key]]
        if (!action) return

        Object.values(actions).forEach(a => {
            if (a && a !== action) {
                a.fadeOut(fadeTime)
                setTimeout(() => a.stop(), fadeTime * 1000)
            }
        })

        action.reset()
        action.timeScale = speed
        action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1)

        if (!loop) {
            action.clampWhenFinished = true
            if (onDone) {
                // Cálculo seguro del tiempo para evitar bloqueos
                const durationMs = (action.getClip().duration / speed) * 1000
                setTimeout(onDone, durationMs - 50)
            }
        }

        action.fadeIn(fadeTime).play()
        current.current = key
    }, [actions])

    useEffect(() => {
        const timeout = setTimeout(() => { if (actions[A.walk]) play('walk') }, 100)
        return () => clearTimeout(timeout)
    }, [actions, play])

    const handleModelClick = (e: any) => {
        e.stopPropagation()
        if (mouse.current.isDead || mouse.current.isAnimating) return

        clickCount.current += 1
        if (clickTimer.current) clearTimeout(clickTimer.current)

        if (clickCount.current >= 3) {
            clickCount.current = 0
            mouse.current.isDead = true
            mouse.current.isAnimating = true

            play('death', false, 1.2, () => {
                setTimeout(() => {
                    play('jump', false, 1.2, () => {
                        mouse.current.isDead = false
                        mouse.current.isAnimating = false
                    }, 0.1)
                }, 2500)
            })
            return
        }

        const localPoint = group.current!.worldToLocal(e.point.clone())
        const isFront = localPoint.z > 0
        const atk = isFront ? 'headbutt' : 'kick'

        clickTimer.current = setTimeout(() => {
            if (!mouse.current.isDead && clickCount.current > 0) {
                mouse.current.isAnimating = true
                play(atk, false, 1.2, () => {
                    // Solo liberamos el estado. Dejamos que el useFrame decida si debe caminar o quedarse quieta
                    mouse.current.isAnimating = false
                })
            }
            clickCount.current = 0
        }, 300)
    }

    useFrame(({ clock }) => {
        const t  = clock.getElapsedTime()
        const mx = mouse.current.isActive ? mouse.current.x : 0
        const my = mouse.current.isActive ? mouse.current.y : 0
        const speedX = Math.abs(mouse.current.vx)
        const isDead = mouse.current.isDead
        const isAnimating = mouse.current.isAnimating

        mouse.current.vx *= 0.9

        let attention = 0
        if (mouse.current.isActive) {
            const distToMouse = Math.sqrt(mx * mx + (my + 0.3) ** 2)

            // RADAR AUMENTADO: Si entras a 0.85 empieza a mirar. Si pasas el 0.4 te presta total atención y se detiene.
            if (distToMouse < 0.4) attention = 1
            else if (distToMouse < 0.85) attention = 1 - ((distToMouse - 0.4) / 0.45)
        }

        // isFocused decide si ella "deja de caminar para verte".
        const isFocusedOnYou = attention > 0.5

        if (matRef.current) {
            const u = matRef.current.uniforms
            u.uTime.value    = t
            u.uMouseX.value += (mx * 0.35 - u.uMouseX.value) * 0.06
            u.uMix.value     = (Math.sin(t * 0.5) + 1) / 2
            u.uPulse.value   = (Math.sin(t * 1.1) + 1) / 2
            u.uHover.value  += (attention - u.uHover.value) * 0.08
        }

        if (!group.current) return

        let targetRY = prevRY.current
        let targetRX = 0

        if (isDead || isAnimating) {
            targetRY = prevRY.current
            targetRX = 0
        } else {
            const lookMountain = -2.4 + (mouse.current.isActive ? mx * 0.15 : 0)
            const lookMouse = mx * 1.2

            targetRY = THREE.MathUtils.lerp(lookMountain, lookMouse, attention)
            targetRX = THREE.MathUtils.lerp(0, -my * 0.7, attention)
        }

        rotY.current = THREE.MathUtils.lerp(rotY.current, targetRY, isFocusedOnYou ? 0.06 : 0.03)
        prevRY.current = rotY.current
        group.current.rotation.y = rotY.current

        if (isDead || isAnimating) {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.1)
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, 0.1)
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -1.6, 0.1)
        } else {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRX, 0.08)
            group.current.rotation.z = Math.sin(t * 0.55) * 0.018
            group.current.scale.y    = 1 + Math.sin(t * 1.1) * 0.015

            const isWalking = current.current === 'walk' || current.current === 'gallop'
            const bobbing = (!isFocusedOnYou && isWalking) ? Math.cos(walkTimer.current) * 0.03 : 0
            group.current.position.y += (-1.6 + bobbing + Math.sin(t * 0.75) * 0.04 - group.current.position.y) * 0.1
        }

        if (!isDead && !isAnimating) {
            const deltaAngle = Math.abs(targetRY - rotY.current)

            if (isFocusedOnYou) {
                if (deltaAngle > 0.35) {
                    if (current.current !== 'walk') play('walk', true, 1.2)
                } else if (deltaAngle < 0.15) {
                    if (current.current !== 'idle2') play('idle2', true, 1.0)
                }
            } else {
                const targetAnim = (speedX > 0.05 && mouse.current.isActive) ? 'gallop' : 'walk'
                if (current.current !== targetAnim) play(targetAnim, true, targetAnim === 'gallop' ? 1.5 : 1.0)
                walkTimer.current += current.current === 'gallop' ? 0.08 : 0.04
            }
        }
    })

    return (
        <group ref={group} position={[0, -1.6, 0]}>
            <primitive
                object={scene}
                onClick={handleModelClick}
                onPointerOver={() => { document.body.style.cursor = 'crosshair' }}
                onPointerOut={() => { document.body.style.cursor = 'auto' }}
            />
        </group>
    )
}

function AuroraParticles({ mouse }: { mouse: React.MutableRefObject<Mouse> }) {
    const ref = useRef<THREE.Points>(null)
    const { positions, colors } = (() => {
        const n = 180, pos = new Float32Array(n * 3), col = new Float32Array(n * 3)
        const pal = [[0,1,0.8],[0,0.71,1],[0.49,0.23,0.93],[0.05,0.45,0.58]]
        for (let i = 0; i < n; i++) {
            const r = 2.0 + Math.random() * 2.2
            const th = Math.random() * Math.PI * 2
            const ph = Math.random() * Math.PI
            pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.cos(ph); pos[i*3+2]=r*Math.sin(ph)*Math.sin(th)
            const c = pal[Math.floor(Math.random() * pal.length)]
            col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2]
        }
        return { positions: pos, colors: col }
    })()

    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.getElapsedTime()
        ref.current.rotation.y = t * 0.10
        ref.current.rotation.x = Math.sin(t * 0.025) * 0.12
        ref.current.position.y = Math.sin(t * 0.4) * 0.28
        ref.current.rotation.z = mouse.current.isActive ? (mouse.current.x * 0.07) : 0
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.026} vertexColors transparent opacity={0.6} sizeAttenuation />
        </points>
    )
}

export function LlamaModel() {
    const mouse = useRef<Mouse>({ x: 0, y: 0, vx: 0, isDead: false, isAnimating: false, isActive: false })

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1
            const ny = -(e.clientY / window.innerHeight) * 2 + 1

            if (!mouse.current.isActive) {
                mouse.current.vx = 0
                mouse.current.isActive = true
            } else {
                mouse.current.vx = nx - mouse.current.x
            }

            mouse.current.x  = nx
            mouse.current.y  = ny
        }

        const onLeave = () => {
            mouse.current.isActive = false
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0.3, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.12} />
                <pointLight position={[2, 3, 2]}   intensity={0.9}  color="#00ffcc" />
                <pointLight position={[-2, 1, -1]} intensity={0.55} color="#7c3aed" />
                <pointLight position={[0, -1, 3]}  intensity={0.35} color="#00b4ff" />
                <pointLight position={[0, 2, -3]}  intensity={0.4}  color="#00ffcc" />

                <AuroraParticles mouse={mouse} />

                <Suspense fallback={null}>
                    <AlpacaInner mouse={mouse} />
                </Suspense>
            </Canvas>
        </div>
    )
}

useGLTF.preload('/Llama.glb')