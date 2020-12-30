import React from 'react';
import { Helmet } from 'react-helmet';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Gallery from '../components/Gallery.jsx'
import Greeting from '../components/Greeting.jsx';
import MenuBar from '../components/MenuBar.jsx';
import '../styles/main.scss';

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
        <Footer title='adflk'></Footer>
      </div>
    )
  }
}

export default Index;