import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import Spatial from './sections/Spatial'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Capabilities from './sections/Capabilities'
import Hero from './sections/Hero'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'
import RoomDetail from './pages/RoomDetail'
import RoomsList from './pages/RoomsList'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function HomePage() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <Header scrollRef={scrollRef} />
      <main>
        <Spatial />
        <Philosophy />
        <Works scrollRef={scrollRef} onSelectRoom={() => {}} />
        <Capabilities />
        <Hero />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <Preloader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<><Header scrollRef={scrollRef} /><RoomsList /></>} />
        <Route path="/rooms/:roomId" element={<><Header scrollRef={scrollRef} forceLight /><RoomDetail /></>} />
        <Route path="/gallery" element={<><Header scrollRef={scrollRef} /><Gallery /></>} />
        <Route path="/contact" element={<><Header scrollRef={scrollRef} /><Contact /></>} />
        <Route path="/about" element={<><Header scrollRef={scrollRef} /><About /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
