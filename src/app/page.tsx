"use client";
import { useState } from "react";
import Cart from "./components/frontend/Cart";
import NavBar from "./components/frontend/NavBar";
import Hero from "./components/frontend/Hero";
import Feature from "./components/frontend/Feature";
import TrendingProduct from "./components/frontend/TrendingProduct";
import Banner from "./components/frontend/Banner";
import Footer from "./components/frontend/Footer";
export default function Home() {
  const [showCart, setShowCart] = useState(false);
  return (
    <main className="">
      <NavBar setShowCart={setShowCart}/>
      {showCart && <Cart setShowCart={setShowCart}/>}
      <Hero/>
      <Feature/>
      <TrendingProduct/>
      <Banner/>
      <Footer/>

    </main>
  );
}
