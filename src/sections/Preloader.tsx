import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true)
      setTimeout(() => setVisible(false), 600)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        backgroundColor: '#0b0b0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: '18px',
            fontWeight: 500,
            letterSpacing: '0.35em',
            color: '#ffffff',
            animation: 'preloaderPulse 1.5s ease-in-out infinite',
          }}
        >
          HOTEL BISTA
        </p>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '12px',
            textTransform: 'uppercase',
          }}
        >
          Nepalgunj · Nepal
        </p>
      </div>

      <style>{`
        @keyframes preloaderPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
