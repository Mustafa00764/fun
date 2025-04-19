import Footer from "@/components/footer";
import Header from "@/components/header";
import HomeSection from "@/components/home";
import MouseFollower from "@/components/ui/MouseFollower";

export default function Home() {

  return (
    <div className="home">

      <MouseFollower/>

      <Header/>

      <HomeSection/>

      <Footer/>

    </div>
  );
}
