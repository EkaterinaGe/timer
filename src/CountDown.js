import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import tada from './ta-da.mp3';

export default function CountDown() {
    let [h, setH] = useState('00');
    let [m, setM] = useState('00');
    let [s, setS] = useState('00');
    let [slider, setSlider] = useState('00');
    const [play, {stop}] = useSound(tada);

    let [time, setTime] = useState(slider);
    let [isStarted, setIsStarted] = useState(false);
    let [isCount, setIsCount] = useState(true);
    let [isCounting, setIsCounting] = useState(false);

    let timeLeft = {
        hour : ('0' + Math.floor(time / 3600) % 24).slice(-2),
        min : ('0' + Math.floor(time / 60) % 60).slice(-2),
        sec : ('0' + time % 60).slice(-2)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            isStarted && setTime((time) => (time >= 1 ? time - 1 : 0))
            if (time === 0) { 
                setIsCounting(false);
                let anima = document.querySelector('.anima');
                anima.style.border = 'none';
                anima.classList.add('reset');
                anima.classList.remove('start');
                setIsStarted(false); 
            }
            if (time === 1) play(); 
        }, 1000)

        return () => {
            clearInterval(interval);
            if (time === 0) {
                stop();
            }
        }
    }, [time, isStarted, play, stop]);

    let sAnima = +h * 3600 + +m * 60 + +s;

    const startCountdown = () => {
        setIsCounting(true);
        setIsStarted(true);
        isCount && setTime(slider);
        let anima = document.querySelector('.anima');
        anima.style.animationDuration = `${sAnima}s`;
        anima.style.border = '3px solid white';
        anima.style.animationPlayState = 'running';
        anima.classList.remove('reset');
        anima.classList.add('start');
    };

    const stopCountdown = () => {
        setIsCount(false);
        let anima = document.querySelector('.anima');
        anima.style.animationPlayState = 'paused';
        anima.classList.remove('reset');
        anima.classList.remove('start');
        setIsStarted(false);
    };

    const resetCountdown = () => {
        setIsCount(true);
        let anima = document.querySelector('.anima');
        anima.style.border = 'none';
        anima.classList.add('reset');
        anima.classList.remove('start');
        setIsStarted(false);
        setTime(slider);
        setIsCounting(false);
    };

    const handleHourChange = (event) => {
        let value = event.target.value;
        setH(('0' + value % 60).slice(-2));
        setSlider(+value * 3600 + +m * 60 + +s);
        resetCountdown()
    };

    const handleMinChange = (event) => {
        let value = event.target.value;
        setM(('0' + value % 60).slice(-2));
        setSlider(+h * 3600 + +value * 60 + +s);
        resetCountdown()
    };

    const handleSecChange = (event) => {
        let value = event.target.value;
        setS(('0' + value % 60).slice(-2));
        setSlider(+h * 3600 + +m * 60 + +value);
        resetCountdown()
    };

    const handleSliderChange = (event) => {
        let value = event.target.value;
        setSlider(value);
        setS(value % 60);
        setM(Math.floor(value / 60) % 60);
        setH(Math.floor(value / 3600) % 24);
        resetCountdown()
    };

    return <div className="clock">
        <h1 className="name">Countdown</h1>
        <div className="timer">
            {isCounting ? (
                <div className="count">
                    <div className="time">{timeLeft.hour}:{timeLeft.min}:{timeLeft.sec}</div>
                    <div className='total'>Total {h}:{m}:{s}</div>
                </div>
            ) : (
                <form className="count">
                    <div>
                        <input className="hours" type='number' 
                            maxLength="2" min="0" max="24" onChange={handleHourChange} value={h}/>:
                        <input className="minutes" type='number' 
                            maxLength="2" min="0" max="59" onChange={handleMinChange} value={m}/>:
                        <input className="seconds" type='number' 
                            maxLength="2" min="0" max="59" onChange={handleSecChange} value={s}/>
                    </div>
                    <input className="slider" type="range" 
                        min="0" max="86400" onChange={handleSliderChange} value={slider}/>
                </form>
            )}
            <div className="anima"></div>
        </div>
        <div className="buttons">
            {isStarted ? (
                <button onClick={stopCountdown} className="button">Stop</button>
            ) : (
                <button onClick={startCountdown} className="button">Start</button>
            )}
            <button onClick={resetCountdown} className="button">Reset</button>
        </div>
    </div>
}