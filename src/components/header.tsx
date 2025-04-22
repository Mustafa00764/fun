'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import Menu from "./menu"

interface Navigate {
  id: number
  title: string
  href: string
}

export default function Header() {
  const [menu, setMenu] = useState<boolean>(false)
  const navigate: Navigate[] = [
    { id: 1, title: 'Projects', href: '' },
    { id: 2, title: 'Services', href: '' },
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

  return (
    <header className={`header ${menu?'bg-black':""}`}>
      <Image src={'/mini_logo.svg'} alt="logo" width={69} height={40} className="mini_logo" />
      <Image src={'/logo_white.svg'} alt="logo" width={218} height={32} className="logo" />
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
                background: 'var(--orenge-color)',
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
        <div className="button-container">
          <span className="mas">Get Price</span>
          <button type="button" name="Hover" className="">Get Price</button>
        </div>
      </div>
      <Image src={'/menu.svg'} alt="logo" onClick={()=>setMenu(!menu)} width={25} height={18} className={`menu_icon ${menu?"menu_active":""}`} />
      <Menu open={menu}/>
    </header>
  )
}
