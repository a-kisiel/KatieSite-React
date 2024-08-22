import { React, useState, useEffect } from 'react';
import { BsArrowRightShort } from 'react-icons/bs'
import '../styles/atlas.css';
import Contact from './Contact';


export default function Atlas(props) {

    const changeGallery = (mode) => {
        props.setGalleryType(mode);
        props.toggleShowAtlas(!props.showAtlas);
    };

    return (
        <div id='atlas' className={props.showAtlas ? '' : 'hidden'}>
            <div>
                <div onClick={() => changeGallery('collection')} className='portfolio-link'><span>View Collections</span><span><BsArrowRightShort /></span></div>
                <div onClick={() => changeGallery('year')} className='portfolio-link'><span>View By Year</span><span><BsArrowRightShort /></span></div>
                <div onClick={() => changeGallery('all')} className='portfolio-link'><span>View All</span><span><BsArrowRightShort /></span></div>
            </div>
            <div>

            </div>
            <Contact />
        </div>
    )
}