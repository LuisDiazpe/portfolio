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

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener('resize', resize)

        const stars = Array.from({ length: 220 }).map((_) => ({
            x: Math.random(),
            y: Math.random() * 0.65,
            size: Math.random() * 1.4 + 0.2,
            phase: Math.random() * Math.PI * 2,
        }))

        const draw = () => {
            t += 0.003
            const W = canvas.width
            const H = canvas.height

            ctx.clearRect(0, 0, W, H)

            const sky = ctx.createLinearGradient(0, 0, 0, H)
            sky.addColorStop(0, '#02060a')
            sky.addColorStop(0.4, '#030a12')
            sky.addColorStop(1, '#040814')
            ctx.fillStyle = sky
            ctx.fillRect(0, 0, W, H)

            stars.forEach(s => {
                const x = s.x * W
                const y = s.y * H

                const twinkle = 0.5 + 0.5 * Math.sin(t * 2 + s.phase)

                ctx.beginPath()
                ctx.arc(x, y, s.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(200,220,255,${twinkle})`
                ctx.fill()
            })

            const auroraTop = H * 0.05
            const auroraBottom = H * 0.6

            const curtains = [
                { x: 0.2, width: 0.3, color: [0, 255, 200], speed: 0.4 },
                { x: 0.5, width: 0.4, color: [0, 180, 255], speed: 0.3 },
                { x: 0.7, width: 0.3, color: [120, 60, 255], speed: 0.5 },
            ]

            curtains.forEach(c => {
                const cx = c.x * W
                const cw = c.width * W

                const rays = 25

                for (let i = 0; i < rays; i++) {
                    const x = cx + (i / rays) * cw

                    // movimiento ondulado vertical
                    const wave =
                        Math.sin(t * c.speed + i * 0.3) * 40 +
                        Math.sin(t * 0.5 + i * 0.15) * 20

                    const alpha =
                        0.05 +
                        0.07 *
                        (Math.sin(t * c.speed + i * 0.5) * 0.5 + 0.5)

                    const grad = ctx.createLinearGradient(
                        x,
                        auroraTop,
                        x,
                        auroraBottom
                    )

                    grad.addColorStop(0, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},0)`)
                    grad.addColorStop(0.2, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},${alpha})`)
                    grad.addColorStop(0.6, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},${alpha * 0.6})`)
                    grad.addColorStop(1, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},0)`)

                    ctx.fillStyle = grad

                    ctx.fillRect(
                        x + wave,
                        auroraTop,
                        10,
                        auroraBottom - auroraTop
                    )
                }
            })


            const glow = ctx.createRadialGradient(
                W / 2,
                H * 0.4,
                0,
                W / 2,
                H * 0.4,
                H * 0.6
            )
            glow.addColorStop(0, 'rgba(0,255,200,0.06)')
            glow.addColorStop(0.5, 'rgba(0,180,255,0.04)')
            glow.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = glow
            ctx.fillRect(0, 0, W, H)


            drawMountains(ctx, W, H)


            const fog = ctx.createLinearGradient(0, H * 0.7, 0, H)
            fog.addColorStop(0, 'rgba(0,20,40,0)')
            fog.addColorStop(1, 'rgba(0,10,25,0.9)')
            ctx.fillStyle = fog
            ctx.fillRect(0, H * 0.7, W, H * 0.3)

            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    )
}


function drawMountains(ctx: CanvasRenderingContext2D, W: number, H: number) {
    const layers = [
        { y: 0.75, color: 'rgba(10,20,40,0.5)', amp: 60 },
        { y: 0.8, color: 'rgba(5,15,30,0.7)', amp: 90 },
        { y: 0.85, color: 'rgba(3,10,20,0.95)', amp: 120 },
    ]

    layers.forEach(layer => {
        ctx.beginPath()
        ctx.moveTo(0, H)

        for (let x = 0; x <= W; x += 10) {
            const y =
                H * layer.y -
                Math.sin(x * 0.01) * layer.amp -
                Math.sin(x * 0.02) * layer.amp * 0.5
            ctx.lineTo(x, y)
        }

        ctx.lineTo(W, H)
        ctx.closePath()

        ctx.fillStyle = layer.color
        ctx.fill()
    })
}