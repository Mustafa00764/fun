import { redirect } from "next/dist/server/api-utils"
import type { Metadata } from "next"
import Services from "./Services"


export const metadata: Metadata = {
    title: 'Services'
}

export default async function Page() {

    return <Services/>
}
