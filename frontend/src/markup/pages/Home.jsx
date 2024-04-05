import React from "react";
import Banner from "../components/BottomBanner/BottomBanner";
import AboutUs from "../components/Aboutus/AboutUs";
import Service from "../components/Service/Service";
import Features from "../components/Features/Features";
import Service2 from "../components/Service/Service2";
import AboutUs2 from "../components/Aboutus/AboutUs2";
import AboutUs3 from "../components/Aboutus/AboutUs3";
function Home(props) {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Service />
      <Features />
      <Service2 />
      <AboutUs2 />
      <AboutUs3 />
    </div>
  );
}

export default Home;
