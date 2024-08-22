import { React, useState } from 'react';
import { Fade } from 'react-reveal';
import {Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaBars, FaEtsy } from 'react-icons/fa';
import { SiInstagram } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import '../styles/menu.css';

export default function MenuBar(props) {
    const [width, setWidth] = useState(window.innerWidth);

    window.onresize = () => {
        setWidth(window.innerWidth)
    }

    let menuComponent = 
        <div className='menu-bar'>
            <div id='signature' className='menu-item' href='#top'><img src='https://katieart.s3.us-east-2.amazonaws.com/signature.png' alt='Katie Kisiel' /></div>
                <div className='nav-menu'>
                    <AnchorLink className='menu-item' href='#atlas'>Portfolio</AnchorLink>
                    <p className='menu-item'> | </p>
                    <Accordion
                        style={{margin: 'auto'}}
                    >
                        <AccordionSummary id='contact-button'>
                            <div className='menu-item' style={{marginLeft: '-12px'}}>Contact</div>
                        </AccordionSummary>
                        <AccordionDetails className='contact-expanded'>
                            <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'><SiInstagram className='contact-icon'/> kmkisiel</a>
                            <a href='mailto:katiekisiel6@gmail.com' target='_blank' rel='noreferrer' className='external-link'><FiMail className='contact-icon'/> katiekisiel6@gmail.com</a>
                            <a href="" target='_blank' rel='noreferrer' className='external-link' style={{pointerEvents : 'none', opacity: '.5'}}><FaEtsy className='contact-icon' /> Store (coming soon)</a>
                        </AccordionDetails>
                    </Accordion>
                </div>
        </div>
    if (width < 620) {
        menuComponent = 
            <div className='menu-bar'>
                <Accordion>
                    <AccordionSummary id='accordion-button' expandIcon={<FaBars id='hamburger-icon'/>}>
                        <div id='signature' className='menu-item' href='#top'><img src='https://katieart.s3.us-east-2.amazonaws.com/signature.png' alt='Katie Kisiel' /></div>
                    </AccordionSummary>
                    <AccordionDetails id='accordion-details'>
                        <div className='nav-menu' style={{margin: 'auto'}}>
                            <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                            <p className='menu-item'> | </p>
                            {/* <AnchorLink className='menu-item' href='#contact'>Contact</AnchorLink> */}
                            <Accordion>
                                <AccordionSummary id="contact-button" style={{color: '#DEE2E6'}}>Contact</AccordionSummary>
                                <AccordionDetails className='contact-expanded'>
                                    <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'><SiInstagram className='contact-icon'/> kmkisiel</a>
                                    <a href='mailto:katiekisiel6@gmail.com' target='_blank' rel='noreferrer' className='external-link'><FiMail className='contact-icon'/> katiekisiel6@gmail.com</a>
                                    <a href="" target='_blank' rel='noreferrer' className='external-link' style={{pointerEvents : 'none', opacity: '.5'}}><FaEtsy className='contact-icon' /> Store (coming soon)</a>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
    }
    return (
        <div className='menu-wrapper' style={{height: '60px'}}>
            <Fade>
                {menuComponent}
            </Fade>
            <div className='clear'></div>
        </div>
    )
}