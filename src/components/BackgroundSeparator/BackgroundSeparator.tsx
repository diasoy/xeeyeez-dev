'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

interface BackgroundSeparatorProps {
  variant?: 'gradient' | 'geometric' | 'wave' | 'particles'
  height?: string
  className?: string
}

export default function BackgroundSeparator({ 
  variant = 'gradient', 
  height = 'h-32',
  className = '' 
}: BackgroundSeparatorProps) {
  const separatorRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animate separator elements on scroll
    gsap.fromTo('.separator-element', {
      opacity: 0,
      scale: 0.8,
      y: 50
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: separatorRef.current,
        start: 'top 90%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse'
      }
    })

    // Floating animation for geometric shapes
    if (variant === 'geometric') {
      gsap.to('.separator-shape', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      })

      gsap.to('.separator-shape', {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      })
    }

    // Wave animation
    if (variant === 'wave') {
      gsap.to('.wave-path', {
        attr: { d: "M0,50 Q150,10 300,50 T600,50 L600,100 L0,100 Z" },
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      })
    }

    // Particles floating animation
    if (variant === 'particles') {
      gsap.to('.separator-particle', {
        y: -20,
        x: 10,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      })
    }
  }, { scope: separatorRef })

  const renderGradient = () => (
    <div className="separator-element relative w-full h-full bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
    </div>
  )

  const renderGeometric = () => (
    <div className="separator-element relative w-full h-full bg-gradient-to-b from-transparent via-slate-900/30 to-transparent overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="separator-shape absolute top-1/4 left-1/4 w-8 h-8 border border-purple-400/30 rotate-45 bg-purple-500/10"></div>
      <div className="separator-shape absolute top-3/4 right-1/4 w-6 h-6 border border-blue-400/30 rotate-12 bg-blue-500/10"></div>
      <div className="separator-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-purple-300/20 rounded-full bg-purple-400/5"></div>
      <div className="separator-shape absolute top-1/3 right-1/3 w-4 h-8 border border-blue-300/20 bg-blue-400/5 rotate-45"></div>
      
      {/* Central divider */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
    </div>
  )

  const renderWave = () => (
    <div className="separator-element relative w-full h-full bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
        <path 
          className="wave-path"
          d="M0,50 Q150,30 300,50 T600,50 L600,100 L0,100 Z" 
          fill="url(#waveGradient)"
        />
        <path 
          className="wave-path"
          d="M0,60 Q200,40 400,60 T800,60 L800,100 L0,100 Z" 
          fill="rgba(59, 130, 246, 0.1)"
        />
      </svg>
    </div>
  )

  const renderParticles = () => (
    <div className="separator-element relative w-full h-full bg-gradient-to-b from-transparent via-slate-900/20 to-transparent overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="separator-particle absolute w-1 h-1 bg-purple-400/60 rounded-full"
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${30 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.2}s`
          }}
        ></div>
      ))}
      
      {/* Connecting lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent"></div>
    </div>
  )

  const renderVariant = () => {
    switch (variant) {
      case 'geometric':
        return renderGeometric()
      case 'wave':
        return renderWave()
      case 'particles':
        return renderParticles()
      default:
        return renderGradient()
    }
  }

  return (
    <div 
      ref={separatorRef}
      className={`relative ${height} w-full ${className}`}
    >
      {renderVariant()}
    </div>
  )
}
