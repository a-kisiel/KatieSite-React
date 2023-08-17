import React, { useEffect, useState } from 'react';
import Lightbox from '../components/Lightbox.jsx';
import Select from 'react-select';
import AWS from 'aws-sdk';
import credentials from '../credentials';
import '../styles/gallery.css';
import { ContinuationEventFilterSensitiveLog } from '@aws-sdk/client-s3';

const shuffle = true;
const media = [];
const gallery = {};

// S3 config/init
AWS.config.update({
    accessKeyId: credentials.ACCESS_ID,
    secretAccessKey: credentials.ACCESS_KEY,
    region: credentials.REGION,
});
const s3 = new AWS.S3();

const bucket_params = {
    Bucket: credentials.BUCKET_NAME,
}

/**
 * Create initial gallery with all images (use once)
 */
async function initGallery(webpSupport) {
    let s3_images = [];

    // Jankily wait for list of all imgs in bucket
    await new Promise((resolve) => {
        s3.listObjectsV2(bucket_params, async (err, data) => {
            if (!err) {
                for (let i=1; i<data.Contents.length; i++) {
                    if (data.Contents[i].Key === 'uncompressed/' || data.Contents[i].Key === 'webps/')
                        continue;

                    // Use webp url if applicable
                    if (webpSupport && data.Contents[i].Key.startsWith('uncompressed'))
                        continue;
                    else if (!webpSupport && data.Contents[i].Key.startsWith('webps'))
                        continue;

                    if (data.Contents[i].Key.includes('_'))
                    if (data.Contents[i].Key) {
                        const url = 'https://katieart.s3.us-east-2.amazonaws.com/' + data.Contents[i].Key;
                        s3_images.push({
                            'srcset': url,
                            ...parseMetaDataFromTitle(data.Contents[i].Key)
                        });
                    }
                }
                resolve();
            }
        });
    });

    if (shuffle) {
        s3_images = shuffleImages(s3_images);
    }

    getMedia(s3_images);

    let tagged_images = [];
    for (let image of s3_images) {
        tagged_images.push(<div className='box' key={image.srcset}><Lightbox source={image.srcset} name={image.title} medium={image.medium} date={image.date}/></div>)
    }

    return tagged_images;
}

async function initGalleryLocal() {
    
    // Helper for importing images
    function importAll(r) {
        return r.keys().map(r);
    }

    let local_images = importAll(require.context('../images/gallery/', false, /\.(jpe?g)$/));

    let image_objects = [];

    for (let image of local_images) {
        let imgObj = {};
        // Start parsing out metadata from the img filename
        imgObj.src = image;
        let name = image.split('.')[0].split('static/')[1].split('-')[0].split('/')[1];
        imgObj.medium = name.split('=')[1].replaceAll('_', ' ');
        // Parses the metadata from 'name' accordingly
        imgObj.date = name.split('=')[2].replaceAll('$', '/');
        imgObj.year = imgObj.date.split('/')[2];
        imgObj.title = name.split('=')[0].replaceAll('_', ' ');
        image_objects.push(imgObj)
    }

    getMedia(image_objects);

    if (shuffle) {
        image_objects = shuffleImages(image_objects);
    }

    let tagged_images = [];
    for (let image of image_objects) {
        tagged_images.push(<div className='box'><Lightbox source={image.srcset} name={image.title} medium={image.medium} date={image.date}/></div>)
    }
    return tagged_images;    
}

function parseMetaDataFromTitle(art) {
    const metadata = art.split('=');
    const date = (metadata[2].split('.')[0].indexOf('$') > -1) ?
        metadata[2].split('.')[0].replaceAll('$', '/') :
        metadata[2].split('.')[0].replaceAll('_', ' ');

    return {
        title: metadata[0].split('/')[1].replaceAll('_', ' '),
        medium: metadata[1].replaceAll('_', ' '),
        date
    }
}

function shuffleImages(images) {
    var j, x, i;
    for (i = images.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = images[i];
        images[i] = images[j];
        images[j] = x;
    }
    return images
}

/**
 * Populates media list from found images
 */
function getMedia(image_objects) {
    if (media.length || !image_objects)
        return;
    let media_count = {};
    image_objects.forEach(io => {
        if (!media_count.hasOwnProperty(io.medium)) {
            media_count[io.medium] = 0;
        }
        else if (media_count.hasOwnProperty(io.medium)) {
            media_count[io.medium]++;
        }
    })
    
    for (let medium of Object.keys(media_count)) {
        media.push({ 'value': medium, 'label': medium })
    }
}

/**
 * Returns a subset of the full_gallery based on filter params
 */
function filter(filters, full_gallery) {
    if (!filters)
        return full_gallery;
    let parsed_filters = [];
    for (let filter of filters) {
        parsed_filters.push(filter.value);
    }
    let filtered_gallery = [];
    full_gallery.forEach(item => {
        if (parsed_filters.includes(item.props.children.props.medium))
            filtered_gallery.push(item);
    })
    return filtered_gallery;
}

var full_gallery = null;

export default function Gallery(props) {
    const [gallery, setGallery] = useState(null);
    const [filters, setFilters] = useState(null);
    
    useEffect(() => {
        if (!full_gallery) {
            initGallery(props.webpSupport)
            .then((g) => {
                full_gallery = g;
                setGallery(g);
            });
            // initGalleryLocal()
            // .then((g) => {
            //     full_gallery = g;
            //     setGallery(g);
            // });
        }
        setGallery(filter(filters, full_gallery));
    }, [filters])

    return (
        <div id='portfolio'>
            <div id='portfolio-header'>
                <h2 id='section-header'>Portfolio</h2>
                <Select
                    id='selector'
                    isMulti
                    placeholder='All Media'
                    onChange={setFilters}
                    options={media}
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