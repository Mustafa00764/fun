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

interface Clients {
    id: number,
    url: string,
    href: string
}

export default function HomeSection() {
    const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
    const wordsRef = useRef<HTMLSpanElement[]>([]);
    const underlineRefs = useRef<HTMLSpanElement[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

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

    const clients: Clients[] = [
        {
            id:1,
            url: '/clients/Group1.svg',
            href: ''
        },
        {
            id:2,
            url: '/clients/Group2.svg',
            href: ''
        },
        {
            id:3,
            url: '/clients/Group3.svg',
            href: ''
        },
        {
            id:4,
            url: '/clients/Group4.svg',
            href: ''
        },
        {
            id:5,
            url: '/clients/Group5.svg',
            href: ''
        },
        {
            id:6,
            url: '/clients/Group6.svg',
            href: ''
        },
        {
            id:7,
            url: '/clients/Group7.svg',
            href: ''
        },
        {
            id:8,
            url: '/clients/Group8.svg',
            href: ''
        },
        {
            id:9,
            url: '/clients/Group9.svg',
            href: ''
        },
        {
            id:10,
            url: '/clients/Group10.svg',
            href: ''
        },
        {
            id:11,
            url: '/clients/Group11.svg',
            href: ''
        },
        {
            id:12,
            url: '/clients/Group12.svg',
            href: ''
        },
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

        // Scroll анимация появления текста
        const section = sectionRef.current;
        if (!section) return;

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
                },
            }
        );
    }, []);

    return (
        <div className="homeSections">
            <section className="sectionOne">
                <h1>Unique Solutions —</h1>
                <p>
                    Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis
                </p>
            </section>

            <section className="sectionTwo">
                <h2>Projects</h2>
                <div className="projects">
                    {projects.map((item) => (
                        <div
                            key={item.id}
                            ref={(el) => {
                                if (el) {
                                  boxesRef.current[item.id] = el;
                                }
                              }}
                            className="project"
                        >
                            <img src={item.img} alt="" className="pImg" />
                            <div>{/* info block if needed */}</div>
                        </div>
                    ))}
                </div>
                <div className="layers">
                    <p>All Projects</p>
                    <img src="/Layer_1.svg" alt="" />
                </div>
            </section>
            <section ref={sectionRef} className="sectionThree px-6 py-12">
                <p className="flex flex-wrap gap-4 text-lg font-medium leading-relaxed">
                    <span className="sectionTitle mr-3">Services</span>
                    {words.map((word, index) => (
                        <span
                            key={index}
                            className="relative inline-block group overflow-hidden"
                        >
                            <span className="relative block">
                                {word.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full delay-[calc(20ms*var(--char-index))]"
                                        style={{ "--char-index": i } as React.CSSProperties}
                                    >
                                        {char}
                                    </span>
                                ))},
                            </span>

                            <span className="absolute top-0 left-0 text-[var(--orenge-color)] block pointer-events-none">
                                {word.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className="inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 delay-[calc(20ms*var(--char-index))]"
                                        style={{ "--char-index": i } as React.CSSProperties}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                            {/* underline */}
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--orenge-color)] group-hover:w-[calc(100%-23px)] transition-all duration-500"></span>
                        </span>
                    ))}
                </p>
            </section>

            <section className="sectionFour">
                <h2 className="sectionTitle">Clients</h2>
                <div className="clients">
                    {
                        clients.map((item)=>{
                            return <div className="client">
                                <img src={item.url} alt="" />
                            </div>
                        })
                    }
                </div>
            </section>

            <section className="sectionFive">
                <div className="">
                    <img src="/image/Mask.png" alt="mask" />
                </div>
                <div className="sectionFive_texts">
                    <h1>Fëdor Beltugov —</h1>
                    <p>Founder and owner of Function Design Studio. Multidisciplinary designer & art director, focused on brand identity & UI/⁠UX design. Work experience: 17 years</p>
                    <div className="links">
                        <p>Get in touch with me through:</p>
                        <img src="/whatsapp.svg" alt="" />
                        <img src="/telegram.svg" alt="" />
                        <img src="/linkedin.svg" alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
}
