'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import Menu from "./menu"
import Lenis from '@studio-freight/lenis'

interface Navigate {
  id: number
  title: string
  href: string
}

export default function Header() {
  const [menu, setMenu] = useState<boolean>(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useRef<Lenis | null>(null)
  const [locked, setLocked] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const navigate: Navigate[] = [
    { id: 1, title: 'Projects', href: '' },
    { id: 2, title: 'Services', href: '/services' },
    { id: 3, title: 'About', href: '' },
    { id: 4, title: 'Contact Us', href: '' }
  ]

  const textRefs = useRef<HTMLSpanElement[]>([])
  const lineRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    textRefs.current.forEach((textEl, i) => {
      const lineEl = lineRefs.current[i]
      if (!textEl || !lineEl) return

      const onMouseEnter = (e: MouseEvent) => {
        const rect = textEl.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const perc = (offsetX / rect.width) * 100

        gsap.fromTo(
          textEl,
          {
            background: `linear-gradient(to right, #f97316 ${perc}%, #000 ${perc}%)`,
          },
          {
            background: 'var(--orenge-color)',
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: () => {
              textEl.style.backgroundClip = 'text'
              textEl.style.webkitBackgroundClip = 'text'
              textEl.style.color = 'transparent'
            },
          }
        )

        gsap.to(lineEl, {
          width: '100%',
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      const onMouseLeave = () => {
        gsap.to(textEl, {
          background: 'var(--orenge-color)',
          duration: 0.5,
          onUpdate: () => {
            textEl.style.backgroundClip = 'text'
            textEl.style.webkitBackgroundClip = 'text'
            textEl.style.color = 'var(--white-color)'
          },
        })
        gsap.to(lineEl, {
          width: 0,
          duration: 0.5,
        })
      }

      textEl.addEventListener('mouseenter', onMouseEnter)
      textEl.addEventListener('mousemove', onMouseEnter)
      textEl.addEventListener('mouseleave', onMouseLeave)

      // Clean up
      return () => {
        textEl.removeEventListener('mouseenter', onMouseEnter)
        textEl.removeEventListener('mousemove', onMouseEnter)
        textEl.removeEventListener('mouseleave', onMouseLeave)
      }
    })
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    const scrollContainer = document.documentElement // или document.body, если Lenis scrollTarget другой
  
    if (menu) {
      // Остановить анимации Lenis
      lenis?.stop()
  
      // Зафиксировать scroll текущей позиции
      const scrollY = window.scrollY
      scrollContainer.style.position = 'fixed'
      scrollContainer.style.top = `-${scrollY}px`
      scrollContainer.style.left = '0'
      scrollContainer.style.right = '0'
      scrollContainer.style.overflow = 'hidden'
    } else {
      // Восстановить scroll
      const scrollY = Math.abs(parseInt(scrollContainer.style.top || '0'))
  
      scrollContainer.style.position = ''
      scrollContainer.style.top = ''
      scrollContainer.style.left = ''
      scrollContainer.style.right = ''
      scrollContainer.style.overflow = ''
  
      window.scrollTo(0, scrollY)
      lenis?.start()
    }
  }, [menu])

  const toggleScroll = () => {
    setMenu(!menu)
  }


  return (
    <header className={`header ${menu?'bg-black':""}`}>
      <Link href={'/'}>
      <Image src={'/mini_logo.svg'} alt="logo" width={69} height={40} className="mini_logo" />
      <Image src={'/logo_white.svg'} alt="logo" width={218} height={32} className="logo" />
      </Link>
      <div className="navbar flex gap-10 relative">
        {navigate.map((item, i) => (
          <div key={item.id} className="relative">
            <span
              ref={(el) => {
                if (el) {
                    textRefs.current[i] = el;
                }
              }}
              className="navigate transition-all duration-300"
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
            >
              <Link href={item.href}>{item.title}</Link>
            </span>
            <span
              ref={(el) => {
                if (el) {
                    lineRefs.current[i] = el;
                }
              }}
              className="absolute bottom-0 left-0 h-[2px] bg-[var(--orenge-color)]"
              style={{ width: 0 }}
            />
          </div>
        ))}
        <Link href={'/get-price'}>
          <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden rounded-full text-[var(--background)] bg-[var(--white-color)] px-5 py-[2px] text-[14px] leading-[34px]"
          >
            <span
              className="absolute w-18 h-18 bg-[var(--orenge-color)] rounded-full transition-all duration-500 ease-out"
              style={{
                top: coords.y,
                left: coords.x,
                transform: `translate(-50%, -50%) scale(${isHovered ? 3 : 0})`,
                opacity: isHovered ? 1 : 0,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <span className="relative z-10">
              Get Price
            </span>
          </button>
        </Link>
      </div>
      <Image src={'/menu.svg'} alt="logo" onClick={toggleScroll} width={25} height={18} className={`menu_icon ${menu?"menu_active":""}`} />
      <Menu open={menu}/>
    </header>
  )
}
