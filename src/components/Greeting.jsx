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
    const [topacity, setTopacity] = useState(0);
    const [show, toggleComponent] = useState(false);
    const finalBackgroundOpacity = .1;

    window.onscroll = () => {
        let yo = window.pageYOffset;
        let vh = window.innerHeight;
        if (yo > vh) {
            setOpacity(finalBackgroundOpacity);
            setDesOpacity(0);
            return;
        }
        const o = (vh - yo) / vh - .4;
        setOpacity(o >= finalBackgroundOpacity ? o : finalBackgroundOpacity);
        setDesOpacity((vh - yo) / (yo * 40));
        setTopacity(1 - opacity - .4);
    }

    setTimeout(() => {
        toggleComponent(!show);
    }, 1800);
    
    return (
        <div>
            <MenuBar name={wall.name}/>
            <div id='greeting' style={{ backgroundImage: `url(${wall.src})`, opacity: (opacity)}}>
                <AnchorLink href='#portfolio' className='greeting-title-wrapper' style={{ opacity: desOpacity, textDecoration: 'none' }}>
                    <div className='greeting-title'>{wall.name}</div>
                    <Bobbing show={show}/>
                </AnchorLink>
            </div>
            <AnchorLink id='top-button' href='#top'><BsArrowUpShort id='toTheTop' style={{ opacity: topacity }} /></AnchorLink>
        </div>
    )
}