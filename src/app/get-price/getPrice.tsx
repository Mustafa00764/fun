'use client'
import Image from 'next/image'
import styles from './getPrice.module.css'
import MouseFollower from '@/components/ui/MouseFollower'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface Btns {
    id: number,
    title: string
}

export function GetPrice() {
    const [brand, setBrand] = useState<string>('')
    const [offer, setOffer] = useState<string>('')

    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [coords2, setCoords2] = useState({ x: 0, y: 0 });
    const [isHovered2, setIsHovered2] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const buttonRef2 = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseMove2 = (e: React.MouseEvent) => {
        if (!buttonRef2.current) return;
        const rect = buttonRef2.current.getBoundingClientRect();
        setCoords2({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const branding: Btns[] = [
        {
            id: 1,
            title: "Corporate",
        },
        {
            id: 2,
            title: "Product",
        },
        {
            id: 3,
            title: "Personal",
        },
        {
            id: 4,
            title: "Support",
        }
    ]

    const offers: Btns[] = [
        {
            id: 1,
            title: "Naming",
        },
        {
            id: 2,
            title: "Logo",
        },
        {
            id: 3,
            title: "Identity",
        },
        {
            id: 4,
            title: "Brand Guidelines",
        },
        {
            id: 5,
            title: "Website",
        },
        {
            id: 6,
            title: "Content Design",
        },
    ]

    return <div className={styles.getPrice}>
        <MouseFollower/>
        <header className={styles.header}>
            <Image src={'/mini_black_logo.svg'} alt="logo" width={69} height={40} className="mini_logo" />
            <Image src={'/logo_black.svg'} alt="logo" width={218} height={32} className="logo" />
            <Link href={'/'}>
                <button
                    ref={buttonRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative overflow-hidden rounded-full text-[var(--background)] bg-[var(--white-color)] px-5 py-[2px] text-[14px] leading-[34px]"
                    
                 >
                    <span
                        className="absolute w-17 h-17 bg-[var(--orenge-color)] rounded-full transition-all duration-500 ease-out"
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
                        Closed
                    </span>
                </button>
            </Link>
        </header>
        <div className={styles.forms}>
            <h1>Request for <br className="brr"/>a commercial<br className="br"/> offer</h1>
            <div className="gp_btns">
            <div className="btn">
                <div className={styles.btn1}>
                    <h2>What’s Your Branding?</h2>
                    <div className={styles.btns_container}>
                        {
                            branding.map((item)=>{
                                return(
                                    <button key={item.id} onClick={()=>setBrand(item.title)} className={brand === item.title?styles.btnBlack:styles.btnB}>{item.title}</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.btn2}>
                    <h2>What We Offer</h2>
                    <div className={styles.btns_container}>
                        {
                            offers.map((item)=>{
                                return(
                                    <button key={item.id} onClick={()=>setOffer(item.title)} className={offer === item.title?styles.btnBlack:styles.btnB}>{item.title}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`${styles.gp_form}`}>
                <h1>Order <br className="brr"/> a service</h1>
                <form className={`${styles.GPform}`}>
                    <input required type="text" placeholder="Name"/>
                    <input required type="tel" placeholder="Phone"/>
                    <input required type="email" placeholder="Email"/>
                    <div className={styles.gp_buttons}>
                        <button
                            ref={buttonRef2}
                            onMouseMove={handleMouseMove2}
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                            className="relative max-[769px]:min-w-[73px] min-w-[112px] max-[769px]:text-[14px] max-[769px]:py-[2px] max-[769px]:px-5 overflow-hidden rounded-full text-[var(--background)] bg-[var(--white-color)] px-[30px] py-[10px] text-[22px] leading-[34px]"
                        >
                            <span
                                className="absolute w-19 h-19 bg-[var(--orenge-color)] rounded-full transition-all duration-500 ease-out"
                                style={{
                                    top: coords2.y,
                                    left: coords2.x,
                                    transform: `translate(-50%, -50%) scale(${isHovered2 ? 3 : 0})`,
                                    opacity: isHovered2 ? 1 : 0,
                                    pointerEvents: 'none',
                                    zIndex: 0,
                                }}
                            />
                            <span className="relative z-10">
                                Send
                            </span>
                        </button>
                        <p>By clicking on the «Send» button, I consent to the processing of personal data</p>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
}