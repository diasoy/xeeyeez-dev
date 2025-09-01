'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Animate main cursor instantly
      gsap.to(cursor, {
        x: mouseX - 8,
        y: mouseY - 8,
        duration: 0,
        ease: 'none'
      })
    }

    // Smooth follower animation
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08

      gsap.set(follower, {
        x: followerX - 20,
        y: followerY - 20
      })

      requestAnimationFrame(animateFollower)
    }

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(follower, {
        scale: 2,
        backgroundColor: '#8b5cf6',
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    // Text hover effects
    const handleTextEnter = () => {
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(follower, {
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleTextLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#ffffff',
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hover-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Text elements
    const textElements = document.querySelectorAll('h1, h2, h3, p, span')
    textElements.forEach(el => {
      el.addEventListener('mouseenter', handleTextEnter)
      el.addEventListener('mouseleave', handleTextLeave)
    })

    // Start follower animation
    animateFollower()

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', handleMouseMove)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })

      textElements.forEach(el => {
        el.removeEventListener('mouseenter', handleTextEnter)
        el.removeEventListener('mouseleave', handleTextLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Follower circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border-2 border-purple-400"
        style={{ 
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      />
    </>
  )
}
