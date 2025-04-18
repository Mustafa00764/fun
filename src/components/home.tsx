'use client'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number,
    img: string,
    title: string,
    text: string
}



export default function HomeSection() {
    const boxesRef = useRef<HTMLDivElement[]>([]);
    const wordsRef = useRef<HTMLSpanElement[]>([])
    const sectionRef = useRef<HTMLDivElement>(null)
    const projects: Project[] = [
        {id: 1, img: '/image/p1.png', title: '', text: ''},
        {id: 2, img: '/image/p2.png', title: '', text: ''},
        {id: 3, img: '/image/p3.png', title: '', text: ''},
        {id: 4, img: '/image/p4.png', title: '', text: ''},
        {id: 5, img: '/image/p5.png', title: 'Arshaluys', text: 'Logo, Product branding'},
        {id: 6, img: '/image/p6.png', title: '', text: ''}
    ];

    const words = [
        'Corporate identity', 'Product identity', 'Personal identity',
        'Brand support', 'Naming', 'Logo', 'Packaging', 'Brand guidelines',
        'UI/⁠UX', 'Key Visual', 'Content design'
    ]

    useEffect(() => {
        // Projects fade-in
        boxesRef.current.forEach((box, index) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 110%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Text span animations in sectionThree
        const section = sectionRef.current
        if (!section) return
    
        // Scroll анимация появления текста
        gsap.fromTo(
          section.querySelectorAll(".word"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            }
          }
        )

    }, []);


  const handleMouseEnter = (index: number) => {
    const el = wordsRef.current[index]
    if (!el) return

    gsap.to(el.querySelector('.text-top'), {
      yPercent: -100,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(el.querySelector('.text-bottom'), {
      yPercent: -100,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (index: number) => {
    const el = wordsRef.current[index]
    if (!el) return

    gsap.to(el.querySelector('.text-top'), {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(el.querySelector('.text-bottom'), {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }



    return (
        <div className="homeSections">

            <section className="sectionOne">
                <h1>Unique Solutions —</h1>
                <p>
                    Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis
                </p>
            </section>

            <section className="sectionTwo">
                <h2>Projects</h2>
                <div className="projects">
                    {
                        projects.map((item) => (
                            <div
                                key={item.id}
                                ref={el => boxesRef.current[item.id] = el!}
                                className="project"
                            >
                                <img src={item.img} alt="" className="pImg"/>
                                <div>{/* info block if needed */}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="layers">
                    <p>All Projects</p>
                    <img src="/Layer_1.svg" alt="" />
                </div>
            </section>
    <section ref={sectionRef} className="sectionThree px-6 py-12">
      <p className="flex flex-wrap gap-3 text-lg font-medium leading-relaxed">
        <span className="sectionTitle mr-3">Services</span>
        {words.map((word, index) => (
          <span className="group relative perspective-[1000px] inline-block word" key={index}>
            <span className="block transition-transform duration-500 group-hover:rotateX-[-90deg] origin-bottom">
              {word}
            </span>
            <span className="absolute top-0 left-0 block text-orange-500 rotateX-90 group-hover:rotateX-0 transition-transform duration-500 origin-top">
              {word}
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-orange-500 w-0 group-hover:w-full transition-all duration-500"></span>
          </span>
        ))}
      </p>
    </section>
    
        </div>
    );
}
