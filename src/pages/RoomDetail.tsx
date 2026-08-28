import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router'
import { rooms } from '../data/rooms'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'
import gsap from 'gsap'

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL
  const appID = import.meta.env.VITE_APP_ID
  const redirectUri = `${window.location.origin}/api/oauth/callback`
  const state = btoa(redirectUri)

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`)
  url.searchParams.set('client_id', appID)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'profile')
  url.searchParams.set('state', state)

  return url.toString()
}

export default function RoomDetail() {
  const { roomId } = useParams<{ roomId: string }>()
  const room = rooms.find((r) => r.id === roomId)
  const [hovered, setHovered] = useState(false)
  const [reserveStatus, setReserveStatus] = useState<'idle' | 'reserved'>('idle')
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [availabilityResult, setAvailabilityResult] = useState<'available' | 'unavailable' | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { user, isLoading: authLoading } = useAuth()
  const sectionRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: '2',
    children: '0',
    acPreference: 'ac',
    phone: '',
    message: '',
  })

  const createReservation = trpc.reservation.create.useMutation({
    onSuccess: () => {
      setReserveStatus('reserved')
    },
    onError: (err) => {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    },
  })

  const checkAvailabilityMutation = trpc.reservation.checkAvailability.useMutation({
    onSuccess: (data) => {
      setCheckingAvailability(false)
      setAvailabilityResult(data.available ? 'available' : 'unavailable')
    },
    onError: () => {
      setCheckingAvailability(false)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'checkInDate' || e.target.name === 'checkOutDate') {
      setAvailabilityResult(null)
    }
  }

  const handleCheckAvailability = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !room) return
    setCheckingAvailability(true)
    setSubmitError(null)
    checkAvailabilityMutation.mutate({
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      roomType: room.title,
    })
  }

  const handleReserve = () => {
    if (!room) return
    if (!formData.checkInDate || !formData.checkOutDate) {
      setSubmitError('Please select check-in and check-out dates.')
      return
    }
    if (!formData.phone) {
      setSubmitError('Please enter your phone number.')
      return
    }

    createReservation.mutate({
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      guests: formData.guests,
      children: parseInt(formData.children),
      roomType: room.title,
      roomId: room.id,
      acPreference: formData.acPreference as 'ac' | 'non-ac',
      fullName: user?.name || 'Guest',
      email: user?.email || 'guest@hotelbista.com',
      phone: formData.phone,
      message: formData.message || undefined,
      userId: user?.id,
    })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.room-detail-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      gsap.from('.booking-panel', {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [roomId])

  if (!room) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          color: '#000000',
          flexDirection: 'column',
          gap: '20px',
          paddingTop: '88px',
        }}
      >
        <p style={{ fontSize: '20px' }}>Room not found.</p>
        <Link
          to="/rooms"
          style={{
            fontSize: '13px',
            letterSpacing: '0.14em',
            padding: '14px 32px',
            border: '1px solid #000',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            textTransform: 'uppercase',
            color: '#000000',
            textDecoration: 'none',
          }}
        >
          ← Back to rooms
        </Link>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div ref={sectionRef} style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '0' }}>
      {/* Hero image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(400px, 70vh, 720px)',
          overflow: 'hidden',
          backgroundColor: '#0b0b0b',
        }}
      >
        <img
          src={room.img}
          alt={room.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <Link
          to="/rooms"
          style={{
            position: 'absolute',
            top: 'clamp(100px, 14vh, 140px)',
            left: 'clamp(24px, 4vw, 60px)',
            fontSize: '12px',
            letterSpacing: '0.16em',
            padding: '12px 24px',
            border: '1px solid #ffffff',
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: '#ffffff',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue", sans-serif',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            textDecoration: 'none',
            zIndex: 10,
          }}
        >
          ← Back
        </Link>
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(32px, 5vw, 60px)',
            left: 'clamp(24px, 4vw, 60px)',
            right: 'clamp(24px, 4vw, 60px)',
            color: '#ffffff',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.8,
              marginBottom: '12px',
            }}
          >
            Room {room.id} · {room.client}
          </p>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {room.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div
        className="room-detail-content"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '80px clamp(24px, 4vw, 60px) 120px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(40px, 5vw, 80px)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: description + features */}
        <div style={{ flex: '2 1 600px', minWidth: 0 }}>
          <p
            style={{
              fontSize: 'clamp(20px, 2.2vw, 30px)',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '-0.015em',
              color: '#000000',
              marginBottom: '48px',
              maxWidth: '680px',
            }}
          >
            {room.tagline}
          </p>

          {room.description.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: '#333333',
                marginBottom: '24px',
                maxWidth: '680px',
              }}
            >
              {p}
            </p>
          ))}

          <div
            style={{
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid #1a1a1a',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: '#000000',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              Room Features
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '14px 40px',
              }}
            >
              {room.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#333333',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '12px',
                      width: '8px',
                      height: '1px',
                      backgroundColor: '#000000',
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: booking panel */}
        <aside
          className="booking-panel"
          style={{
            flex: '1 1 320px',
            minWidth: 0,
            position: 'sticky',
            top: '112px',
            border: '1px solid #000000',
            padding: '32px 28px',
            backgroundColor: '#ffffff',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#666666',
              marginBottom: '12px',
            }}
          >
            From
          </p>
          <p
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#000000',
              marginBottom: '6px',
            }}
          >
            {room.price}
          </p>
          <p
            style={{
              fontSize: '13px',
              color: '#666666',
              lineHeight: 1.5,
              marginBottom: '28px',
            }}
          >
            {room.priceNote}
          </p>

          <dl
            style={{
              borderTop: '1px solid #e5e5e5',
              borderBottom: '1px solid #e5e5e5',
              padding: '16px 0',
              margin: '0 0 28px',
              display: 'grid',
              gap: '10px',
            }}
          >
            <DetailRow k="Size" v={room.sqm} />
            <DetailRow k="Occupancy" v={room.occupancy} />
            <DetailRow k="Bed" v={room.bed} />
            <DetailRow k="AC Type" v={room.acType === 'ac' ? 'Air Conditioned' : room.acType === 'non-ac' ? 'Non-AC' : 'AC / Non-AC'} />
            <DetailRow k="Max Children" v={`${room.maxChildren}`} />
          </dl>

          {reserveStatus === 'reserved' ? (
            <div
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#1a6b3a',
                backgroundColor: '#e8f5e9',
                border: '1px solid #1a6b3a',
                textAlign: 'center',
              }}
            >
              Reservation submitted successfully! Our team will contact you at {formData.phone || 'your provided number'} shortly.
            </div>
          ) : (
            <>
              {submitError && (
                <div
                  style={{
                    border: '1px solid rgba(255,100,100,0.5)',
                    padding: '12px 16px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: 'rgba(200,50,50,0.9)',
                    marginBottom: '16px',
                  }}
                >
                  {submitError}
                </div>
              )}

              {availabilityResult === 'available' && (
                <div
                  style={{
                    border: '1px solid rgba(100,255,100,0.5)',
                    padding: '12px 16px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: '#1a6b3a',
                    backgroundColor: '#e8f5e9',
                    marginBottom: '16px',
                  }}
                >
                  ✓ Room is available for selected dates!
                </div>
              )}

              {availabilityResult === 'unavailable' && (
                <div
                  style={{
                    border: '1px solid rgba(255,200,50,0.5)',
                    padding: '12px 16px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: '#8a6d0b',
                    backgroundColor: '#fffbe6',
                    marginBottom: '16px',
                  }}
                >
                  ⚠ Not available for these dates. Try different dates.
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                    Check-in
                  </span>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    min={today}
                    style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit' }}
                  />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                    Check-out
                  </span>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    min={formData.checkInDate || today}
                    style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit' }}
                  />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <label style={{ display: 'block' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                      Guests
                    </span>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit' }}
                    >
                      {['1', '2', '3', '4', '5', '6'].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                      Children
                    </span>
                    <select
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit' }}
                    >
                      {Array.from({ length: room.maxChildren + 1 }, (_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                    AC Preference
                  </span>
                  <select
                    name="acPreference"
                    value={formData.acPreference}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit' }}
                  >
                    <option value="ac">Air Conditioned</option>
                    <option value="non-ac">Non-AC</option>
                  </select>
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9744762651"
                    style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit' }}
                  />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                    Special Requests
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any special requests..."
                    rows={2}
                    style={{ width: '100%', padding: '10px 0', fontSize: '14px', border: 'none', borderBottom: '1px solid #e5e5e5', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </label>
              </div>

              <button
                onClick={handleCheckAvailability}
                disabled={checkingAvailability}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: '#000000',
                  backgroundColor: '#f4f4f5',
                  border: '1px solid #e5e5e5',
                  cursor: checkingAvailability ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  opacity: checkingAvailability ? 0.6 : 1,
                  marginBottom: '12px',
                }}
              >
                {checkingAvailability ? 'Checking...' : 'Check Availability'}
              </button>

              <button
                onClick={handleReserve}
                disabled={createReservation.isPending || authLoading}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  width: '100%',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  color: hovered ? '#ffffff' : '#000000',
                  backgroundColor: hovered ? '#000000' : '#ffffff',
                  border: '1px solid #000000',
                  padding: '16px 24px',
                  cursor: (createReservation.isPending || authLoading) ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  opacity: (createReservation.isPending || authLoading) ? 0.6 : 1,
                }}
              >
                {createReservation.isPending ? 'Submitting...' : 'Reserve This Room'}
              </button>
            </>
          )}
          <Link
            to="/rooms"
            style={{
              width: '100%',
              display: 'block',
              textAlign: 'center',
              marginTop: '14px',
              fontSize: '12px',
              letterSpacing: '0.14em',
              color: '#666666',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
              textDecoration: 'none',
            }}
          >
            ← Back to rooms
          </Link>
        </aside>
      </div>
    </div>
  )
}

function DetailRow({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#333333',
      }}
    >
      <dt style={{ color: '#666666' }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 500, color: '#000000' }}>{v}</dd>
    </div>
  )
}
