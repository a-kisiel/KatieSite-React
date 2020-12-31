import React from "react";
import Lightbox from '../components/Lightbox.jsx';
import Select from 'react-select';
import '../styles/gallery.scss';

var media = [];
var mediaSelections = [];

function createGallery(filterOut) {
    function importAll(r) {
        return r.keys().map(r);
    }
    let artFiles = importAll(require.context('../images/gallery/', false, /\.(jpe?g)$/));
    const imageObjects = [];
    const images = [];
    for (let image of artFiles) {
        let imgObj = {};
        imgObj.src = image.default;
        let name = image.default.split('.')[0].split('static/')[1].split('-')[0].split('/')[1];
        imgObj.medium = name.split('=')[1].replaceAll('_', ' ');
        if (!media.includes(imgObj.medium)) {
            media.push(imgObj.medium);
        }
        if (filterOut && filterOut.includes(imgObj.medium)) {
            continue;
        }
        imgObj.date = name.split('=')[2].replaceAll('$', '/');
        imgObj.year = imgObj.date.split('/')[2];
        imgObj.title = name.split('=')[0].replaceAll('_', ' ');
        imageObjects.push(imgObj)
    }

    for (let m of media) {
        mediaSelections.push({ value: m, label: m })
    }

    const imageFiles = shuffleImages(imageObjects);
    // const imageFiles = imageObjects.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

    for (let image of imageFiles) {
        images.push(<div className='box'><Lightbox source={image.src} name={image.title} medium={image.medium} date={image.date}/></div>)
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
    let gallery = createGallery();
    return (
        <div id='portfolio'>
            <div id='portfolio-header'>
                <h2 id='section-header'>Portfolio</h2>
                <Select
                    id='selector'
                    isMulti
                    defaultValue={'All'}
                    options={mediaSelections}
                />
            </div>

            <div className='gallery-wrapper'>
                {gallery}
            </div>
            <div className='clear'></div>
        </div>
    )
}