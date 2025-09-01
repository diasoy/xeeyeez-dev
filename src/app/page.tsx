'use client'

import SplitText from "@/components/SplitText/SplitText";
import ShinyText from "@/components/ShinyText/ShinyText";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import MagneticButton from "@/components/MagneticButton/MagneticButton";
import FloatingParticles from "@/components/FloatingParticles/FloatingParticles";
import { Github, Linkedin, Mail, MapPin, Code, Palette, Smartphone } from "lucide-react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const splashRef = useRef<HTMLDivElement>(null)
  const [showSplash, setShowSplash] = useState(true)

  useGSAP(() => {
    // Splash screen animation
    const helloWords = ['Hello', 'Hola', 'Bonjour', 'Hallo', 'Ciao', 'こんにちは', '안녕하세요', 'Привет', 'مرحبا', 'Olá']

    // Create splash screen timeline
    const splashTl = gsap.timeline({
      onComplete: () => {
        // Hide splash screen and show main content
        gsap.to('.splash-screen', {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => setShowSplash(false)
        })
        
        // Start main hero animation after splash
        mainHeroAnimation()
      }
    })

    // Animate hello words
    const animateHelloWords = () => {
      const helloElement = document.querySelector('.splash-hello')
      if (!helloElement) return

      gsap.set(helloElement, { opacity: 1, scale: 1 })
      
      helloWords.forEach((word, index) => {
        splashTl.to(helloElement, {
          duration: 0.1,
          ease: 'power2.out',
          onStart: () => {
            helloElement.textContent = word
          }
        }, index * 0.4)
        .to(helloElement, {
          scale: 1.1,
          duration: 0.2,
          ease: 'back.out(1.7)'
        }, index * 0.4 + 0.1)
        .to(helloElement, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        }, index * 0.4 + 0.3)
      })
    }

    // Add initial splash animations
    splashTl.from('.splash-hello', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .add(() => animateHelloWords(), '+=0.2')
    .to('.splash-hello', {
      y: -20,
      opacity: 0.8,
      duration: 0.5,
      ease: 'power3.out'
    }, '+=1')

    const mainHeroAnimation = () => {
      // Hero entrance animation
      const tl = gsap.timeline()
      
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
      .from('.social-links', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
      .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
    }

    // Floating animation for hero elements
    gsap.to('.hero-float', {
      y: -10,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 1
      }
    })

    // About section animations
    gsap.from('.about-card', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    })

    // Skills animation
    gsap.from('.skill-tag', {
      scrollTrigger: {
        trigger: '.skills-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    })

    // Projects animation
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 80,
      opacity: 0,
      rotation: 5,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })

    // Contact section animation
    gsap.from('.contact-content > *', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    })

    // Parallax effect for background
    gsap.to('.parallax-bg', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      },
      yPercent: -20,
      ease: 'none'
    })

    // Interactive hover animations
    const cards = document.querySelectorAll('.hover-card')
    cards.forEach(card => {
      const cardElement = card as HTMLElement
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      cardElement.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

  }, { scope: containerRef })

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
        {/* Splash Screen */}
        {showSplash && (
          <div 
            ref={splashRef}
            className="splash-screen fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          >
            <div className="text-center">
              <h1 className="splash-hello text-6xl md:text-8xl font-bold text-white opacity-0">
                Hello
              </h1>
              <div className="mt-4">
                <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        )}

        {/* Parallax Background */}
        <div className="parallax-bg fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="hero-title hero-float">
              <SplitText
                text="Hello, I'm"
                className="text-2xl md:text-3xl text-gray-300"
                tag="h2"
                delay={50}
              />
            </div>
            <div className="hero-title hero-float">
              <SplitText
                text="Dias Norman"
                className="text-5xl md:text-7xl font-bold text-white"
                tag="h1"
                delay={100}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="hero-subtitle hero-float">
              <ShinyText
                text="Software Developer"
                className="text-2xl md:text-3xl font-semibold"
                speed={3}
              />
            </div>
            <div className="hero-description hero-float">
              <SplitText
                text="I create beautiful and functional software experiences with modern technologies"
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                tag="p"
                delay={200}
                splitType="words"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links flex justify-center space-x-8 pt-8 hero-float">
            <MagneticButton strength={0.4}>
              <Link target="_blank" href="https://github.com/diasoy" className="group hover-card transition-all duration-300">
                <Github className="w-8 h-8 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <Link target="_blank" href="https://linkedin.com/in/diasnormann" className="group hover-card transition-all duration-300">
                <Linkedin className="w-8 h-8 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <Link target="_blank" href="mailto:diassnorrman@gmail.com" className="group hover-card transition-all duration-300">
                <Mail className="w-8 h-8 text-gray-400 group-hover:text-green-400 group-hover:scale-110 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-20 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex w-full justify-center items-center flex-col text-center mb-16">
            <SplitText
              text="About Me"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              tag="h2"
              delay={50}
            />
            <ShinyText
              text="Passionate about creating digital solutions"
              className="text-xl text-gray-300"
              speed={4}
            />
          </div>

          <div className="flex flex-col gap-12 items-center max-w-4xl mx-auto">
            <div className="about-card space-y-6 text-center">
              <SplitText
                text="I'm a passionate software developer with expertise in modern technologies. I love turning ideas into beautiful, functional applications that make a difference."
                className="text-lg text-gray-300 leading-relaxed"
                tag="p"
                delay={100}
                splitType="words"
              />
              
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>Surabaya, Indonesia</span>
              </div>

              <div className="skills-container flex flex-wrap gap-3 pt-4 justify-center">
                {['Laravel', 'Next.js', 'TypeScript', 'Kotlin', 'Dart','Jetpack Compose', 'Flutter', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'].map((tech) => (
                  <span key={tech} className="skill-tag px-3 py-1 bg-white/10 rounded-full text-sm text-white backdrop-blur-sm hover-card">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl">
              <div className="about-card bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover-card">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Full Stack Development</h3>
                    <p className="text-sm sm:text-base text-gray-300">Creating seamless and efficient web applications</p>
                  </div>
                </div>
              </div>

              <div className="about-card bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover-card">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">UI/UX Design</h3>
                    <p className="text-sm sm:text-base text-gray-300">Designing beautiful and intuitive user experiences</p>
                  </div>
                </div>
              </div>

              <div className="about-card bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover-card">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Mobile App Development</h3>
                    <p className="text-sm sm:text-base text-gray-300">Building responsive applications for all devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <section className="projects-section py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SplitText
              text="Featured Projects"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              tag="h2"
              delay={50}
            />
            <ShinyText
              text="Some of my recent work"
              className="text-xl text-gray-300"
              speed={4}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <div key={project} className="project-card group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover-card">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Project {project}</h3>
                    <p className="text-white/80 text-sm">A brief description of this amazing project and its features.</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'TypeScript', 'Tailwind'].map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-white/10 rounded text-white">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Live Demo →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="contact-section py-20 px-4 bg-black/20 backdrop-blur-sm">
        <div className="contact-content max-w-4xl mx-auto text-center">
          <SplitText
            text="Let's Work Together"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            tag="h2"
            delay={50}
          />
          <SplitText
            text="I'm always open to discussing new opportunities and interesting projects."
            className="text-xl text-gray-300 mb-8"
            tag="p"
            delay={100}
            splitType="words"
          />
          
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.3}>
              <a 
                href="mailto:diassnorrman@gmail.com" 
                className="group relative hover-card px-8 py-4 bg-gradient-to-br from-slate-800/80 via-purple-800/80 to-slate-900/80 hover:from-slate-700/90 hover:via-purple-700/90 hover:to-slate-800/90 text-white rounded-xl transition-all duration-500 font-semibold shadow-lg hover:shadow-purple-500/20 border border-white/10 hover:border-purple-300/30"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/10 transition-all duration-500"></div>
              </a>
            </MagneticButton>
          </div> */}
        </div>

        {/* Footer */}
        <footer className="px-4 mt-32">
          <div className="max-w-6xl mx-auto text-center">
            <ShinyText
              text="© 2025 Dias Norman. All rights reserved."
              className="text-gray-400"
              speed={6}
            />
          </div>
        </footer>
      </section>
      </div>
    </>
  );
}
