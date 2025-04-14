'use client'

import Image from "next/image"


export default function Header() {
    return <header className="header">
        <Image src={'/compassLogo_white.svg'} alt="logo" width={218} height={33} className="logo"/>
        <div className="navbar">
            <p>Заказать</p>
            <p>Услуги</p>
            <p>О компании</p>
            <p>Контакты</p>
        </div>
        <div className="number">
            <p>+7 985 282 02 92</p>
        </div>
        <div>
            <button className="hBtn">заказать звонок</button>
        </div>
    </header>
}