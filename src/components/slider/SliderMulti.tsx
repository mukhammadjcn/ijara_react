import React from "react";
import Slider from "react-slick";
import Card from "src/components/home/card";
import { NextArrow, PrevArrow } from "src/assets/icons";

function SliderMulti({ data }: { data: any }) {
  const settings = {
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    initialSlide: 0,
    centerPadding: "24px",
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {data.map((item: any, index: number) => (
        <Card key={index} data={item} />
      ))}
    </Slider>
  );
}

export default SliderMulti;
