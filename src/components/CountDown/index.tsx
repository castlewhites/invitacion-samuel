import React, { useEffect, useState } from 'react';
import "./index.css"


const Countdown: React.FC = () => {
    const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number, seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date('March 8, 2025 00:00:00').getTime();

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeDifference = targetDate - currentTime;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeRemaining({ days, hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='countdown-container'>
            <h1>Falta</h1>
            <div className="countdown">
                <div className="countdown-item">
                    <span>{String(timeRemaining.days).padStart(2, '0')}</span>
                    <p>Días</p>
                </div>
                <div className="countdown-item">
                    <span>{String(timeRemaining.hours).padStart(2, '0')}</span>
                    <p>hs</p>
                </div>
                <div className="countdown-item">
                    <span>{String(timeRemaining.minutes).padStart(2, '0')}</span>
                    <p>min</p>
                </div>
                <div className="countdown-item">
                    <span>{String(timeRemaining.seconds).padStart(2, '0')}</span>
                    <p>seg</p>
                </div>
            </div>
        </div>
    );
};

export default Countdown;