import React, { useState } from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Greeting from './components/Greeting.jsx';
import Lightbox from './components/Lightbox.jsx';
import MenuBar from './components/MenuBar.jsx';
import './styles/main.css';
import Upload from './components/Upload.jsx';
import Login from './components/Login.jsx';

export default function App() {
  const [login, setLogin] = useState();
  return (
    <div id='top'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Katie Kisiel</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/upload" element={
        (!login) ?
        <Login setLogin={setLogin}/> : <UploadPage />}
        />
      </Routes>
    </div>
  )
}

export function Main() {
  return (
    <div id='top'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Katie Kisiel</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <Greeting />
      <MenuBar />
      <Gallery />
      <Lightbox />
      <Contact />
      <Footer />
    </div>
  )
}

export function LoginPage() {
  return (
    <div id='top'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Login</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <Login />
    </div>
  )
}

export function UploadPage() {
  return (
    <div id='top'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Upload</title>
        <link rel='canonical' href='/' />
      </Helmet>
      <Upload />
    </div>
  )
}

