'use client'

import { useEffect, useRef } from 'react'

export function AuroraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId: number
        let t = 0
        let mouseX = 0
        let mouseY = 0
        let targetMouseX = 0
        let targetMouseY = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener('resize', resize)

        const onMouseMove = (e: MouseEvent) => {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
            targetMouseY = (e.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', onMouseMove)

        const stars = Array.from({ length: 220 }).map(() => ({
            x: Math.random(),
            y: Math.random() * 0.65,
            size: Math.random() * 1.4 + 0.2,
            phase: Math.random() * Math.PI * 2,
            depth: Math.random() * 0.5 + 0.1
        }))

        const draw = () => {
            t += 0.003
            const W = canvas.width
            const H = canvas.height

            mouseX += (targetMouseX - mouseX) * 0.05
            mouseY += (targetMouseY - mouseY) * 0.05

            // CIELO NOCTURNO
            ctx.globalCompositeOperation = 'source-over'
            ctx.clearRect(0, 0, W, H)
            const sky = ctx.createLinearGradient(0, 0, 0, H)
            sky.addColorStop(0, '#02060a')
            sky.addColorStop(0.4, '#030a12')
            sky.addColorStop(1, '#081220')
            ctx.fillStyle = sky
            ctx.fillRect(0, 0, W, H)

            // ESTRELLAS
            stars.forEach(s => {
                const pX = mouseX * (W * 0.02 * s.depth)
                const pY = mouseY * (H * 0.02 * s.depth)
                let x = (s.x * W) - pX
                let y = (s.y * H) - pY

                if (x < 0) x += W; if (x > W) x -= W;
                if (y < 0) y += H; if (y > H) y -= H;

                const twinkle = 0.5 + 0.5 * Math.sin(t * 3 + s.phase)
                ctx.beginPath()
                ctx.arc(x, y, s.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(200,220,255,${twinkle})`
                ctx.fill()
            })

            // AURORAS
            ctx.globalCompositeOperation = 'screen'
            const auroraTop = 0
            const auroraBottom = H * 0.55

            const curtains = [
                { x: 0.3, width: 0.6, color: '0, 255, 200', speed: 0.4, freq: 0.3 },
                { x: 0.5, width: 0.7, color: '0, 180, 255', speed: 0.3, freq: 0.2 },
                { x: 0.7, width: 0.5, color: '120, 60, 255', speed: 0.5, freq: 0.4 },
            ]

            curtains.forEach(c => {
                const cx = c.x * W
                const cw = c.width * W
                const rays = 80

                for (let i = 0; i < rays; i++) {
                    const progress = i / rays
                    const x = cx - (cw/2) + progress * cw + (mouseX * 50)

                    const wave = Math.sin(t * c.speed + progress * Math.PI * 4) * 50 + Math.sin(t * 0.2 + progress * Math.PI * 2) * 30
                    const edgeFade = Math.sin(progress * Math.PI)
                    const pulse = 0.5 + 0.5 * Math.sin(t * c.speed + progress * Math.PI * 6)
                    const finalAlpha = edgeFade * pulse * 0.08

                    if (finalAlpha > 0.001) {
                        const grad = ctx.createLinearGradient(x, auroraTop, x, auroraBottom)
                        grad.addColorStop(0, `rgba(${c.color}, 0)`)
                        grad.addColorStop(0.4, `rgba(${c.color}, ${finalAlpha * 1.2})`)
                        grad.addColorStop(0.8, `rgba(${c.color}, ${finalAlpha * 0.5})`)
                        grad.addColorStop(1, `rgba(${c.color}, 0)`)

                        ctx.fillStyle = grad
                        ctx.fillRect(x + wave, auroraTop, W * 0.015, auroraBottom - auroraTop)
                    }
                }
            })

            // MONTAÑAS (Con colores más vivos para la base)
            ctx.globalCompositeOperation = 'source-over'
            drawMountains(ctx, W, H, mouseX, mouseY)

            // NEBLINA / "SUELO" - Más claro para dar ilusión de terreno
            const fog = ctx.createLinearGradient(0, H * 0.55, 0, H)
            fog.addColorStop(0, 'rgba(6, 18, 36, 0)')
            fog.addColorStop(0.4, 'rgba(6, 18, 36, 0.8)')
            fog.addColorStop(1, 'rgba(6, 18, 36, 1)')
            ctx.fillStyle = fog
            ctx.fillRect(0, H * 0.55, W, H * 0.45)

            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
        />
    )
}

function drawMountains(ctx: CanvasRenderingContext2D, W: number, H: number, mouseX: number, mouseY: number) {
    const layers = [
        // Colores de roca aclarados sutilmente para que no se fundan con el negro absoluto
        { y: 0.45, rockColor: '#0f203b', snowColor: '#6e98c4', freq: 0.004, amp: 140, detailFreq: 0.02, detailAmp: 12, p: 15 },
        { y: 0.55, rockColor: '#0a162b', snowColor: '#4a72a0', freq: 0.003, amp: 170, detailFreq: 0.025, detailAmp: 18, p: 30 },
        { y: 0.68, rockColor: '#050b14', snowColor: '#244061', freq: 0.005, amp: 100, detailFreq: 0.03, detailAmp: 10, p: 50 },
    ]

    layers.forEach((layer, i) => {
        ctx.beginPath()
        ctx.moveTo(0, H)

        const pX = mouseX * layer.p
        const pY = mouseY * (layer.p * 0.5)

        let highestPoint = H
        const points = []

        for (let x = 0; x <= W + 10; x += 5) {
            const globalX = x - pX
            const mainPeak = Math.abs(Math.sin((globalX + i * 300) * layer.freq)) * layer.amp
            const secondaryPeak = Math.abs(Math.cos((globalX + i * 150) * (layer.freq * 2))) * (layer.amp * 0.4)
            const detail = Math.sin(globalX * layer.detailFreq) * layer.detailAmp

            const y = H * layer.y - mainPeak - secondaryPeak + detail + pY
            if (y < highestPoint) highestPoint = y

            points.push({x, y})
            ctx.lineTo(x, y)
        }

        ctx.lineTo(W, H)
        ctx.closePath()

        const mountainGrad = ctx.createLinearGradient(0, highestPoint, 0, H * layer.y)
        mountainGrad.addColorStop(0, layer.snowColor)
        mountainGrad.addColorStop(0.35, layer.rockColor)
        mountainGrad.addColorStop(1, layer.rockColor)

        ctx.fillStyle = mountainGrad
        ctx.fill()
    })
}