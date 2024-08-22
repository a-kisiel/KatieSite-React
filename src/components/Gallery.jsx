import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import Lightbox from './Lightbox.jsx';
import Contact from './Contact.jsx';
import Select from 'react-select';
import AWS from 'aws-sdk';
import '../styles/gallery.css';

/* Config/debug */
const local = false;

// S3 config/init
AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
});

const bucket_params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
}

const s3 = new AWS.S3();

export default function Gallery(props) {
    const [filters, setFilters] = useState(null);
    const [coll, setColl] = useState({});
    const [year, setYear] = useState({});

    useEffect(() => {
        if (filters)
            return;
    });

    // Populate coll so collection drawers are open by default
    if ((!coll || Object.keys(coll)?.length < 1) && props.data?.collections) {
        const cs = {};
        Object.keys(props.data.collections).forEach(c => cs[props.data.collections[c].title] = true);
        setColl(cs);
    }
    // Same as above for date drawers
    if ((!year || Object.keys(year)?.length < 1)) {
        const ys = {};
        if (props.data?.pieces)
            Object.keys(props.data.pieces).forEach(pk => {
                const piece = props.data?.pieces[pk];
                if (piece && piece.date) {
                    const lio = piece.date.lastIndexOf('/');
                    const date = piece.date.substr(lio + 1);
                    ys[date] = true;
                }
            });
        setYear(ys);
    }

    // const pieces = local ? getImagesLocal(props) : getImages(props);
    const pieces = getImages(props);
    const media_list = props.data?.media;
    const media = [];
    if (media_list)
        Object.values(media_list).forEach((m, k) => media.push({
            'value': k,
            'label': m
        }));

    function getImages() {
        if (!props.data?.pieces)
            return [];
    
        const images = props.data?.pieces;

        let image_objects = [];
    
        Object.keys(images).forEach(k => {
            if (!images[k].hash) {
                delete images[k];
                return;
            }
            const image = images[k];
            const webpVersion = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${image.hash}.webp`;
            const pngVersion = `https://katieart.s3.us-east-2.amazonaws.com/uncompressed/${image.hash}.png`;
            const imgObj = {
                hash: image.hash,
                srcset: props.webp ? `${webpVersion}, ${pngVersion}` : `${pngVersion}, ${webpVersion}`,
                ...props.data?.pieces[image.hash]
            };
            image_objects.push(imgObj);
        });
        return image_objects;
    };
    
    function getImagesLocal() {
        return [];
        // Helper for importing images
        // function importAll(r) {
        //     return r.keys().map(r);
        // }
    
        // let local_images = importAll(require.context('../images/new_gallery/', false, /\.(jpe?g)$/));
    
        // let image_objects = [];
    
        // for (let image of local_images) {
        //     const hash = image.default.match(/media\/([0-9A-Z]+)./);
        //     const imgObj = {
        //         hash: hash[1],
        //         srcset: `${image.default}, ${image.default}`,
        //         ...props.data?.pieces[hash[1]]
        //     };
        //     image_objects.push(imgObj);
        // }
        // return image_objects;
    }

    function generateCollectionsGallery() {
        let total = 0;
        if (!props?.data?.collections || !props?.data?.pieces)
            return <div className='gallery-wrapper'>No things</div>;
    
        const collections = props.data.collections;
        // Order collections by starting date
        const c_keys = Object.keys(collections).sort((a,b) => {
            const a_split = collections[a].initial_date.split('/');
            const b_split = collections[b].initial_date.split('/');

            let a_date, b_date;

            // Month/year
            if (a_split.length === 2)
                a_date = new Date(a_split[1], +a_split[0] - 1);
            // Month/day/year
            if (a_split.length === 3)
                a_date = new Date(a_split[2], +a_split[0] - 1, a_split[1]);
            if (b_split.length === 2)
                b_date = new Date(b_split[1], +b_split[0] - 1);
            // Month/day/year
            if (b_split.length === 3)
                b_date = new Date(b_split[2], +b_split[0] - 1, b_split[1]);

            return a_date < b_date;
        });
    
        const divs = [];
        c_keys.forEach(k => {
            // Get pertinent pieces
            const p_keys = Object.keys(pieces).filter(p => {
                const piece = pieces[p];
                if (!piece?.collections || piece.omitFromGallery)
                    return false;
                if (!(pieces[p].collections.includes(parseInt(k)) || pieces[p].collections.includes(k)))
                    return false;
                return true;
            });

            let lightboxes = [];
            p_keys.forEach(p => {
                const piece = pieces[p];
                const p_media = piece.media;
                piece.media = [];
                p_media?.forEach(m => piece.media.push(media_list[m]));
                lightboxes.push(<div className='box'>
                    <Lightbox
                        source={piece.srcset}
                        name={piece.title}
                        media={piece.media}
                        date={piece.date}
                    />
                </div>)
            });
    
            total += lightboxes.length;

            const collection = collections[k];
            divs.push(<div>
                <div
                    id={'collection-' + k}
                    className={`collection-wrap ${!coll[collection.title] ? 'collapsed' : ''}`}
                >
                    <div className='collection-header' onClick={() => {setColl(coll => ({...coll, [collection.title]: !coll[collection.title]}));}}>
                        <div className='collection-title'>{collection.title}</div>
                        <div className='collection-date'>{collection.initial_date} - {collection.end_date}</div>
                    </div>
                    <div className='gallery-wrapper'>
                        {lightboxes}
                    </div>
                </div>
            </div>);
        });
        // console.log('collections:', total)
        return divs;
    };

    function generateDateGallery() {
        let total = 0;
        let years = [];
        const filter_values = [];
        filters?.forEach(f => filter_values.push(+f.value));
        Object.keys(pieces).forEach(k => {
            if (!pieces[k].hash || pieces[k].hash === undefined) {
                delete pieces[k];
                return;
            }
            const p = pieces[k];
            if (!p.date || p.omitFromGallery)
                return;

            const split = p.date.split('/');
            const year = +split[split.length-1];
            if (!years.includes(year))
                years.push(year);
        });
        years.sort((a,b) => a < b);

        const divs = [];
        years.forEach(y => {
            const p_keys = Object.keys(pieces).filter(k => {
                const piece = pieces[k];
                if (piece.omitFromGallery)
                    return false;
                // Active filters
                if (filter_values?.length > 0) {
                    if (!piece.media)
                        return false;
                    if (!piece.media.some(m => filter_values.some(v => v == m)))
                        return false;
                }

                const split = piece.date?.split('/');
                const year = +split[split.length-1];
                return year === y;
            });
            let lightboxes = [];
            p_keys.forEach(p => {
                const piece = pieces[p];
                const p_media = piece.media;
                piece.media = [];
                p_media?.forEach(m => piece.media.push(media_list[m]));
                lightboxes.push(<div className='box'>
                    <Lightbox
                        source={piece.srcset}
                        name={piece.title}
                        media={piece.media}
                        date={piece.date}/>
                </div>)
            });

            total += lightboxes.length;
    
            const collection = y;
            divs.push(<div>
                <div
                    id={'year-' + y}
                    className={`collection-wrap ${!year[y] ? 'collapsed' : ''}`}
                >
                    <div className='collection-header' onClick={() => {setYear(year => ({...year, [y]: !year[y]}));}}>
                        <div className='collection-title'>&nbsp;</div>
                        <div className='collection-date'>{collection}</div>
                    </div>
                    <div className='gallery-wrapper'>
                        {lightboxes}
                    </div>
                </div>
            </div>);
        });
        // console.log('date:', total)
        return divs;
    };

    function generateGeneralGallery() {
        let total = 0;
        const divs = [];
        const filter_values = [];
        filters?.forEach(f => filter_values.push(+f.value));
        const p_keys = Object.keys(pieces).filter(p => {
            if (pieces[p].omitFromGallery)
                return false;
            // Active filters
            if (filter_values?.length > 0) {
                if (!pieces[p].media)
                    return false;
                if (!pieces[p].media.some(m => filter_values.some(v => v == m)))
                    return false;
            }
            return true;
        });

        let lightboxes = [];
        p_keys.forEach(p => {
            const piece = pieces[p];
            const p_media = piece.media;
            piece.media = [];
            p_media?.forEach(m => piece.media.push(media_list[m]));
            lightboxes.push(<div className='box'>
                <Lightbox
                    source={piece.srcset}
                    name={piece.title}
                    media={piece.media}
                    date={piece.date}
                />
            </div>)
        });

        total += lightboxes.length;

        divs.push(<div>
            <div id='collection-all' className='collection-wrap'>
                <div className='gallery-wrapper'>
                    {lightboxes}
                </div>
            </div>
        </div>);
        // console.log('general:', total)
        return divs;
    };

    let title = null;
    const visibleFilters = [];

    if (props.galleryType === 'collection') {
        visibleFilters.push('collection');
    }
    if (props.galleryType === 'year') {
        visibleFilters.push('media');
    }
    if (props.galleryType === 'all') {
        visibleFilters.push('media')
    }

    const toggleAtlas = (p = false) => {
        if (!props.showAtlas &&  !p)
            return
        props.toggleShowAtlas(true);
    };

    const collectionGallery = props.galleryType === 'collection' ? generateCollectionsGallery() : null;
    const dateGallery = props.galleryType === 'year' ? generateDateGallery() : null;
    const generalGallery = props.galleryType === 'all' ? generateGeneralGallery() : null;

    return (
        <div id='portfolio' className={!props.showAtlas ? '' : 'hidden'}>
            <div id='portfolio-header'>
                <h2 id='section-header'>{title}</h2>
                <div className='filter-wrapper' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div onClick={() => toggleAtlas(true)} id='back-home'><BsArrowLeftShort className='back-home-icon' /> Back</div>
                    <Select
                        id='selector'
                        className={visibleFilters.includes('media') ? '' : 'hidden'}
                        isMulti
                        placeholder='All Media'
                        onChange={setFilters}
                        options={media}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: '5px',
                            colors: {
                                ...theme.colors,
                                primary25: '#CED4DA',
                                danger: '#F8F9FA',
                                dangerLight: '#F22',
                                neutral0: '#E9ECEF',
                                neutral10: '#CED4DA',
                                neutral80: '#343A40'
                            }
                        })}
                    />
                </div>
            </div>

            {props.galleryType === 'collection' ? collectionGallery : null}
            {props.galleryType === 'year' ? dateGallery : null}
            {props.galleryType === 'all' ? generalGallery : null}

            <Contact />
            <div className='clear'></div>
        </div>
    )
}