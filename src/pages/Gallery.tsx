import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/hotel-exterior.jpg', title: 'Hotel Exterior', category: 'Architecture' },
  { src: '/images/hotel-lobby.jpg', title: 'Grand Lobby', category: 'Interior' },
  { src: '/images/hotel-restaurant.jpg', title: 'Fine Dining', category: 'Dining' },
  { src: '/images/hotel-pool.jpg', title: 'Swimming Pool', category: 'Amenities' },
  { src: '/images/hotel-spa.jpg', title: 'Spa & Wellness', category: 'Wellness' },
  { src: '/images/gallery-garden.jpg', title: 'Garden Courtyard', category: 'Exterior' },
  { src: '/images/gallery-banquet.jpg', title: 'Banquet Hall', category: 'Events' },
  { src: '/images/gallery-rooftop.jpg', title: 'Rooftop Lounge', category: 'Dining' },
  { src: '/images/gallery-gym.jpg', title: 'Fitness Center', category: 'Amenities' },
  { src: '/images/room-deluxe-suite.jpg', title: 'Deluxe Suite', category: 'Rooms' },
  { src: '/images/room-presidential.jpg', title: 'Presidential Suite', category: 'Rooms' },
  { src: '/images/room-honeymoon.jpg', title: 'Honeymoon Suite', category: 'Rooms' },
]

const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [activeCategory])

  useEffect(() => {
    window.scrollTo(0, 0)
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
          Visual Journey
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
          Our Gallery
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
          Explore the beauty and elegance of Hotel Bista through our curated collection of images.
        </p>
      </div>

      {/* Category Filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '40px clamp(20px, 4vw, 60px)',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 24px',
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              border: activeCategory === cat ? '1px solid #000000' : '1px solid #e5e5e5',
              backgroundColor: activeCategory === cat ? '#000000' : '#ffffff',
              color: activeCategory === cat ? '#ffffff' : '#000000',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <section
        ref={sectionRef}
        style={{
          padding: '0 clamp(20px, 4vw, 60px) 80px',
          maxWidth: '1560px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '16px',
          }}
        >
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="gallery-item"
              onClick={() => setLightboxImage(image.src)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: index % 3 === 0 ? '4/3' : '3/2',
              }}
            >
              <img
                src={image.src}
                alt={image.title}
                style={{
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
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '40px 16px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {image.category}
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <div
        style={{
          padding: '0 clamp(20px, 4vw, 60px) 120px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: '#666666',
            textTransform: 'uppercase',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Experience Hotel Bista
        </p>
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%',
            overflow: 'hidden',
            backgroundColor: '#0b0b0b',
          }}
        >
          <video
            src="/videos/hero-hotel.mp4"
            muted
            loop
            playsInline
            autoPlay
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '40px',
          }}
        >
          <img
            src={lightboxImage}
            alt="Gallery"
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              fontSize: '32px',
              color: '#ffffff',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
