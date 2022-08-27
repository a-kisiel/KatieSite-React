import React, { useState } from "react";
import Lightbox from '../components/Lightbox.jsx';
import Select from 'react-select';
import '../styles/gallery.css';

var media = [];
var mediaSelections = [];

// function importImages() {
//     axios.get('https://' + credentials.cloudinary_key + ':' + credentials.cloudinary_secret + '@api.cloudinary.com/v1_1/akisiel/resources/')
//         .then(imgs => {
//             console.log(imgs)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     let options = {
//         max_results: 200,
//         context: true,
//         metadata: true
//     }
// }

function createGallery(filter) {
    // Clear media lists (otherwise it duplicates everything each time it renders)
    media = []; mediaSelections = [];

    // Helper for importing images
    function importAll(r) {
        return r.keys().map(r);
    }

    let artFiles = importAll(require.context('../images/gallery/', false, /\.(jpe?g)$/));
    const imageObjects = [];
    const images = [];

    for (let image of artFiles) {
        let imgObj = {};
        // Start parsing out metadata from the img filename
        imgObj.src = image;
        let name = image.split('.')[0].split('static/')[1].split('-')[0].split('/')[1];
        imgObj.medium = name.split('=')[1].replaceAll('_', ' ');
        // Gets all the available media
        if (!media.includes(imgObj.medium)) {
            media.push(imgObj.medium);
        }
        // If a filter is being applied, only renders the appropriate elements
        if (filter.length > 0 && !filter.includes(imgObj.medium)) {
            continue;
        }
        // Parses the metadata from 'name' accordingly
        imgObj.date = name.split('=')[2].replaceAll('$', '/');
        imgObj.year = imgObj.date.split('/')[2];
        imgObj.title = name.split('=')[0].replaceAll('_', ' ');
        imageObjects.push(imgObj)
    }

    // Creates elements usable by Select from media
    for (let m of media) {
        mediaSelections.push({ value: m, label: m })
    }

    // Shuffles the order of the images displayed
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
    const [selectedOptions, selectOptions] = useState(null);

    // importImages();

    let selectedMedia = [];
    if (selectedOptions) {
        for (let so of selectedOptions) {
            if (!so) continue;
            selectedMedia.push(so.value)
        }
    }
    let gallery = createGallery(selectedMedia);
    return (
        <div id='portfolio'>
            <div id='portfolio-header'>
                <h2 id='section-header'>Portfolio</h2>
                <Select
                    id='selector'
                    isMulti
                    placeholder='All Media'
                    onChange={selectOptions}
                    options={mediaSelections}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: '5px',
                        colors: {
                            ...theme.colors,
                            primary25: '#6B705C',
                            danger: '#CB997E',
                            dangerLight: '#F44',
                            neutral0: '#151612',
                            neutral10: '#6B705C',
                            neutral80: '#FFE8D6'
                        }
                    })}
                />
            </div>
            <div className='gallery-wrapper'>
                {gallery}
            </div>
            
            <div className='clear'></div>
        </div>
    )
}