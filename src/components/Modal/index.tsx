import { useState } from 'react';
import Regalo from "../../assets/regalo.png";
import "./index.css"; 
import CustomPaging from "../Slider/index"




const GiftSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);
    const [selectedGift, setSelectedGift] = useState("");

    const handleButtonClick = (value: any) => {
        setButtonClick(value); // Actualiza el estado en el padre
        console.log("Estado de buttonClick en el padre:", value);
    };
    const handleGiftName = (giftName: string[]) => {
        setSelectedGift(giftName.join(", "));
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    console.log(selectedGift, buttonClick);
    



    return (
        <section className='fift-section '>
            <div className='fift-section__content'>
                <img src={Regalo} alt="Regalo" />
                <h1>REGALOS</h1>
                <p>Si deseas regalarme algo más que tu hermosa presencia...</p>
                <button className='fift-section__button button' onClick={toggleModal}>Elegir</button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <button className="modal__close button" onClick={toggleModal}>
                            &times;
                        </button>
                   
                            <>
                                {/* <h2>¡ELIJE TU REGALO!</h2> */}
                                
                                <div style={{ width: "100%"}}>
                                    <CustomPaging
                                        onButtonClick={handleButtonClick}
                                        giftName={handleGiftName}
                                    />
                                </div>
                            </> 

                    </div>
                </div>
            )}
        </section>
    );
};

export default GiftSection;
