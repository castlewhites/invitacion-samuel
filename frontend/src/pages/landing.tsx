import { useEffect, useState } from 'react';
import './landing.css';
import Countdown from "../components/CountDown/index";
import GiftSection from '../components/Modal';
import Fiesta from "../assets/fiesta.png";
import Vela from "../assets/vela.png";
import { useLocation } from "react-router-dom";



export default function Landing() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const familia = params.get("familia") || "Invitado";
    const cupos = params.get("cupos") || "1";
    const [mensaje, setMensaje] = useState("");
    const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(false);
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.2 } // Se activa cuando el 20% del elemento es visible
        );

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const confirmarAsistencia = async () => {
        try {
            const response = await fetch('https://invitacion-samuel.onrender.com/asistencia', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: familia,
                cupos: Number(cupos)
              })
            });
            if (response.ok) {
                setAsistenciaConfirmada(true);
                setTimeout(() => setAsistenciaConfirmada(false), 2000);
            }
            
          } catch (error) {
            console.error('Error enviando asistencia:', error);
          }
    };
    const enviarMensaje = async () => {
        if (!mensaje.trim()) {
            return; // No envía si el mensaje está vacío o solo contiene espacios
        }
        try {
            const response = await fetch('https://invitacion-samuel.onrender.com/deseos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: familia,
                mensaje: mensaje
              })
            });
            if (response.ok) {
                setMensajeEnviado(true);
                setMensaje("");
                setTimeout(() => setMensajeEnviado(false), 2000);
            }
            
          } catch (error) {
            console.error('Error enviando asistencia:', error);
          }

    };


    return (
        <div className='main-container'>
            <section className="one-section ">
                <div className='one-section__content fade-in'>
                    <h1>SAMUEL CASTIBLANCO CASTILLO</h1>
                    <span>08 DE MARZO DEL 2025</span>
                    <div className='hour'>3:00 PM</div>
                    <div className='one-section_content_family'>
                        <p>{familia} </p>
                        <p>CUPOS:  <span>{cupos}</span></p>
                        <div style={{height: "10px"} }>
                            {asistenciaConfirmada && <p className="success-message">¡Asistencia confirmada con éxito!</p>}
                        </div>
                        <button className='button' onClick={confirmarAsistencia} >Confirmar Asistencia</button>
                    </div>
                </div>
            </section>
            <section className='two-section'>
                <div className='two-section__content fade-in'>
                    <Countdown />
                </div>
            </section>
            <section className='three-section '>
                <div className='three-section__content fade-in'>
                    <div>
                        <h1>MIS PAPITOS</h1>
                    </div>
                    <div className='three-section__names'>
                        <p>SEBASTIAN CASTIBLANCO I</p>
                        <span>&</span>
                        <p>SARAH CASTILLO H</p>
                    </div>
                    <div>
                        <p>Están preparando todo para mi llegada y quieren que hagas parte de este momento especial</p>
                    </div>
                </div>
            </section>
            <section className='fourth-section '>
                <div className='fourth-section__content fade-in'>
                    <img src={Fiesta} alt="" />
                    <h1>FIESTA</h1>
                    <div>
                        <p>Granada Club Residencial Int 5</p>
                        <p>Salón comunal piso 1</p>
                    </div>
                    <button className='button' onClick={() => window.open("https://maps.app.goo.gl/c3pMpXmM8MJESemQ9")}>Ver mapa</button>
                </div>
            </section>
            <section className='fift-section '>
                <div className='fift-section__content fade-in '>
                    <GiftSection />
                </div>
            </section>
            <section className='six-section '>
                <div className='six-section__content fade-in'>
                    <img src={Vela} alt="" />
                    <h1>DESEOS Y DONES</h1>
                    <p>Regalame  tus mejores deseos y bendiceme con un don</p>
                    <textarea
                        placeholder='Hola Samuel, soy tu tía {nombre} y te deseo...'
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    ></textarea>
                    <button className='button' onClick={enviarMensaje}>Enviar</button>
                    {mensajeEnviado && <p className="success-message">¡Mensaje enviado con éxito!</p>}
                </div>
            </section>
            <footer className='footer'>
                <p>Creado por MUF</p>
            </footer>
        </div>

    )
}


