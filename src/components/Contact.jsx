import React from 'react';
import '../styles/contact.css';
import { SiInstagram } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

export default function Contact() {
    return (
        <div id='contact'>
            <div id='contacts-holder'>
                <div className='contact-element'>
                    <SiInstagram className='contact-icon'/>
                    <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'>kmkisiel </a>
                </div>
                <div className='contact-element'>
                    <FiMail className='contact-icon'/>
                    <p>kmk15@alfred.edu</p>
                </div>
            </div>
        </div>
    )
}