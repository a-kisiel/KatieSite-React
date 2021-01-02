import React, { useState } from 'react';
import MenuBar from '../components/MenuBar';
import Bobbing from '../components/Bobbing';
import '../styles/greeting.scss';

function getWallpaper() {
    function importAll(r) {
        return r.keys().map(r);
    }

    let wallpapers = importAll(require.context('../images/wallpapers/', false, /\.(jpe?g)$/));
    let w = {}
    w.src = wallpapers[Math.floor(Math.random() * wallpapers.length)].default
    w.name = w.src.split('.')[0].split('static/')[1].split('-')[0].split('/')[1]
    w.name = w.name.replaceAll('_', ' ')
    return w
}

var wall = getWallpaper();

export default function Greeting () {
    const [opacity, setOpacity] = useState(1);
    const [show, toggleComponent] = useState(false);

    
    window.onscroll = () => {
        let yo = window.pageYOffset;
        let vh = window.innerHeight;
        if (yo > vh) {
            setOpacity(0);
            return;
        }
        console.log(yo)
        setOpacity((vh - yo) / vh);
    }

    setTimeout(() => {
        toggleComponent(!show);
    }, 1800);
    
    return (
        <div>
            <MenuBar name={wall.name}/>
            <div id='greeting' style={{ backgroundImage: `url(${wall.src})`, opacity: (opacity + .2)}}>
                <div className='greeting-title-wrapper' style={{ opacity: opacity }}>
                    <div className='greeting-title'>{wall.name}</div>
                    <Bobbing show={show}/>
                </div>
            </div>
        </div>
    )
}