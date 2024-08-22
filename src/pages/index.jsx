import {React, useState} from 'react';
import { Helmet } from 'react-helmet';
import Atlas from '../components/Atlas.jsx';
import Gallery from '../components/Gallery.jsx';
import Greeting from '../components/Greeting.jsx';
import Lightbox from '../components/Lightbox.jsx';
import MenuBar from '../components/MenuBar.jsx';
import '../styles/main.css';

const local = false; // debugging
let webp = null;

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

function webpSupported() {
  const elem = document.createElement('canvas');
 
  if (!!(elem.getContext && elem.getContext('2d')))
  {
   // was able or not to get WebP representation
   return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  else
  {
   // very old browser like IE 8, canvas not supported
   return false;
  }
 }

// const metadata = require('../metadata.json');

export default function Index() {

  const [galleryType, setGalleryType] = useState();
  const [showAtlas, toggleShowAtlas] = useState(true);
  const [metadata, setMetaData] = useState({});

  if (isEmpty(webp))
    webp = webpSupported();

  if (isEmpty(metadata)) {
    fetch('https://katieart.s3.us-east-2.amazonaws.com/metadata.json').then(r => {
      return r.json();
    }).then(data => {
      setMetaData(data);
    });
  }

  return !isEmpty(metadata) ?
    <div id='top'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Katie Kisiel</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <MenuBar local={local} />
      <Greeting
        data={metadata}
      />
      <Atlas
        showAtlas={showAtlas}
        toggleShowAtlas={toggleShowAtlas}
        galleryType={galleryType}
        setGalleryType={setGalleryType}
      />
      <Gallery
        showAtlas={showAtlas}
        toggleShowAtlas={toggleShowAtlas}
        galleryType={galleryType}
        webp={webp}
        data={metadata}
        local={local}
      />
      <Lightbox />
    </div>
    :
    <div></div>
}