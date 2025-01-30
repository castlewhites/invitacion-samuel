import { useState } from "react";
import Slider from "react-slick";
import "./index.css";

// Importa directamente las imágenes
import abstracto1 from "../../assets/regalos/1.png";
import abstracto2 from "../../assets/regalos/2.png";

function CustomPaging({ onButtonClick, giftName }: any) {

  const images = [abstracto1, abstracto2];
  const names = ["ALMOHADA MATERNA", "GIMNASIO PARA BEBÉ"];
  // const [giftsSelections, setGiftsSelections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [giftSelected, setGifSelected] = useState("");


  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={images[i]} alt={`Thumbnail ${i}`} />
        </a>
      );
    },
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (newIndex: number) => {
      setCurrentIndex(newIndex); // Actualiza el índice cuando se cambia el slide
    },
  };

  const handleButtonClick = () => {
    console.log(`Regalo escogido: ${names[currentIndex]}`);
    onButtonClick(true)
    giftName(names[currentIndex])
    setGifSelected(names[currentIndex])

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
      {giftSelected ?
        <>
          <p>Haz seleccionado: {giftSelected}</p>
          <div>
            <button>Aceptar</button>
            <button>Volver a elegir</button>
          </div>
        </> :
        <>
          <button className="select-button" onClick={handleButtonClick}>Escoger</button>
        </>
      }

    </div>
  );
}

export default CustomPaging;
