import { useState, useEffect } from "react";
import Slider from "react-slick";
import "./index.css";
import { useLocation } from "react-router-dom";

interface Gift {
  id: number;
  name: string;
  cupos: number;
  image_url: string;
}

interface CustomPagingProps {
  onButtonClick: (selected: boolean) => void;
  giftName: (name: string[]) => void;
}

function CustomPaging({ onButtonClick, giftName }: CustomPagingProps) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [existingFamily, setExistingFamily] = useState(false);
  const [giftsFromDB, setGiftsFromDB] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const familia = params.get("familia") || "Invitado";

  useEffect(() => {
    const consultarRegalos = async () => {
      try {
        const response = await fetch("http://localhost:8000/regalos/list", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error en la consulta: ${response.status}`);
        }

        const data: Gift[] = await response.json();
        console.log("Regalos consultados:", data);
        setGifts(data);
      } catch (error) {
        console.error("Error consultando regalos:", error);
      }
    };
    const consultarRegalosElegidos = async () => {
      try {
        const response = await fetch("http://localhost:8000/regalos/elegidos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error en la consulta: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data)) {
          const existeFamilia = data.find(f => f.name === familia);
     

          if (existeFamilia) {
            setExistingFamily(true)
            setGiftsFromDB(existeFamilia.gifts);
          } else {
            setExistingFamily(false)
          }
        }
      } catch (error) {
        console.error("Error consultando regalos:", error);
      }
    };


    consultarRegalosElegidos()
    consultarRegalos();
  }, []);



  const settings = {
    customPaging: (i: number) => (
      <a>{gifts[i] && <img src={gifts[i].image_url} alt={`Thumbnail ${i}`} />}</a>
    ),
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setCurrentIndex(newIndex);
    },
  };

  const handleGiftSelection = () => {
    if (gifts.length === 0) return;

    const selectedGift = gifts[currentIndex];

    // Verificar si ya está seleccionado
    const isAlreadySelected = selectedGifts.some((gift) => gift.id === selectedGift.id);

    if (isAlreadySelected) {
      // Si ya está, lo eliminamos
      const updatedSelection = selectedGifts.filter((gift) => gift.id !== selectedGift.id);
      setSelectedGifts(updatedSelection);
      giftName(updatedSelection.map((g) => g.name)); 
    } else {
      // Si no está, lo agregamos
      const updatedSelection = [...selectedGifts, selectedGift];
      setSelectedGifts(updatedSelection);
      giftName(updatedSelection.map((g) => g.name));
    }

    onButtonClick(selectedGifts.length > 0);
  };


  const enviarRegalos = async () => {
    try {
      const response = await fetch('http://localhost:8000/regalo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: familia,
          regalos: selectedGifts.map((gift) => gift.name)
        })
      });
      console.log("response", response);
      if (response.ok) {
        console.log("Regalos enviados con éxito.");
        window.location.reload()
        
      } 
      const data = await response.json();

      if(data.detail || data.message != "Regalos guardados correctamente"){
        alert(data.detail)

      }      

    } catch (error) {
      console.error('Error enviando regalos:', error);
    }
  };

  return (
    <div className="slider-container">
      <h2>{existingFamily ? "REGALOS SELECCIONADOS" : "¡ELIJE TU REGALO!"} </h2>
      {gifts.length > 0 ? (
        <>
          {selectedGifts.length > 0 && (
            <div style={{ marginTop: "20px" }} className="selected-gifts">

              <h3>REGALOS SELECCIONADOS:</h3>
              <ul>
                {selectedGifts.map((gift) => (
                  <li key={gift.id}>
                    {gift.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <>
            {existingFamily ?
              <>
                <div style={{ marginTop: "20px" }} className="selected-gifts">
                  <ul>
                    {giftsFromDB.split(",").map((gift, index) => (
                      <li key={index}>{gift.trim()}</li>
                    ))}
                  </ul>

                </div>

              </> :
              <>
                <Slider {...settings}>
                  {gifts.map((gift) => (
                    <div key={gift.id} className="gift-slide">
                      <img src={gift.image_url} alt={gift.name} />
                    </div>
                  ))}
                </Slider>
                <button style={{ backgroundColor: "#fff" }} className="select-button button" onClick={handleGiftSelection}>
                  {selectedGifts.some((gift) => gift.id === gifts[currentIndex].id)
                    ? "Quitar"
                    : "Escoger"}
                </button>
                {selectedGifts.length > 0 &&
                  <button style={{ margin: "0 6px" }} className="select-button button" onClick={enviarRegalos}>
                    Finalizar
                  </button>
                }
              </>

            }

          </>


        </>
      ) : (
        <p>No hay regalos disponibles</p>
      )}
    </div>
  );
}

export default CustomPaging;
