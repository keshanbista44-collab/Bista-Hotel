import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { rooms } from '../data/rooms'

gsap.registerPlugin(ScrollTrigger)

const acFilters = ['All', 'AC', 'Non-AC']

export default function RoomsList() {
  const sectionRef = useRef<HTMLElement>(null)
  const [acFilter, setAcFilter] = useState('All')

  const filteredRooms = acFilter === 'All'
    ? rooms
    : rooms.filter(room => {
        if (acFilter === 'AC') return room.acType === 'ac' || room.acType === 'both'
        return room.acType === 'non-ac' || room.acType === 'both'
      })

  useEffect(() => {
    window.scrollTo(0, 0)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.room-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [acFilter])

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '88px' }}>
      {/* Hero Header */}
      <div
        style={{
          backgroundColor: '#0b0b0b',
          color: '#ffffff',
          padding: '80px clamp(20px, 4vw, 60px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Accommodation
        </p>
        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          Our Rooms & Suites
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Choose from our selection of carefully curated rooms and suites, each designed
          for maximum comfort and luxury.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '40px clamp(20px, 4vw, 60px)',
        }}
      >
        {acFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setAcFilter(filter)}
            style={{
              padding: '10px 24px',
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              border: acFilter === filter ? '1px solid #000000' : '1px solid #e5e5e5',
              backgroundColor: acFilter === filter ? '#000000' : '#ffffff',
              color: acFilter === filter ? '#ffffff' : '#000000',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            {filter === 'All' ? 'All Rooms' : filter === 'AC' ? 'Air Conditioned' : 'Non-AC'}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <section
        ref={sectionRef}
        style={{
          maxWidth: '1560px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 60px) 120px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: '24px',
          }}
        >
          {filteredRooms.map((room) => (
            <Link
              key={room.id}
              to={`/rooms/${room.id}`}
              className="room-card"
              style={{
                border: '1px solid #000000',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '60%',
                  overflow: 'hidden',
                  backgroundColor: '#e5e5e5',
                }}
              >
                <img
                  src={room.img}
                  alt={room.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {room.acType === 'ac' ? 'AC' : room.acType === 'non-ac' ? 'Non-AC' : 'AC / Non-AC'}
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: '#666666',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {room.id} · {room.client}
                </p>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 500,
                    color: '#000000',
                    letterSpacing: '-0.01em',
                    marginBottom: '8px',
                  }}
                >
                  {room.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#666666',
                    marginBottom: '16px',
                  }}
                >
                  {room.tagline}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #e5e5e5',
                    paddingTop: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 500,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {room.price}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.14em',
                      color: '#000000',
                      textTransform: 'uppercase',
                    }}
                  >
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
