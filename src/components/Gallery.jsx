import React from "react";
import Lightbox from '../components/Lightbox.jsx';
import '../styles/gallery.scss';

function createGallery() {
    function importAll(r) {
        return r.keys().map(r);
    }
    let artFiles = importAll(require.context('../images/gallery/', false, /\.(jpe?g)$/));
    const imageFiles = shuffleImages(artFiles);
    const images = [];
    for (let image of imageFiles) {
        console.log(image.default)
        let name = image.default.split('.')[0].split('static/')[1].split('-')[0].split('/')[1]
        let medium = name.split('=')[1].replaceAll('_', ' ');
        let date = name.split('=')[2].replaceAll('$', '/');
        name = name.split('=')[0].replaceAll('_', ' ')
        images.push(<div className='box'><Lightbox source={image.default} name={name} medium={medium} date={date}/></div>)
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

export default function Gallery() {
    return (
        <div id='portfolio'>
            <h2 id='portfolio-header' className='section-header'>Portfolio</h2>
            <div className='gallery-wrapper'>
                {createGallery()}
            </div>
            <div className='clear'></div>
        </div>
    )
}