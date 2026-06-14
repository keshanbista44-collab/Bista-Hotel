import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { trpc } from '@/providers/trpc'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const sendMessage = trpc.contact.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setSubmitError(null)
    },
    onError: (err) => {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.contact-form-container', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('Please fill in all required fields.')
      return
    }

    sendMessage.mutate({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject || undefined,
      message: formData.message,
    })
  }

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
          Get in Touch
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
          Contact Us
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
          We'd love to hear from you. Reach out for bookings, inquiries, or just to say hello.
        </p>
      </div>

      {/* Contact Content */}
      <section
        ref={sectionRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '80px clamp(20px, 4vw, 60px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '80px',
          }}
        >
          {/* Contact Info */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              Contact Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="contact-info-item">
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: '#666666',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  📍 Address
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#000000' }}>
                  Trafick Chowk, Nepalgunj-21
                  <br />
                  Banke, Lumbini Province, Nepal
                </p>
              </div>

              <div className="contact-info-item">
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: '#666666',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  📞 Phone
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#000000' }}>
                  <a href="tel:9744762651" style={{ color: '#000000', textDecoration: 'none' }}>
                    Mobile: +977 9744762651
                  </a>
                  <br />
                  <a href="tel:081520120" style={{ color: '#000000', textDecoration: 'none' }}>
                    Landline: 081-520120
                  </a>
                </p>
              </div>

              <div className="contact-info-item">
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: '#666666',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  📧 Email
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#000000' }}>
                  <a href="mailto:keshanbista44@gmail.com" style={{ color: '#000000', textDecoration: 'none' }}>
                    keshanbista44@gmail.com
                  </a>
                </p>
              </div>

              <div className="contact-info-item">
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: '#666666',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  🕐 Reception Hours
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#000000' }}>
                  Open 24 Hours, 7 Days a Week
                  <br />
                  Check-in: 2:00 PM | Check-out: 12:00 PM
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="contact-info-item"
              style={{
                marginTop: '40px',
                padding: '24px',
                backgroundColor: '#f4f4f5',
                border: '1px solid #e5e5e5',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#666666',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                🗺️ Location
              </p>
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#e5e5e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: '#666666',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', marginBottom: '8px' }}>📍</p>
                  <p>Trafick Chowk, Nepalgunj-21</p>
                  <p style={{ fontSize: '12px', marginTop: '8px' }}>
                    <a
                      href="https://maps.google.com/?q=Nepalgunj+Banke+Nepal"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#000000', textDecoration: 'underline' }}
                    >
                      Open in Google Maps →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              Send a Message
            </h2>

            {submitted ? (
              <div
                style={{
                  border: '1px solid #000000',
                  padding: '32px 28px',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#000000',
                }}
              >
                Thank you for your message! We will get back to you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {submitError && (
                  <div
                    style={{
                      border: '1px solid rgba(255,100,100,0.5)',
                      padding: '14px 18px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: 'rgba(200,50,50,0.9)',
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <ContactField label="Full Name*" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
                <ContactField label="Email*" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} />
                <ContactField label="Phone" type="tel" name="phone" placeholder="+977 9744762651" value={formData.phone} onChange={handleChange} />
                <ContactField label="Subject" type="text" name="subject" placeholder="How can we help?" value={formData.subject} onChange={handleChange} />

                <label style={{ display: 'block' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      color: '#666666',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                      display: 'block',
                    }}
                  >
                    Message*
                  </span>
                  <textarea
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      border: '1px solid #e5e5e5',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </label>

                <button
                  type="submit"
                  disabled={sendMessage.isPending}
                  style={{
                    padding: '16px 24px',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    border: '1px solid #000000',
                    cursor: sendMessage.isPending ? 'wait' : 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.25s ease',
                    fontFamily: '"Helvetica Neue", sans-serif',
                    opacity: sendMessage.isPending ? 0.6 : 1,
                  }}
                >
                  {sendMessage.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  type: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: '#666666',
          textTransform: 'uppercase',
          marginBottom: '4px',
          display: 'block',
        }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '15px',
          border: '1px solid #e5e5e5',
          outline: 'none',
          fontFamily: 'inherit',
        }}
      />
    </label>
  )
}
