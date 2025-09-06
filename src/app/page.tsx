'use client'

import SplitText from "@/components/SplitText/SplitText";
import ShinyText from "@/components/ShinyText/ShinyText";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import MagneticButton from "@/components/MagneticButton/MagneticButton";
import FloatingParticles from "@/components/FloatingParticles/FloatingParticles";
import BackgroundSeparator from "@/components/BackgroundSeparator/BackgroundSeparator";
import { Github, Linkedin, Mail, MapPin, Code, Palette, Smartphone, ExternalLink, Calendar, Building } from "lucide-react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState, useEffect } from 'react'
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger)

// Types for API data
interface Experience {
  id: number;
  position: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  tech: string[];
  description: string;
}

interface Project {
  id: number;
  name: string;
  type: string;
  position: string;
  tech: string[];
  description: string;
  url: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const splashRef = useRef<HTMLDivElement>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to format date or handle "Now"/"Present"
  const formatDate = (dateString: string): string => {
    const lowerCase = dateString.toLowerCase()
    if (lowerCase === 'now' || lowerCase === 'present') {
      return 'Present'
    }
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    } catch {
      return dateString // fallback to original string if date parsing fails
    }
  }

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiencesRes, projectsRes] = await Promise.all([
          fetch('/api/experiences'),
          fetch('/api/projects')
        ])

        const experiencesData = await experiencesRes.json()
        const projectsData = await projectsRes.json()

        setExperiences(experiencesData.experiences || [])
        setProjects(projectsData.projects || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useGSAP(() => {
    // Splash screen animation
    const helloWords = ['Hello', 'Hola', 'Bonjour', 'Ciao']

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

      // Sequential animation for each word
      helloWords.forEach((word, index) => {
        const delay = index * 0.3

        splashTl.to(helloElement, {
          duration: 0.03,
          ease: 'power2.out',
          onStart: () => {
            helloElement.textContent = word
          }
        }, `+=${delay === 0 ? 0 : 0.3}`)
          .to(helloElement, {
            scale: 1.1,
            duration: 0.1,
            ease: 'back.out(1.7)'
          }, "+=0.03")
          .to(helloElement, {
            scale: 1,
            duration: 0.1,
            ease: 'power2.out'
          }, "+=0.1")
      })
    }

    // Add initial splash animations
    splashTl.from('.splash-hello', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
      .add(() => animateHelloWords(), '+=0.2') // Reduced delay
      .to('.splash-hello', {
        y: -20,
        opacity: 0.8,
        duration: 0.4,
        ease: 'power3.out'
      }, '+=0.3') // Shorter pause after all words

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

    // Experiences section animations
    gsap.from('.experience-card', {
      scrollTrigger: {
        trigger: '.experiences-section',
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

    // Experience skills animation
    gsap.from('.experience-skill', {
      scrollTrigger: {
        trigger: '.experiences-section',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      delay: 0.3
    })

    // Featured projects section animations
    gsap.from('.featured-project-card', {
      scrollTrigger: {
        trigger: '.featured-projects-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 80,
      opacity: 0,
      rotation: 3,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })

    // Project skills animation
    gsap.from('.project-skill', {
      scrollTrigger: {
        trigger: '.featured-projects-section',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'back.out(1.7)',
      delay: 0.4
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

      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden ">
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
            <ShinyText text="Last updated September 7, 2025" className="text-sm mt-4 text-gray-400" />
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* Background Separator */}
        <BackgroundSeparator
          variant="geometric"
          height="h-40"
          className="bg-gradient-to-b from-slate-900/50 to-transparent"
        />

        {/* About Section */}
        <section className="about-section py-20 px-4 ">
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
                  {['Laravel', 'Next.js', 'TypeScript', 'Kotlin', 'Dart', 'Jetpack Compose', 'Flutter', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'].map((tech) => (
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

        {/* Background Separator */}
        <BackgroundSeparator
          variant="wave"
          height="h-32"
          className="bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"
        />

        {/* Experiences Section */}
        <section className="experiences-section py-20 px-4 bg-gradient-to-br from-black/20 via-purple-900/10 to-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <SplitText
                text="Professional Experience"
                className="text-4xl md:text-5xl font-bold text-white"
                tag="h2"
                delay={50}
              />
              <ShinyText
                text="My journey in the tech industry"
                className="text-xl text-gray-300"
                speed={4}
              />
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>

            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid gap-6 md:gap-8">
                {experiences.map((exp: Experience) => (
                  <div
                    key={exp.id}
                    className="experience-card bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-300/30 hover:bg-white/10 transition-all duration-300 hover-card"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <Building className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                            <p className="text-purple-300 font-medium text-lg">{exp.company}</p>
                            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-400/20">
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed text-base">{exp.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech: string) => (
                            <span
                              key={tech}
                              className="experience-skill px-3 py-1.5 bg-white/10 rounded-full text-sm text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 flex-shrink-0 lg:flex-col lg:items-end lg:text-right">
                        <Calendar className="w-4 h-4" />
                        <div className="flex lg:items-end items-center justify-center gap-2">
                          <span className="text-sm font-medium">
                            {formatDate(exp.startDate)}
                          </span>
                          <span className="text-sm text-gray-500">-</span>
                          <span className={`text-sm font-medium ${exp.endDate.toLowerCase() === 'present' || exp.endDate.toLowerCase() === 'now'
                              ? 'text-green-400 font-semibold'
                              : ''
                            }`}>
                            {formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Background Separator */}
        <BackgroundSeparator
          variant="particles"
          height="h-28"
          className="bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"
        />

        {/* Projects Section */}
        <section className="featured-projects-section py-20 px-4 bg-gradient-to-br from-black/10 via-blue-900/10 to-black/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <SplitText
                text="Featured Projects"
                className="text-4xl md:text-5xl font-bold text-white"
                tag="h2"
                delay={50}
              />
              <ShinyText
                text="Some of my recent work"
                className="text-xl text-gray-300"
                speed={4}
              />
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project: Project) => (
                  <div
                    key={project.id}
                    className="featured-project-card group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-300/30 hover:bg-white/10 transition-all duration-300 hover-card"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{project.name}</h3>
                          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-400/20">
                            {project.type}
                          </span>
                        </div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors duration-300 p-2 rounded-full hover:bg-purple-400/10"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 font-medium">{project.position}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string) => (
                          <span
                            key={tech}
                            className="project-skill px-3 py-1.5 text-xs bg-white/10 rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Background Separator */}
        <BackgroundSeparator
          variant="gradient"
          height="h-36"
          className="bg-gradient-to-b from-transparent via-purple-900/15 to-black/20"
        />

        {/* Contact Section */}
        <section className="contact-section py-20 px-4 bg-gradient-to-br from-black/30 via-purple-900/20 to-black/30 backdrop-blur-sm">
          <div className="contact-content max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <SplitText
                text="Let's Work Together"
                className="text-4xl md:text-5xl font-bold text-white"
                tag="h2"
                delay={50}
              />
              <SplitText
                text="I'm always open to discussing new opportunities and interesting projects."
                className="text-xl text-gray-300"
                tag="p"
                delay={100}
                splitType="words"
              />
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-12"></div>

              <MagneticButton strength={0.5}>
                <a
                  href="mailto:diassnorrman@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900 hover:bg-purple-950 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <Mail className="w-5 h-5" />
                  Contact via Email
                </a>
              </MagneticButton>
            </div>
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
