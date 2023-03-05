import { WebsiteConfigurationFilterSensitiveLog } from '@aws-sdk/client-s3';
import React from 'react';
import { Helmet } from 'react-helmet';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
// import OldGallery from './components/OldGallery.jsx';
import Greeting from './components/Greeting.jsx';
import Lightbox from './components/Lightbox.jsx';
import MenuBar from './components/MenuBar.jsx';
import './styles/main.css';

function hasWebpSupport () {
  var elem = document.createElement('canvas');

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
};

const webpSupport = hasWebpSupport();

export default function Home() {
  return (
    <div id='top'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Katie Kisiel</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <Greeting />
      <MenuBar />
      <Gallery webpSupport={webpSupport}/>
      {/* <OldGallery /> */}
      <Lightbox />
      <Contact />
      <Footer />
    </div>
  )
}