'use client'
import Image from 'next/image'
import styles from './getPrice.module.css'
import MouseFollower from '@/components/ui/MouseFollower'
import Link from 'next/link'
import { useState } from 'react'

interface Btns {
    id: number,
    title: string
}

export function GetPrice() {
    const [brand, setBrand] = useState<string>('')
    const [offer, setOffer] = useState<string>('')

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
            <div className={`${styles.btns} button-container`}>
                <span className="mas">Closed</span>
                <button type="button" name="Hover" className="">Closed</button>
            </div>
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
                        <div className="button-container">
                            <span className="mas">Send</span>
                            <button type="button" name="Hover" id="footer_send">Send</button>
                        </div>
                        <p>By clicking on the «Send» button, I consent to the processing of personal data</p>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
}