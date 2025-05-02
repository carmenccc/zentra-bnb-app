import { useState } from "react";
import "./Slider.scss";

export const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  const [saved, setSaved] = useState(false);
  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img className="right" src="/arrow.png" alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      <div className="bigImage">
        <div className="icon-favor" onClick={handleSave}>
          <svg
            className={saved ? "saved" : ""}
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            viewBox="0 0 16 16"
            // fill="none"
          >
            <path d="M10.3333 2.66669C12.5672 2.66669 14 4.20182 14 6.66669C14 8.59599 12.0477 10.7779 8.18108 13.2799C8.07089 13.3512 7.92911 13.3512 7.81892 13.2799C3.95225 10.7779 2 8.59599 2 6.66669C2 4.20182 3.43279 2.66669 5.66667 2.66669C6.68513 2.66669 7.47312 3.01563 8 3.70384C8.52688 3.01563 9.31487 2.66669 10.3333 2.66669Z" />
          </svg>
        </div>
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
