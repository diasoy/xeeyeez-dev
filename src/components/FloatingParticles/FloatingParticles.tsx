'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create particles
    const particleCount = 50
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-purple-400 rounded-full opacity-30'
      
      // Random initial position
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      
      gsap.set(particle, {
        x,
        y,
        scale: Math.random() * 0.5 + 0.5
      })
      
      container.appendChild(particle)
      particles.push(particle)

      // Floating animation
      gsap.to(particle, {
        y: y - 100,
        x: x + (Math.random() - 0.5) * 200,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 5
      })

      // Scale animation
      gsap.to(particle, {
        scale: Math.random() * 0.3 + 0.7,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3
      })

      // Opacity animation
      gsap.to(particle, {
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      })
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      particles.forEach(particle => {
        const rect = particle.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          const deltaX = (centerX - e.clientX) * force * 0.3
          const deltaY = (centerY - e.clientY) * force * 0.3
          
          gsap.to(particle, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            duration: 0.5,
            ease: 'power2.out'
          })
        }
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(particle => {
        container.removeChild(particle)
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    />
  )
}
