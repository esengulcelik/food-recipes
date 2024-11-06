import Image from "next/image";
import Header from "@/components/Header";
import Foods from "@/components/foods";
import Country from "@/components/country";
import Footer from "@/components/Footer";
import Banner from "@/components/banner"
import "./globals.css";
export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Foods />
      <Country />
      <Footer />

    </>
  );
}
