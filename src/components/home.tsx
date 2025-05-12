'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import DualDirectionBlur from './ui/improved-blur-effect';

gsap.registerPlugin(ScrollTrigger);

interface Project { id: number; img: string; title: string; text: string; }
interface Client { id: number; url: string; href: string; }

export default function HomeSection() {
  const [isClient, setIsClient] = useState(false);
  const [fontSize, setFontSize] = useState<any>(0) // To track if we're on the client side
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  // Set client-side state once mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  const projects: Project[] = [
    { id: 1, img: '/image/p1.png', title: '', text: '' },
    { id: 2, img: '/image/p2.png', title: '', text: '' },
    { id: 3, img: '/image/p3.png', title: '', text: '' },
    { id: 4, img: '/image/p4.png', title: '', text: '' },
    { id: 5, img: '/image/p5.png', title: 'Arshaluys', text: 'Logo, Product branding' },
    { id: 6, img: '/image/p6.png', title: '', text: '' },
  ];

  const words = [
    `Corporate identity`, 'Product identity', 'Personal identity',
    'Brand support', 'Naming', 'Logo', 'Packaging', 'Brand guidelines',
    'UI/⁠UX', 'Key Visual', 'Content design'
  ];

  const clients: Client[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `/clients/Group${i + 1}.svg`,
    href: ''
  }));

  const animationsRef = useRef<gsap.core.Tween[]>([]); // Store animations

  useEffect(() => {
    if (!isClient) return; // Avoid running the animations code on SSR
    setFontSize(window.innerWidth / 100 * 18.75)
    const animations: gsap.core.Tween[] = [];

    boxesRef.current.forEach((box, index) => {
      if (!box) return;
      const anim = gsap.fromTo(box, 
        { opacity: 0, y: 100, scale: 0.9 }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: box, start: 'top 90%', toggleActions: 'play none none reverse' }
        }
      );
      animations.push(anim);
    });

    animations.push(
      gsap.from('.sectionThree .word', {
        opacity: 0,
        y: 50,
        rotationX: 90,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.sectionThree', start: 'top 80%' }
      })
    );

    animations.push(
      gsap.from('.sectionFour .client', {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: { amount: 0.8, grid: 'auto', from: 'center' },
        scrollTrigger: { trigger: '.sectionFour', start: 'top 80%' }
      })
    );

    animations.push(
      gsap.from('.sectionFive > div:first-child', {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: { trigger: '.sectionFive', start: 'top 80%' }
      })
    );

    animations.push(
      gsap.from('.sectionFive_texts', {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.3,
        scrollTrigger: { trigger: '.sectionFive', start: 'top 80%' }
      })
    );

    animationsRef.current = animations;

    return () => {
      animationsRef.current.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, [isClient, pathname, fontSize]);

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
          duration: 0.4,
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
    <div className="homeSections">
      <section className="sectionOne ">
        <h1 className='sectionOne_title'>Unique <br />
        Solutions —</h1>
        <div className='effects'>
          <DualDirectionBlur text={"Unique Solutions —"}  fontSize={fontSize} color={"#FF3F1A"} />
        </div>
        <p>Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis</p>
      </section>

      <section className="sectionTwo">
        <h2>Projects</h2>
        <div className="projects ">
          {projects.map((item) => (
            <div key={item.id} ref={(el) => { boxesRef.current[item.id] = el; }} className="project">
              <img src={item.img} alt="" className='pImg'/>
            </div>
          ))}
        </div>
        <div className="layers mt-4"><p>All Projects</p><img src="/Layer_1.svg" alt="layer" /></div>
      </section>

      <section ref={sectionRef} className="sectionThree">
        <p className="flex flex-wrap gap-4 text-lg font-medium leading-relaxed">
          <span className="sectionTitle mr-3">Services</span>

          {
            words.map((item, idx) => {
              return(
                <span key={idx} className="relative animTitle inline-block group overflow-hidden ">
                <span
                  ref={(el) => {
                    if (el) {
                        textRefs.current[idx] = el;
                    }
                  }}
                  className=" transition-all duration-200"
                  style={{
                    background: 'var(--orenge-color)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {item}{idx<10?",":''}
                </span>
                <span
                  ref={(el) => {
                    if (el) {
                        lineRefs.current[idx] = el;
                    }
                  }}
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--orenge-color)] max-[769px]:group-hover:w-[calc(100%-9px)] group-hover:w-[calc(100%-23px)] transition-all "
                  style={{ width: 0 }}
                />
              </span>
              )
            })
          }
          {/* {words.map((word, idx) => (
            <span key={idx} className="relative animTitle inline-block group overflow-hidden word">
              <span className="relative block">
                {[...word.replace(/ /g, '\u00A0')].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    {c}
                  </span>
                ))}{idx<10?",":''}
              </span>
              <span className="absolute top-0 left-0 text-[var(--orenge-color)] block pointer-events-none">
                {[...word.replace(/ /g, '\u00A0')].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    {c}
                  </span>
                ))}
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--orenge-color)] max-[769px]:group-hover:w-[calc(100%-9px)] group-hover:w-[calc(100%-23px)] transition-all duration-500" />
            </span>
          ))} */}
        </p>
      </section>

      <section className="sectionFour">
        <h2 className="sectionTitle">Clients</h2>
        <div className="clients grid grid-cols-4 gap-4">
          {clients.map((c) => (
            <div key={c.id} className="client"><img src={c.url} alt="client" /></div>
          ))}
        </div>
      </section>

      <section className="sectionFive flex gap-8 py-12">
        <div className='sectionFive_img'><Image src="/image/Mask.png" alt="mask" width={200} height={200} /></div>
        <div className="sectionFive_texts">
          <h1>Fëdor Beltugov —</h1>
          <p>Founder and owner of Function Design Studio. Multidisciplinary designer & art director, focused on brand identity & UI/⁠UX design. Work experience: 17 years</p>
          <div className="links flex items-center gap-4">
            <p>Get in touch with me through:</p>
            <div className="icon">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1641_966)">
                  <path d="M21.8543 19.7346C21.5014 19.6039 20.5474 19.2511 20.1161 19.0942C19.6848 18.9374 19.6064 18.9897 19.4234 19.0942C19.2404 19.1857 18.8483 19.5386 18.6523 19.7346C18.4563 19.9307 18.3256 19.8915 18.1165 19.8131C17.9073 19.7346 16.9533 19.0942 16.4305 18.5845C15.9208 18.0748 15.2804 17.1077 15.202 16.8986C15.1235 16.6895 15.0843 16.5588 15.2804 16.3627C15.4764 16.1667 15.8293 15.7746 15.9208 15.5916C16.0123 15.4086 16.0645 15.3172 15.9208 14.8989C15.7639 14.4676 15.4111 13.5136 15.2804 13.1607C15.1497 12.8078 15.0059 12.7033 14.7576 12.6902C14.5093 12.6771 14.2479 12.6641 14.0519 12.6641C13.8558 12.6641 13.0847 13.1868 12.7841 13.971C12.4835 14.7682 12.4574 17.16 15.1628 19.8523C17.8681 22.5576 20.2468 22.5315 21.044 22.2309C21.8412 21.9303 22.364 21.1592 22.351 20.9632C22.351 20.7802 22.351 20.5057 22.3248 20.2574C22.3117 20.0091 22.2072 19.8784 21.8543 19.7346Z" fill="currentColor"/>
                  <path d="M34.8927 10.2882C34.8143 8.43235 34.5137 7.15155 34.0824 6.04064C33.6381 4.89053 33.0369 3.91032 32.0697 2.94318C31.1026 1.97604 30.1224 1.37485 28.9723 0.930487C27.8614 0.499195 26.5936 0.198597 24.7247 0.120181C22.8558 0.0417639 22.2676 0.015625 17.5104 0.015625C12.7531 0.015625 12.165 0.0417639 10.296 0.120181C8.4271 0.211667 7.15936 0.499195 6.04846 0.930487C4.89834 1.37485 3.91813 1.97604 2.951 2.94318C1.98386 3.91032 1.38266 4.89053 0.938299 6.04064C0.507007 7.15155 0.20641 8.41928 0.127993 10.2882C0.036507 12.1571 0.0234375 12.7453 0.0234375 17.5026C0.0234375 22.2598 0.0495764 22.848 0.127993 24.7169C0.219479 26.5858 0.507007 27.8536 0.938299 28.9645C1.38266 30.1146 1.98386 31.0948 2.951 32.0619C3.91813 33.0291 4.89834 33.6303 6.04846 34.0746C7.15936 34.5059 8.4271 34.8065 10.296 34.8849C12.165 34.9764 12.7531 34.9895 17.5104 34.9895C22.2676 34.9895 22.8558 34.9633 24.7247 34.8849C26.5936 34.8065 27.8614 34.5059 28.9723 34.0746C30.1224 33.6303 31.1026 33.0291 32.0697 32.0619C33.0369 31.0948 33.6381 30.1146 34.0824 28.9645C34.5137 27.8536 34.8143 26.5858 34.8927 24.7169C34.9842 22.848 34.9973 22.2598 34.9973 17.5026C34.9973 12.7453 34.9712 12.1571 34.8927 10.2882ZM27.4301 27.4353L22.6989 25.9585C21.1829 26.8864 19.4054 27.4353 17.4973 27.4353C12.0212 27.4353 7.56451 22.9917 7.56451 17.5026C7.56451 12.0134 12.0081 7.56977 17.4973 7.56977C22.9865 7.56977 27.4301 12.0134 27.4301 17.5026C27.4301 19.4107 26.8942 21.1881 25.9532 22.7042L27.4301 27.4353Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_1641_966">
                    <rect width="35" height="35" fill="white"/>
                  </clipPath>
               </defs>
              </svg>
            </div>
            <div className="icon">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1641_964)">
                  <path d="M34.8927 10.2882C34.8013 8.43235 34.5137 7.15155 34.0824 6.04064C33.6381 4.89053 33.0369 3.91032 32.0697 2.94318C31.1026 1.97604 30.1224 1.37485 28.9723 0.930487C27.8614 0.499195 26.5936 0.198597 24.7247 0.120181C22.8558 0.0286945 22.2676 0.015625 17.5104 0.015625C12.7531 0.015625 12.165 0.0417639 10.296 0.120181C8.44017 0.211667 7.15936 0.499195 6.04846 0.930487C4.89834 1.37485 3.91813 1.97604 2.951 2.94318C1.98386 3.91032 1.38266 4.89053 0.938299 6.04064C0.507007 7.15155 0.20641 8.41928 0.127993 10.2882C0.036507 12.1571 0.0234375 12.7453 0.0234375 17.5026C0.0234375 22.2598 0.0495764 22.848 0.127993 24.7169C0.20641 26.5728 0.507007 27.8536 0.938299 28.9645C1.38266 30.1146 1.98386 31.0948 2.951 32.0619C3.91813 33.0291 4.89834 33.6303 6.04846 34.0746C7.15936 34.5059 8.4271 34.8065 10.296 34.8849C12.165 34.9764 12.7531 34.9895 17.5104 34.9895C22.2676 34.9895 22.8558 34.9633 24.7247 34.8849C26.5936 34.7934 27.8614 34.5059 28.9723 34.0746C30.1224 33.6303 31.1026 33.0291 32.0697 32.0619C33.0369 31.0948 33.6381 30.1146 34.0824 28.9645C34.5137 27.8536 34.8143 26.5858 34.8927 24.7169C34.9842 22.848 34.9973 22.2598 34.9973 17.5026C34.9973 12.7453 34.9712 12.1571 34.8927 10.2882ZM26.1885 10.4189C25.8225 12.1571 25.4435 13.8954 25.0776 15.6336C24.6594 17.6202 24.2281 19.6198 23.8098 21.6064C23.5746 22.7434 23.3263 23.8674 23.091 25.0044C23.0518 25.2135 22.9865 25.4226 22.895 25.6056C22.6859 26.0369 22.3461 26.1807 21.8886 26.063C21.6403 25.9977 21.4181 25.8931 21.209 25.7363C20.0197 24.8607 16.125 21.9462 13.8509 20.2602C13.8509 20.221 13.8771 20.1818 13.9032 20.1557C16.504 17.777 19.1048 15.3984 21.7057 13.0197C21.9801 12.7714 22.2546 12.5231 22.529 12.2617C22.5813 12.2094 22.6336 12.1571 22.6728 12.1049C22.7251 12.0265 22.6989 11.948 22.6075 11.9088C22.4768 11.8566 22.333 11.8827 22.2154 11.935C22.1239 11.9872 22.0324 12.0395 21.9409 12.1049C18.5821 14.2221 15.2232 16.3263 11.8644 18.4436C11.6814 18.5612 11.4853 18.6788 11.3024 18.7964C11.2501 18.8356 11.1978 18.8356 11.1325 18.8226C9.61642 18.3521 8.10036 17.8946 6.5843 17.4241C6.42747 17.3719 6.27064 17.3327 6.12687 17.2673C5.81321 17.1105 5.74786 16.8491 5.93083 16.5485C6.04846 16.3655 6.21836 16.2348 6.4144 16.1564C6.87183 15.9604 7.34233 15.7774 7.81283 15.5944C10.7012 14.4835 13.5895 13.3595 16.4909 12.2486C19.2878 11.1639 22.0847 10.0922 24.8815 9.00741C25.0122 8.95513 25.1429 8.92899 25.2736 8.90285C25.8225 8.81137 26.1623 9.28187 26.2408 9.64781C26.293 9.9092 26.2669 10.1575 26.2146 10.4189H26.1885Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_1641_964">
                    <rect width="35" height="35" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="icon">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1641_961)">
                  <path d="M18.5886 16.3908V16.3516C18.5886 16.3516 18.5625 16.3777 18.5625 16.3908H18.5886Z" fill="currentColor"/>
                  <path d="M34.8927 10.2882C34.8013 8.43235 34.5137 7.15155 34.0824 6.04064C33.6381 4.89053 33.0369 3.91032 32.0697 2.94318C31.1026 1.97604 30.1224 1.37485 28.9723 0.930487C27.8614 0.499195 26.5936 0.198597 24.7247 0.120181C22.8558 0.0286945 22.2676 0.015625 17.5104 0.015625C12.7531 0.015625 12.165 0.0417639 10.296 0.120181C8.44017 0.211667 7.15936 0.499195 6.04846 0.930487C4.89834 1.37485 3.91813 1.97604 2.951 2.94318C1.98386 3.91032 1.38266 4.89053 0.938299 6.04064C0.507007 7.15155 0.20641 8.41928 0.127993 10.2882C0.036507 12.1571 0.0234375 12.7453 0.0234375 17.5026C0.0234375 22.2598 0.0495764 22.848 0.127993 24.7169C0.20641 26.5728 0.507007 27.8536 0.938299 28.9645C1.38266 30.1146 1.98386 31.0948 2.951 32.0619C3.91813 33.0291 4.89834 33.6303 6.04846 34.0746C7.15936 34.5059 8.4271 34.8065 10.296 34.8849C12.165 34.9764 12.7531 34.9895 17.5104 34.9895C22.2676 34.9895 22.8558 34.9633 24.7247 34.8849C26.5936 34.7934 27.8614 34.5059 28.9723 34.0746C30.1224 33.6303 31.1026 33.0291 32.0697 32.0619C33.0369 31.0948 33.6381 30.1146 34.0824 28.9645C34.5137 27.8536 34.8143 26.5858 34.8927 24.7169C34.9842 22.848 34.9973 22.2598 34.9973 17.5026C34.9973 12.7453 34.9712 12.1571 34.8927 10.2882ZM11.8252 27.5791H7.47303V14.4966H11.8252V27.5791ZM9.65563 12.7061H9.62949C8.16571 12.7061 7.22471 11.6997 7.22471 10.445C7.22471 9.19038 8.19185 8.18403 9.68176 8.18403C11.1717 8.18403 12.0865 9.16424 12.1127 10.445C12.1127 11.6997 11.1717 12.7061 9.65563 12.7061ZM27.5085 27.5791H23.1564V20.5739C23.1564 18.8095 22.529 17.6202 20.9476 17.6202C19.7452 17.6202 19.0264 18.4305 18.7128 19.2147C18.5951 19.4891 18.569 19.8812 18.569 20.2733V27.5791H14.2169C14.2169 27.5791 14.2691 15.7251 14.2169 14.4966H18.569V16.3524C19.144 15.4637 20.1765 14.196 22.4898 14.196C25.352 14.196 27.4954 16.0649 27.4954 20.0903V27.5922L27.5085 27.5791Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_1641_961">
                    <rect width="35" height="35" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
