import { redirect } from "next/dist/server/api-utils"
import { Products } from "./Products"
import type { Metadata } from "next"
import NotFound from "../not-found"

export const metadata: Metadata = {
    title: 'Products'
}

export default async function Page() {

    // const data = await fetchData()

    // if(!data) NotFound()

    return <Products/>
}
