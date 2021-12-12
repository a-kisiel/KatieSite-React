import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Gallery from '../components/Gallery.jsx'
import Greeting from '../components/Greeting.jsx';
import '../styles/main.css';

class Index extends React.Component {
  
  render () {
    return (
    <div id='top' >
        <Helmet>
          <meta charSet='utf-8' />
          <title>Katie Kisiel</title>
          <link rel='canonical' href='/' />
        </Helmet>
        <Greeting />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    )
  }
}

export default Index;