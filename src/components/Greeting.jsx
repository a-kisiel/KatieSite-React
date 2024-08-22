import React, { useState } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Bobbing from '../components/Bobbing';
import '../styles/greeting.css';

function getWallpaperOld() {
    // function importAll(r) {
    //     return r.keys().map(r);
    // }

    // let wallpapers = importAll(require.context('../images/wallpapers/', false, /\.(jpe?g)$/));
    // let w = {}
    // w.src = wallpapers[Math.floor(Math.random() * wallpapers.length)].default
    // w.name = w.src.split('.')[0].split('static/')[1].split('-')[0].split('/')[1]
    // w.name = w.name.replaceAll('_', ' ')
    // return w
}

function getWallpaperLocal(wallpapers) {
    return [];
    // Helper for importing images
    // function importAll(r) {
    //     return r.keys().map(r);
    // }

    // const local_images = importAll(require.context('../images/new_gallery/', false, /\.(jpe?g)$/));

    // const w_key = Object.keys(wallpapers)[Math.floor(Math.random() * wallpapers.length)];
    // const wall = wallpapers[w_key];
    // wall.name = wall.title;
    // wall.src = local_images.find(i => wall.hash == i.default.match(/media\/([0-9A-Z]+)./)[1])?.default;

    // return wall;
}

function getWallpaper(wallpapers) {
    const w_key = Object.keys(wallpapers)[Math.floor(Math.random() * wallpapers.length)];
    const wall = wallpapers[w_key];
    wall.name = wall.titla;
    wall.src = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/wallpapers/${wall.hash}.webp`;

    return wall;
}

var wall;

export default function Greeting (props) {
    const [opacity, setOpacity] = useState(1);
    const [desOpacity, setDesOpacity] = useState(1);
    const [topacity, setTopacity] = useState(0);
    const [show, toggleComponent] = useState(false);
    const [css, setCSS] = useState({})
    const finalBackgroundOpacity = .1;

    window.onscroll = () => {
        return;
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
    }
    
    if (!wall) {
        if (props.data?.pieces) {
            const wallpapers = [];
            Object.keys(props.data.pieces).forEach(k => {
                if (props.data.pieces[k].wallpaper) {
                    const w = props.data.pieces[k];
                    w.hash = k;
                    wallpapers.push(w);
                }
            });
            // wall = getWallpaperLocal(wallpapers);
            wall = getWallpaper(wallpapers);
            const bc = {backgroundImage: `url(${wall.src})`};
            if (wall.wallpaper_style) {
                const styles = wall.wallpaper_style.split(';');
        
                styles.forEach(s => {
                    const s_split = s.split(':');
                    bc[s_split[0].trim()] = s_split[1]?.trim();
                });
            }
            setCSS(bc);
        }
        else
            wall = {};
    }

    setTimeout(() => {
        toggleComponent(!show);
    }, 1800);
    
    return (
        <div id='greeting' style={css}>
            <div className='greeting-title-wrapper' style={{ opacity: desOpacity }}></div>
            <div style={{display: 'flex', flexDirection: 'column', margin: 'auto auto 0 auto', width: '100%'}}>
                <div className='greeting-title'>{wall.name}</div>
                <Bobbing show={show}/>
            </div>
            <AnchorLink id='top-button' href='#top'><BsArrowUpShort id='toTheTop' style={{ opacity: topacity }} /></AnchorLink>
        </div>
    )
}