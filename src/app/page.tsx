import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeSection from "@/components/home";


export default function Home() {
  
  return (
    <div className="home">

      <Header/>

      <HomeSection/>

    </div>
  );
}
