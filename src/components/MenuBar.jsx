import React from 'react';
import { Fade } from 'react-reveal';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import '../styles/menu.scss';

export default function() {
    return (
        <div className='sticky'>
            <Fade delay={1000}>
                <div className='menu-bar'>
                    <AnchorLink className='menu-item' href='#top'>Home</AnchorLink>
                    <p className='menu-item'> | </p>
                    <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                    <p className='menu-item'> | </p>
                    <AnchorLink className='menu-item' href='#about'>About</AnchorLink>
                </div>
            </Fade>
            <div className='clear'></div>
        </div>
    )
}