import './landing.css';
import Countdown from "../components/CountDown/index";
import Fiesta from "../assets/fiesta.png";



export default function Landing() {


    return (
        <div className='main-container'>
            <section className="one-section">
                <div className='one-section__content'>
                    <h1>SAMUEL CASTIBLANCO CASTILLO</h1>
                    <span>08 DE MARZO DEL 2025</span>
                </div>
            </section>
            <section className='two-section'>
                <div>
                    <Countdown />
                </div>
            </section>
            <section className='three-section'>
                <div className='three-section__content'>
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
            <section className='fourth-section'>
                <div className='fourth-section__content'>
                    <img src={Fiesta} alt="" />
                    <h1>FIESTA</h1>
                    <p>Granada Club Residencial</p>
                    <p>calle 64j #74b-19</p>
                    <button>Ver mapa</button>
                </div>
            </section>
        </div>

    )
}


