import React from 'react';
import '../styles/contact.css';
import { SiInstagram } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

export default function Contact() {
    return (
        <div id='contact'>
            <div id='contacts-holder'>
                <div className='commissions'>Commissions available upon request</div>
                <div className='link-wrap'>
                    <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='contact-element'>
                        <SiInstagram className='contact-icon'/>
                        <div className='external-link'>kmkisiel</div>
                    </a>
                    <a href='mailto:kmk15@alfred.edu' target='_blank' rel='noreferrer' className='contact-element'>
                        <FiMail className='contact-icon'/>
                        <div className='external-link'>kmk15@alfred.edu</div>
                    </a>
                </div>
            </div>
        </div>
    )
}