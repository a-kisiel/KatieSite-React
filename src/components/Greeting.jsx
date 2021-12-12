import React, { useState } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import MenuBar from '../components/MenuBar';
import Bobbing from '../components/Bobbing';
import '../styles/greeting.css';

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
    const [desOpacity, setDesOpacity] = useState(1);
    const [show, toggleComponent] = useState(false);

    window.onscroll = () => {
        let yo = window.pageYOffset;
        let vh = window.innerHeight;
        if (yo > vh) {
            setOpacity(0);
            return;
        }
        setOpacity((vh - yo) / vh);
        setDesOpacity((vh - yo) / (yo * 40));
    }

    setTimeout(() => {
        toggleComponent(!show);
    }, 1800);

    let topacity = Math.abs(1-opacity);
    
    return (
        <div>
            <MenuBar name={wall.name}/>
            <div id='greeting' style={{ backgroundImage: `url(${wall.src})`, opacity: (opacity + .2)}}>
                <div className='greeting-title-wrapper' style={{ opacity: desOpacity }}>
                    <div className='greeting-title'>{wall.name}</div>
                    <Bobbing show={show}/>
                </div>
            </div>
            <AnchorLink id='top-button' href='#top'><BsArrowUpShort id='toTheTop' style={{ opacity: topacity }} /></AnchorLink>
        </div>
    )
}