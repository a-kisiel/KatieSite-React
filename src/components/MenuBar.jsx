import React from 'react';
import { Fade } from 'react-reveal';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import '../styles/menu.scss';

function getSig() {
    function importAll(r) {
        return r.keys().map(r);
    }
    let sign = importAll(require.context('../signature/', false, /\.(png)$/));
    return sign[0].default
}

export default function() {
    return (
        <div menu-wrapper>
            <Fade>
                <div className='menu-bar'>
                    <AnchorLink id='signature' className='menu-item' href='#top'><img src={getSig()} /></AnchorLink>
                    <div className='nav-menu'>
                        <AnchorLink className='menu-item' href='#top'>Home</AnchorLink>
                        <p className='menu-item'> | </p>
                        <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                        <p className='menu-item'> | </p>
                        <AnchorLink className='menu-item' href='#about'>About</AnchorLink>
                    </div>
                </div>
            </Fade>
            <div className='clear'></div>
        </div>
    )
}