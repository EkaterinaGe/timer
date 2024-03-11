import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import tada from './ta-da.mp3';
import Input from './Input';

export default function CountDown() {
    const [play] = useSound(tada);
    const [h, setH] = useState('00');
    const [m, setM] = useState('00');
    const [s, setS] = useState('00');
    const [slider, setSlider] = useState('00');
    let sAnima = +h * 3600 + +m * 60 + +s;
    const [time, setTime] = useState(sAnima);
    const [isStarted, setIsStarted] = useState(false);
    const [isCount, setIsCount] = useState(true);
    const [isInput, setIsInput] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const timeLeft = {
        hour : ('0' + Math.floor(time / 3600) % 24).slice(-2),
        min : ('0' + Math.floor(time / 60) % 60).slice(-2),
        sec : ('0' + time % 60).slice(-2)
    }
    if (time === '86400') timeLeft.hour = 24;

    useEffect(() => {
        const interval = setInterval(() => {
            isStarted && setTime((time) => (time >= 1 ? time - 1 : 0))
            if (time === 0) { 
                setIsInput(false);
                setIsStarted(false); 
                setIsReset(true);
            }
            if (time === 1) play(); 
        }, 1000)

        !isStarted && clearInterval(interval);

        return () => {
            clearInterval(interval);
        }
    }, [time, isStarted, play]);

    const startCountdown = () => {
        setIsInput(true);
        setIsStarted(true);
        setIsReset(false);
        isCount && setTime(sAnima);
    };

    const stopCountdown = () => {
        setIsCount(false);
        setIsStarted(false);
    };

    const resetCountdown = () => {
        setIsCount(true);
        setIsStarted(false);
        setTime(sAnima);
        setIsInput(false);
        setIsReset(true);
    };

    const animaStyle = {
        animationName: 'timer',
        animationDirection: 'reverse',
        animationTimingFunction: 'linear',
        animationIterationCount: 1,
        animationPlayState: isStarted ? 'running' : 'paused',
        animationDuration: `${sAnima}s`
    }

    return <div className='clock'>
        <h1 className='name'>Countdown</h1>
        <div className='timer'>
            {isInput ? (
                <div className='count'>
                    <div className='time'>{timeLeft.hour}:{timeLeft.min}:{timeLeft.sec}</div>
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
            {isReset ? (
                <div 
                    className='anima'
                    style={{animationName: 'none'}}
                ></div>
            ) : (
                <div  
                    className='anima'
                    style={animaStyle}
                ></div>
            )}
        </div>
        <div className='buttons'>
            {isStarted ? (
                <button onClick={stopCountdown} className='button'>Stop</button>
            ) : (
                <button onClick={startCountdown} className='button'>Start</button>
            )}
            <button onClick={resetCountdown} className='button'>Reset</button>
        </div>
    </div>
}