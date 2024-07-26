import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./IMG/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return (
            <div key={index} className={classes.hero_img}>
              <img src={imageItemLink} alt={`Slide ${index}`} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
