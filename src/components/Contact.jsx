import React from 'react';
import '../styles/contact.scss';
import { SiInstagram } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

function getArtistImages() {
    function importAll(r) {
        return r.keys().map(r);
    }
    let artistImages = importAll(require.context('../images/artist/', false, /\.(jpe?g)$/));
    for (let i=0; i<artistImages.length; i++) {
        artistImages[i] = artistImages[i].default
    }
    return artistImages
}

export default function Contact() {
    return (
        <div id='contact'>
            <div id='contacts-holder'>
                <div className='contact-element'>
                    <SiInstagram />
                    <p> : kmkisiel </p>
                </div>
                <div className='contact-element'>
                    <FiMail />
                    <p> : kmkisiel@alfred.edu</p>
                </div>
            </div>
        </div>
    )
}