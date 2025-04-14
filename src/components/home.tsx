'use client'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
    const btnRef = useRef(null);

    useEffect(()=>{
        ScrollTrigger.create({
            trigger: ".section_two",
            start: "top top",
            end: "bottom top", // когда секция уезжает
            // pin: true,
            scrub: 3,     // Замедление анимации, чем больше, тем плавнее
            pinSpacing: false, // чтобы не добавлялось пустое место
            toggleActions: "play reverse play reverse"
          });

        gsap.to(".animation_scroll", {
            x: '120vw', // Сдвигается на 300px вправо
            ease: "none",
            scrollTrigger: {
                trigger: ".section_one",     // триггер — вся первая секция
                start: "top top",            // начало, когда секция касается верха экрана
                end: "bottom top", 
                scrub: 1,       
                pin: true   
                // конец, когда секция уходит вверх
            }
        });
        gsap.to(".arrow_img_three", {
            x: '200vw', // Сдвигается на 300px вправо
            ease: "none",
            scrollTrigger: {
                trigger: ".section_one",     // триггер — вся первая секция
                start: "top top",            // начало, когда секция касается верха экрана
                end: "bottom top", 
                scrub: 1,          // конец, когда секция уходит вверх
            }
        });
        gsap.fromTo(
            ".arrow_title",
            { opacity: 10, y: 0 },
            {
              opacity: 0,
              y: -70,
              duration: 3,
              scrollTrigger: {
                trigger: ".arrow_title",
                start: "top 20%",
                end: "top top",
                scrub: 1.5,
              },
            }
        );

        let el:any = btnRef.current;

        const onEnter = () => {
          gsap.to(el, { x: 40, duration: 0.5 });
        };
    
        const onLeave = () => {
          gsap.to(el, { x: 0, duration: 0.5 });
        };
    
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
    
        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
    },[])

    return (
        <div className="homeSections">
        
            <section className="section_one">
                <Image src={'/back.png'} alt="logo" width={1440} height={1000} className="section_one_img"/>
                <div className="element_gradient"></div>
                <div className="arrows_scroll">
                    <div className="arrow_img animation_scroll">
                        <Image src={'/Vector_arr.svg'} alt="logo" width={860} height={900} className="arrow_one"/>
                    </div>
                    <div className="arrow_img_two animation_scroll">
                        <Image src={'/Vector_arr.svg'} alt="logo" width={860} height={900} className="arrow_two"/>
                    </div>
                    <div className="arrow_img_three">
                        <Image src={'/Yutong.svg'} alt="logo" width={1105} height={323} className="arrow_three"/>
                    </div>
                    <div className="arrow_title">
                        <h1>надежный партнер</h1>
                        <h2>по пассажирским перевозкам</h2>
                        <button ref={btnRef} className="arrowBtn">Рассчитать стоимость</button>
                    </div>
                </div>
            </section>
    
            <section className="section_two">
               <p className="titles">1234567</p>
            </section>
    
        </div>
    );

}


        // gsap.fromTo(
        //     '.arrow_img_three',
        //     { x: 0, opacity: 1 },
        //     {
        //       x: '220vw', // уходит вправо
        //       opacity: 0,
        //       scrollTrigger: {
        //         trigger: '.moving-box',
        //         start: 'top center',
        //         end: 'bottom top',
        //         scrub: 1,
        //       },
        //     }
        //   );
      
        //   gsap.fromTo(
        //     '.arrow_img_three',
        //     { x: '-220vw', opacity: 0 },
        //     {
        //       x: 0,
        //       opacity: 1,
        //       scrollTrigger: {
        //         trigger: '.moving-box',
        //         start: 'bottom bottom',
        //         end: 'top center',
        //         scrub: 1,
        //       },
        //     }
        //   );