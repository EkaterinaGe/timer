import { useEffect, useState } from 'react';

export default function StopWatch() {

    let [time, setTime] = useState(0);
    let [isStarted, setIsStarted] = useState(false);

    let timeLeft = {
        hour : ('0' + Math.floor(time / 360000) % 24).slice(-2),
        min : ('0' + Math.floor(time / 6000) % 60).slice(-2),
        sec : ('0' + Math.floor(time / 100) % 60).slice(-2),
        ms : ('0' + time % 1000).slice(-2) 
    }

    useEffect(() => {
        const interval = setInterval(() => {
            isStarted && setTime((time) => time + 1)
        }, 10)

        return () => {
            clearInterval(interval);
        }
    }, [isStarted]);

    const startStopWatch = () => {
        let anima = document.querySelector('.animation');
        anima.classList.remove('reset');
        anima.classList.add('start');
        setIsStarted(true);
    };

    const stopStopWatch = () => {
        let anima = document.querySelector('.animation');
        anima.classList.remove('reset');
        anima.classList.remove('start');
        setIsStarted(false);
    };

    const resetStopWatch = () => {
        let anima = document.querySelector('.animation');
        anima.classList.add('reset');
        anima.classList.remove('start');
        setIsStarted(false);
        setTime(0);
    };

    return <div className="clock">
        <h1 className="name">Timer</h1>
        <div className="timer">    
            <div className="time">{timeLeft.hour}:{timeLeft.min}:{timeLeft.sec}.{timeLeft.ms}</div>
            <div className="animation"></div>
        </div>
        <div className="buttons">
            {isStarted ? (
                <button onClick={stopStopWatch} className="button">Stop</button>
            ) : (
                <button onClick={startStopWatch} className="button">Start</button>
            )}
            <button onClick={resetStopWatch} className="button">Reset</button>
        </div>
    </div>
}