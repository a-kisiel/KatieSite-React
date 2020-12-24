import { React, useState} from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
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

export default function MenuBar(props) {
    return (
        <div className='menu-wrapper'>
            <Fade>
                <div className='menu-bar'>
                    <div id='signature' className='menu-item' href='#top'><img src={getSig()} alt='Katie Kisiel' /></div>
                    <MediaQuery minWidth={640}>
                        <div className='nav-menu'>
                            <AnchorLink className='menu-item' href='#top'>Home</AnchorLink>
                            <p className='menu-item'> | </p>
                            <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                            <p className='menu-item'> | </p>
                            <AnchorLink className='menu-item' href='#about'>About</AnchorLink>
                        </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={639}>
                        <div className='nav-menu'>
                            <AnchorLink className='menu-item' href='#top'>Home</AnchorLink>
                            <p className='menu-item'> | </p>
                            <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink>
                            <p className='menu-item'> | </p>
                            <AnchorLink className='menu-item' href='#about'>About</AnchorLink>
                        </div>
                    </MediaQuery>
                </div>
            </Fade>
            <div className='clear'></div>
        </div>
    )
}