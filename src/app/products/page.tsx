import { redirect } from "next/dist/server/api-utils"
import { Products } from "./Products"
import type { Metadata } from "next"
import NotFound from "../not-found"

export const metadata: Metadata = {
    title: 'Products'
}

export const revaidate = 3600

const fetchData = async () => {
    const response = await fetch('https://api.example.com/products',{
        cache: 'force-cache',
        next: {
            revalidate: 3600, // 1 hours
        },
    })
    const data = await response.json()
    return data
}

export default async function Page() {

    // const data = await fetchData()

    // if(!data) NotFound()

    return <Products/>
}