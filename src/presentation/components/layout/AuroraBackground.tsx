import { motion } from 'framer-motion'

const layers = [
  { color: '#00ffcc', w: 700, h: 280, top: -120, left: -200, delay: 0 },
  { color: '#00b4ff', w: 600, h: 240, top: '18%', right: -150, delay: -7 },
  { color: '#7c3aed', w: 800, h: 200, bottom: '28%', left: -80,  delay: -14 },
  { color: '#0e7490', w: 500, h: 200, top: '8%',  left: '30%',  delay: -3 },
  { color: '#00ffcc', w: 400, h: 180, bottom: '10%', right: '15%', delay: -10 },
]

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Noise grain */}
      <div className="noise-overlay" />

      {/* Aurora layers */}
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="aurora-layer"
          style={{
            width:  l.w,
            height: l.h,
            background: l.color,
            top:    l.top,
            left:   ('left' in l ? l.left : undefined),
            right:  ('right' in l ? l.right : undefined),
            bottom: ('bottom' in l ? l.bottom : undefined),
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            delay: l.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle radial at center-top for depth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 0%, #00b4ff22 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
