import { useState } from 'react';
import Regalo from "../../assets/regalo.png";
import "./index.css"; // Tus estilos personalizados
import CustomPaging from "../Slider/index"




const GiftSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    return (
        <section className='fift-section '>
            <div className='fift-section__content'>
                <img src={Regalo} alt="Regalo" />
                <h1>REGALOS</h1>
                <p>Si deseas regalarme algo más que tu hermosa presencia...</p>
                <button className='fift-section__button' onClick={toggleModal}>Elegir</button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <h2>¡Elige tu regalo!</h2>
                        <div style={{width: "100%", height: "400px"}}>
                            <CustomPaging />
                        </div>
                        <button className="close-button" onClick={toggleModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GiftSection;
