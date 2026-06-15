import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #000000',
        padding: '80px clamp(20px, 4vw, 60px) 0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Top: Office Info */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '80px',
        }}
      >
        <OfficeColumn
          city="Nepalgunj"
          cityEn="NEPALGUNJ"
          address="Trafick Chowk, Nepalgunj-21, Banke, Lumbini Province"
          coords="28.0500° N, 81.6167° E"
          timezone="UTC+5:45"
        />
        <OfficeColumn
          city="Kathmandu"
          cityEn="HEAD OFFICE"
          address="Thamel, Kathmandu, Bagmati Province, Nepal"
          coords="27.7172° N, 85.3240° E"
          timezone="UTC+5:45"
        />
        <OfficeColumn
          city="Pokhara"
          cityEn="BRANCH OFFICE"
          address="Lakeside, Pokhara, Gandaki Province, Nepal"
          coords="28.2096° N, 83.9856° E"
          timezone="UTC+5:45"
        />
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: '#000000',
              marginBottom: '20px',
            }}
          >
            CONTACT
          </p>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: 2 }}>
            <a href="mailto:keshanbista44@gmail.com" style={{ color: '#666666', textDecoration: 'none' }}>
              keshanbista44@gmail.com
            </a>
            <br />
            <a href="tel:9744762651" style={{ color: '#666666', textDecoration: 'none' }}>
              +977 9744762651
            </a>
            <br />
            <a href="tel:081520120" style={{ color: '#666666', textDecoration: 'none' }}>
              081-520120
            </a>
            <br />
            <Link to="/contact" style={{ color: '#000000', textDecoration: 'underline' }}>
              Send us a message →
            </Link>
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid #e5e5e5',
          padding: '40px 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {['Home', 'Rooms', 'Gallery', 'About', 'Contact'].map((item) => (
          <Link
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              color: '#666666',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Bottom: Giant Wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.85,
          paddingBottom: '0',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(80px, 18vw, 320px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: '#000000',
            whiteSpace: 'nowrap',
            transform: 'translateY(15%)',
            userSelect: 'none',
          }}
        >
          HOTEL BISTA
        </span>
      </div>
    </footer>
  )
}

function OfficeColumn({
  city,
  cityEn,
  address,
  coords,
  timezone,
}: {
  city: string
  cityEn: string
  address: string
  coords: string
  timezone: string
}) {
  return (
    <div>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: '#000000',
          marginBottom: '20px',
        }}
      >
        {cityEn}
      </p>
      <p style={{ fontSize: '16px', fontWeight: 500, color: '#000000', marginBottom: '8px' }}>
        {city}
      </p>
      <p
        style={{
          fontSize: '14px',
          color: '#666666',
          lineHeight: 1.6,
          marginBottom: '12px',
          maxWidth: '260px',
        }}
      >
        {address}
      </p>
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.05em',
          color: '#666666',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {coords}
        <br />
        {timezone}
      </p>
    </div>
  )
}
