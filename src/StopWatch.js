import React, { useEffect, useState, useMemo } from 'react';

export default React.memo(function StopWatch() {

    const [time, setTime] = useState(0); 
    const [isStarted, setIsStarted] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const timeLeft = useMemo(() => {
        const hour = ('0' + Math.floor(time / 360000) % 24).slice(-2);
        const min = ('0' + Math.floor(time / 6000) % 60).slice(-2);
        const sec = ('0' + Math.floor(time / 100) % 60).slice(-2);
        const ms = ('0' + time % 1000).slice(-2);
        return { hour, min, sec, ms };
    }, [time]);

    useEffect(() => {
        const interval = setInterval(() => {
            isStarted && setTime((time) => time + 1)
        }, 10)

        !isStarted && clearInterval(interval);

        return () => {
            clearInterval(interval);
        }
    }, [isStarted]);

    return <div className='clock'>
        <h1 className='name'>Timer</h1>
        <div className='timer'>    
            <div className='time'>{timeLeft.hour}:{timeLeft.min}:{timeLeft.sec}.{timeLeft.ms}</div>
            {isReset ? (
                <div className='animation reset'></div>
            ) : (
                <div className={isStarted ? 'animation start' : 'animation'}></div>
            )}
        </div>
        <div className='buttons'>
            {isStarted ? (
                <button onClick={() => setIsStarted(false)} className='button'>Stop</button>
            ) : (
                <button onClick={() => {setIsStarted(true); setIsReset(false)}} className='button'>Start</button>
            )}
            <button onClick={() => {setIsStarted(false); setTime(0); setIsReset(true)}} className='button'>Reset</button>
        </div>
    </div>
})