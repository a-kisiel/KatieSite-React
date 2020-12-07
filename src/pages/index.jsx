import React from 'react';
import { Helmet } from 'react-helmet';
import About from '../components/About.jsx';
import Footer from '../components/Footer.jsx';
import Gallery from '../components/Gallery.jsx'
import Greeting from '../components/Greeting.jsx';
import Lightbox from '../components/Lightbox.jsx';
import MenuBar from '../components/MenuBar.jsx';
import '../styles/main.scss';

function getWallpaper() {
  function importAll(r) {
      return r.keys().map(r);
  }
  let wallpapers = importAll(require.context('../images/wallpapers/', false, /\.(jpe?g)$/));
  let w = wallpapers[Math.floor(Math.random() * wallpapers.length)].default
  return w;
}

export default function Home() {
  return (
    <div id='top' style={{ backgroundImage: `url(${getWallpaper()})` }}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Katie Kisiel</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <MenuBar />
      <Greeting />
      <Gallery />
      <Lightbox />
      <About />
      <Footer />
    </div>
  )
}