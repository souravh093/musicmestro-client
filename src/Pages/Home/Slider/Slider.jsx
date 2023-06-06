import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Pagination } from "swiper";
import axios from "axios";
import { useQuery } from "react-query";
import Container from "../../../components/Shared/Container/Container";

import { SiMinutemailer } from 'react-icons/si';

const Slider = () => {
  const { data: sliderData = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axios("slider.json");
      return res.data;
    },
  });
  console.log(sliderData);
  return (
    <div className="py-10">
      <Container>
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {sliderData.map((slider) => (
            <SwiperSlide key={slider.id}>
              <div className="grid grid-cols-2 items-center justify-between">
                <div>
                  <h2 className="text-4xl font-semibold">{slider.subtitle}</h2>
                  <h1 className="text-7xl font-bold mb-5">{slider.title}</h1>
                  <p className="text-lg max-w-xl mb-5">{slider.description}</p>
                  <button className="bg-violet-700 flex items-center gap-3 text-gray-200 py-3 px-10 rounded-2xl">Discover More <SiMinutemailer /> </button>
                </div>
                <div>
                  <img className="w-full h-[40rem] object-contain" src={slider.image} alt="" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Slider;
