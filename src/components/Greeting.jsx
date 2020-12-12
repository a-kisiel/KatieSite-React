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

export default function () {
    const [state, setState] = useState(1);
    window.onscroll =()=>{
        const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
        if (this.state.currentScrollHeight != newScrollHeight){
            this.setState({currentScrollHeight: newScrollHeight})
        }
      }
    let wall = getWallpaper();
    return (
        <div>
            <div id='greeting' style={{ backgroundImage: `url(${wall.src})` }}>
                <div className='greeting-title-wrapper'>
                    <div className='greeting-title'>{wall.name}</div>
                    <IoIosArrowDropdownCircle id='down-icon'></IoIosArrowDropdownCircle>
                </div>
            </div>
        </div>
    )
}