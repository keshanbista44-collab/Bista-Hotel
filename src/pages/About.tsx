import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '50+', label: 'Luxury Rooms' },
  { number: '10K+', label: 'Happy Guests' },
  { number: '4.9', label: 'Guest Rating' },
  { number: '24/7', label: 'Room Service' },
]

const features = [
  {
    title: 'Prime Location',
    description: 'Located at Trafick Chowk in the heart of Nepalgunj, with easy access to the airport, bus station, and major attractions.',
    icon: '📍',
  },
  {
    title: 'Luxury Accommodation',
    description: 'From our Standard Rooms to the Presidential Suite, every room is designed with comfort, elegance, and modern amenities.',
    icon: '🏨',
  },
  {
    title: 'Fine Dining',
    description: 'Our restaurant serves authentic Nepalese cuisine alongside international dishes, prepared by master chefs.',
    icon: '🍽️',
  },
  {
    title: 'Wellness & Spa',
    description: 'Rejuvenate at our spa with traditional Ayurvedic treatments, or unwind by our temperature-controlled pool.',
    icon: '💆',
  },
  {
    title: 'Event Facilities',
    description: 'Our banquet hall accommodates up to 200 guests — perfect for weddings, conferences, and celebrations.',
    icon: '🎉',
  },
  {
    title: 'Warm Hospitality',
    description: 'Experience the legendary warmth of Nepalese hospitality with our attentive 24/7 staff.',
    icon: '🙏',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.about-stat', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.about-feature', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.about-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-hero-image',
          start: 'top 80%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

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
          Our Story
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
          About Hotel Bista
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          A beacon of luxury in the heart of Nepalgunj, where traditional Nepalese warmth
          meets world-class hospitality.
        </p>
      </div>

      <section ref={sectionRef}>
        {/* Story Section */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '100px clamp(20px, 4vw, 60px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.24em',
                  color: '#666666',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                Since 2015
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '24px',
                }}
              >
                Where Every Stay Becomes a Memory
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#333333',
                  marginBottom: '20px',
                }}
              >
                Hotel Bista was founded with a simple vision: to bring world-class hospitality
                to the heart of Nepalgunj. Located at Trafick Chowk, our hotel has become the
                preferred destination for travelers seeking luxury, comfort, and authentic
                Nepalese warmth.
              </p>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#333333',
                  marginBottom: '20px',
                }}
              >
                From our meticulously designed rooms to our award-winning restaurant, every
                detail reflects our commitment to excellence. Whether you're visiting for
                business or leisure, our dedicated team ensures your stay is nothing short
                of extraordinary.
              </p>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#333333',
                }}
              >
                With over 50 luxury rooms, a fine dining restaurant, spa and wellness center,
                swimming pool, and state-of-the-art conference facilities, Hotel Bista stands
                as the premier luxury hotel in Banke district.
              </p>
            </div>

            <div className="about-hero-image" style={{ overflow: 'hidden' }}>
              <img
                src="/images/hotel-exterior.jpg"
                alt="Hotel Bista Exterior"
                className="about-image"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="stats-section"
          style={{
            backgroundColor: '#0b0b0b',
            color: '#ffffff',
            padding: '80px clamp(20px, 4vw, 60px)',
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '40px',
              textAlign: 'center',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <p
                  style={{
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div
          className="features-section"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '100px clamp(20px, 4vw, 60px)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Why Choose Us
            </p>
            <h2
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              The Hotel Bista Experience
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '32px',
            }}
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="about-feature"
                style={{
                  padding: '32px',
                  border: '1px solid #e5e5e5',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#000000')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
              >
                <p style={{ fontSize: '32px', marginBottom: '16px' }}>{feature.icon}</p>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    marginBottom: '12px',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#666666',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            backgroundColor: '#f4f4f5',
            padding: '100px clamp(20px, 4vw, 60px)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Ready to Experience Luxury?
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#666666',
              maxWidth: '500px',
              margin: '0 auto 32px',
            }}
          >
            Book your stay at Hotel Bista and discover why we're the premier luxury
            hotel in Nepalgunj.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/rooms"
              style={{
                padding: '16px 36px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: '#ffffff',
                backgroundColor: '#000000',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              View Rooms
            </Link>
            <Link
              to="/contact"
              style={{
                padding: '16px 36px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: '#000000',
                backgroundColor: 'transparent',
                border: '1px solid #000000',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
