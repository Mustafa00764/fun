import { redirect } from "next/dist/server/api-utils"
import type { Metadata } from "next"
import {GetPrice} from './getPrice'


export const metadata: Metadata = {
    title: 'Get Price'
}

export default async function Page() {

    return <GetPrice/>
}
