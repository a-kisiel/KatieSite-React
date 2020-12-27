import { React, useState } from 'react';
import { Fade } from 'react-reveal';
import {Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaBars } from 'react-icons/fa';
import '../styles/menu.scss';

function getSig() {
    function importAll(r) {
        return r.keys().map(r);
    }
    let sign = importAll(require.context('../signature/', false, /\.(png)$/));
    return sign[0].default
}

export default function MenuBar(props) {
    const [width, setWidth] = useState(window.innerWidth);
    window.onresize = () => {
        setWidth(window.innerWidth)
    }
    var isOpen = false;
    let menuComponent = 
    <div className='menu-bar'>
        <div id='signature' className='menu-item' href='#top'><img src={getSig()} alt='Katie Kisiel' /></div>
            <div className='nav-menu'>
                {/* <AnchorLink className='menu-item' href='#top'>Home</AnchorLink>
                <p className='menu-item'> | </p> */}
                <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                <p className='menu-item'> | </p>
                <AnchorLink className='menu-item' href='#about'>About</AnchorLink>
            </div>
    </div>
    if (width < 620) {
        menuComponent = 
        <div className='menu-bar'>
            <Accordion>
                <AccordionSummary id='accordion-button' expandIcon={<FaBars id='hamburger-icon'/>}>
                    <div id='signature' className='menu-item' href='#top'><img src={getSig()} alt='Katie Kisiel' /></div>
                </AccordionSummary>
                <AccordionDetails id='accordion-details'>
                    <div className='nav-menu' style={{margin: 'auto'}}>
                        <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                        <p className='menu-item'> | </p>
                        <AnchorLink className='menu-item' href='#about'>About</AnchorLink>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    }
    return (
        <div className='menu-wrapper'>
            <Fade>
                {menuComponent}
            </Fade>
            <div className='clear'></div>
        </div>
    )
}