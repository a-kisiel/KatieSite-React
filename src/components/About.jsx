import React from 'react';
import '../styles/about.scss';

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

export default function About() {
    return (
        <div id='about-section'>
            <h2 id='about' className='section-header'>About</h2>
            <div className='clear'></div>
            <div className='bio-wrapper'>
                <img id='artist1' src={getArtistImages()[0]} className='artist-image' alt=''></img>
                <p id='artist-bio'>
                    Hello.
                </p>
            </div>
            <div className='clear'></div>
        </div>
    )
}