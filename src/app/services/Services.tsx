'use client'

import Footer from "@/components/footer"
import Header from "@/components/header"
import MouseFollower from "@/components/ui/MouseFollower"
import styles from './Services.module.css'
import { useState } from "react"

interface Btns {
    id: number,
    title: string
}

const Services = () => {
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

    const words: string[] = [
        `Corporate identity`, 'Product identity', 'Personal identity',
        'Brand support', 'Naming', 'Logo', 'Packaging', 'Brand guidelines',
        'UI/⁠UX', 'Key Visual', 'Content design'
      ];
    return (
        <div className={styles.Services}>
            <Header/>
            <MouseFollower/>
            <main className="main">
                <section className={styles.sectionSOne}>
                    <div className="sectionOne">
                        <h1 className="" >Services —</h1>
                        <p className={styles.s_hover_titles}>
                            {
                                words.map((item, index)=>{
                                    return (
                                        <span key={index}>
                                        <span className={styles.s_hover_title} >{item}</span>
                                        {index<10?",":''}
                                        </span>
                                    )
                                })
                            }
                        </p>
                    </div>
                </section>
                <section className={styles.sectionSTwo}>
                    <div className={`${styles.forms} forms`}>
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
                        <div className={`${styles.s_form}`}>
                            <h1>Order <br className="brr"/> a service</h1>
                            <form className={`${styles.Sform}`}>
                                <input required type="text" placeholder="Name"/>
                                <input required type="tel" placeholder="Phone"/>
                                <input required type="email" placeholder="Email"/>
                                <div className={styles.s_buttons}>
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
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Services