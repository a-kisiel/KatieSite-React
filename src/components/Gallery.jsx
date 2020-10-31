import React from "react";
import Lightbox from '../components/Lightbox.jsx';
import '../styles/gallery.scss';

function createGallery() {
    function importAll(r) {
        return r.keys().map(r);
    }
    let artFiles = importAll(require.context('../images/gallery/', false, /\.(jpe?g)$/));
    let wallpapers = importAll(require.context('../images/wallpapers/', false, /\.(jpe?g)$/));
    const imageFiles = shuffleImages(artFiles.concat(wallpapers));
    const images = [];
    for (let i=0; i<imageFiles.length; i++) {
        let name = imageFiles[i].default.split('.')[0].split('static/')[1].split('-')[0].split('/')[1].replaceAll('_', ' ')
        images.push(<div className='box'><Lightbox source={imageFiles[i].default} name={name} /></div>)
    }

    return images
}

function shuffleImages(imgArr) {
    var j, x, i;
    for (i = imgArr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = imgArr[i];
        imgArr[i] = imgArr[j];
        imgArr[j] = x;
    }
    return imgArr
}

export default function () {
    return (
        <div>
            <h2 id='portfolio-header'>Portfolio</h2>
            <div id='portfolio' className='gallery-wrapper'>
                {createGallery()}
            </div>
            <div className='clear'></div>
        </div>
    )
}