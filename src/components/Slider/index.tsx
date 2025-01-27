
import Slider from "react-slick";
import "./index.css"

// Importa directamente las imágenes
import abstracto1 from "../../assets/regalos/1.png";
import abstracto2 from "../../assets/regalos/2.png";


function CustomPaging() {
  const images = [abstracto1, abstracto2]; // Array con las imágenes

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={images[i]} alt={`Thumbnail ${i}`} />
        </a>
      );
    },
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <button>Escoger</button>
    </div>
  );
}

export default CustomPaging;

