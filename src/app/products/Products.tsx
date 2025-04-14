'use client'
import Image from 'next/image'
import styles from './Products.module.css'

export function Products() {
    return <div className={styles.ps}>
        Products
        <Image src={"/next.svg"} alt='' width={200} height={50} />
    </div>
}