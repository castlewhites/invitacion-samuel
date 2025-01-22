import { useEffect } from 'react';
import './landing.css';
import Countdown from "../components/CountDown/index";
import Fiesta from "../assets/fiesta.png";
import Regalo from "../assets/regalo.png";
import Vela from "../assets/vela.png";



export default function Landing() {

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


    return (
        <div className='main-container'>
            <section className="one-section ">
                <div className='one-section__content fade-in'>
                    <h1>SAMUEL CASTIBLANCO CASTILLO</h1>
                    <span>08 DE MARZO DEL 2025</span>
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
                        <p>Granada Club Residencial</p>
                        <p>calle 64j #74b-19</p>
                    </div>
                    <button onClick={() => window.open("https://maps.app.goo.gl/c3pMpXmM8MJESemQ9")}>Ver mapa</button>
                </div>
            </section>
            <section className='fift-section '>
                <div className='fift-section__content fade-in'>
                    <img src={Regalo} alt="" />
                    <h1>REGALOS</h1>
                    <p>Si deseas regalarme algo más que tu hermosa presencia...</p>
                    <button>Elegir</button>
                </div>
            </section>
            <section className='six-section '>
                <div className='six-section__content fade-in'>
                    <img src={Vela} alt="" />
                    <h1>DESEOS Y DONES</h1>
                    <p>Regalame  tus mejores deseos y bendiceme con un don</p>
                    <textarea placeholder='Hola Samuel, soy tu tía {nombre} y te deseo...'></textarea>
                    <button>Enviar</button>
                </div>
            </section>
            <footer className='footer'>
                <p>Creado por MUF</p>
            </footer>
        </div>

    )
}


