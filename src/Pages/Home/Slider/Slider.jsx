import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import axios from "axios";
import { useQuery } from "react-query";
import Container from "../../../components/Shared/Container/Container";
import { SiMinutemailer } from "react-icons/si";
import bg from "../../../assets/bg.jpg"

const Slider = () => {
  const { data: sliderData = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axios("slider.json");
      return res.data;
    },
  });
  return (
    <div className="py-10"  style={{ backgroundImage: `url(${bg})` }}>
      <Container>
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {sliderData.map((slider) => (
            <SwiperSlide key={slider.id}>
              <div className="grid md:grid-cols-2 items-center justify-between">
                <div>
                  <h2 className="text-4xl font-semibold dark:text-black">{slider.subtitle}</h2>
                  <h1 className="text-7xl font-bold mb-5 dark:text-black">{slider.title}</h1>
                  <p className="text-lg max-w-xl mb-5 dark:text-black">{slider.description}</p>
                  <button className="bg-violet-700 dark:hover:shadow-xl dark:bg-gray-800 flex items-center gap-3 text-gray-200 py-3 px-10 rounded-2xl">
                    Discover More <SiMinutemailer />{" "}
                  </button>
                </div>
                <div>
                  <img
                    className="w-full h-[40rem] object-contain"
                    src={slider.image}
                    alt=""
                  />
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
