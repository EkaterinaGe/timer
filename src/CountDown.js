import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import tada from './ta-da.mp3';
import Input from './Input';

export default function CountDown() {
    const [play, {stop}] = useSound(tada);
    let [h, setH] = useState('00');
    let [m, setM] = useState('00');
    let [s, setS] = useState('00');
    let [slider, setSlider] = useState('00');
    let sAnima = +h * 3600 + +m * 60 + +s;
    let [time, setTime] = useState(sAnima);
    let [isStarted, setIsStarted] = useState(false);
    let [isCount, setIsCount] = useState(true);
    let [isCounting, setIsCounting] = useState(false);

    let timeLeft = {
        hour : ('0' + Math.floor(time / 3600) % 24).slice(-2),
        min : ('0' + Math.floor(time / 60) % 60).slice(-2),
        sec : ('0' + time % 60).slice(-2)
    }
    if (time === '86400') timeLeft.hour = 24;

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

    const startCountdown = () => {
        setIsCounting(true);
        setIsStarted(true);
        isCount && setTime(sAnima);
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
        setTime(sAnima);
        setIsCounting(false);
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
                <Input
                    h={h}
                    m={m}
                    s={s}
                    slider={slider}
                    setH={setH}
                    setM={setM}
                    setS={setS}
                    setSlider={setSlider}
                />
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