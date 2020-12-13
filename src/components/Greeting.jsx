import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import '../styles/greeting.scss';

function getWallpaper() {
    function importAll(r) {
        return r.keys().map(r);
    }

    let wallpapers = importAll(require.context('../images/wallpapers/', false, /\.(jpe?g)$/));
    let w = {}
    w.src = wallpapers[Math.floor(Math.random() * wallpapers.length)].default
    w.name = w.src.split('.')[0].split('static/')[1].split('-')[0].split('/')[1].replaceAll('_', ' ')
    return w
}

var wall = getWallpaper();

export default function () {
    const [opacity, setOpacity] = useState(1);
    window.onscroll = () => {
        let yo = window.pageYOffset;
        let vh = window.innerHeight;
        if (yo > vh) return;
        setOpacity((vh - yo) / vh);
    }
    
    return (
        <div>
            <div id='greeting' style={{ backgroundImage: `url(${wall.src})`, opacity: (opacity + .2)}}>
                <div className='greeting-title-wrapper' style={{ opacity: opacity }}>
                    <div className='greeting-title'>{wall.name}</div>
                    <IoIosArrowDropdownCircle id='down-icon'></IoIosArrowDropdownCircle>
                </div>
            </div>
        </div>
    )
}