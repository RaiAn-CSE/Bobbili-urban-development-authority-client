import React from "react";
import CarouselImgOne from "../../../assets/images/DTCP-1.jpg";

const Carousel = () => {
  return (
    <div className="mx-4">
      <div className="w-full h-full">
        <img
          src={CarouselImgOne}
          alt="img"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
};

export default Carousel;
