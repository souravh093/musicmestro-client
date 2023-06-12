import React from "react";
import Slider from "./Slider/Slider";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructor from "./PopularInstructor/PopularInstructor";
import { Helmet } from "react-helmet-async";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

const Home = () => {
  return (
    <>
        <Helmet>
          <title>MusicMaestro | Home</title>
        </Helmet>
        <Slider />
        <PopularClass />
        <PopularInstructor />
        <UpcomingEvents />
    </>
  );
};

export default Home;


