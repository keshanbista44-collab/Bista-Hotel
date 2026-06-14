import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Luxury', 'Heritage', 'Hospitality']

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const tagsEl = tagsRef.current
    const image = imageRef.current
    if (!section || !text || !tagsEl) return

    const ctx = gsap.context(() => {
      // Text animation
      gsap.from(text, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      // Image parallax
      if (image) {
        gsap.from(image, {
          scale: 1.2,
          opacity: 0,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        })
      }

      // Tags stagger
      gsap.from(tagsEl.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '160px clamp(20px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '80px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: '1 1 500px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Our Philosophy
            </p>
            <p
              ref={textRef}
              style={{
                fontSize: 'clamp(28px, 4vw, 60px)',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: '#000000',
                marginBottom: '40px',
              }}
            >
              We believe that true hospitality is not measured in amenities alone,
              but in the warmth of every smile and the comfort of every detail.
            </p>
            <div
              ref={tagsRef}
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    color: '#000000',
                    padding: '10px 18px',
                    border: '1px solid #1a1a1a',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            style={{
              flex: '1 1 400px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/hotel-lobby.jpg"
              alt="Hotel Bista Lobby"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
