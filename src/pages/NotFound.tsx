import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b0b0b',
        color: '#ffffff',
        flexDirection: 'column',
        gap: '24px',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(60px, 12vw, 160px)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px, 2vw, 22px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '400px',
        }}
      >
        The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '16px',
          padding: '16px 36px',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          color: '#ffffff',
          border: '1px solid #ffffff',
          textDecoration: 'none',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease',
          fontFamily: '"Helvetica Neue", sans-serif',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff'
          e.currentTarget.style.color = '#0b0b0b'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = '#ffffff'
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}
