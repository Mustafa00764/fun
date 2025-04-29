import AnimatedWord from "@/components/anim";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HomeSection from "@/components/home";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import MouseFollower from "@/components/ui/MouseFollower";

export default function Home() {

  return (
    <div className="home cursor-none">

      <MouseFollower/>

      {/* <AnimatedWord/> */}

      <Header/>

      <SmoothScrollProvider>
        <HomeSection/>
      </SmoothScrollProvider>

      <Footer/>

    </div>
  );
}
