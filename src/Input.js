import React from 'react';

export default function Input({ h, m, s, slider, setH, setM, setS, setSlider }) {

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'hours') {
            setH(('0' + value % 24).slice(-2));
            setSlider(value * 3600 + +m * 60 + +s);
        } else if (name === 'minutes') {
            setM(('0' + value % 60).slice(-2));
            setSlider(+h * 3600 + value * 60 + +s);
        } else if (name === 'seconds') {
            setS(('0' + value % 60).slice(-2));
            setSlider(+h * 3600 + +m * 60 + +value);
        } else if (name === 'slider') {
            setSlider(value);
            setH(('0' + Math.floor(value / 3600) % 24).slice(-2));
            setM(('0' + Math.floor(value / 60) % 60).slice(-2));
            setS(('0' + value % 60).slice(-2));
        }
        console.log(slider)
    };

    return (
        <form className="count">
            <div>
                <input
                    className="hours"
                    name="hours"
                    type='number'
                    maxLength="2"
                    min="0"
                    max="24"
                    onChange={handleInputChange}
                    value={h}
                />:
                <input
                    className="minutes"
                    name="minutes"
                    type='number'
                    maxLength="2"
                    min="0"
                    max="59"
                    onChange={handleInputChange}
                    value={m}
                />:
                <input
                    className="seconds"
                    name="seconds"
                    type='number'
                    maxLength="2"
                    min="0"
                    max="59"
                    onChange={handleInputChange}
                    value={s}
                />
            </div>
            <input
                className="slider"
                name="slider"
                type="range"
                min="0"
                max="86400"
                onChange={handleInputChange}
                value={slider}
            />
        </form>
    );
}
