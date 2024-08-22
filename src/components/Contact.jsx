import React from 'react';
import '../styles/contact.css';
import { SiInstagram } from 'react-icons/si';
import { FaEtsy } from "react-icons/fa";
import { FiMail } from 'react-icons/fi';

export default function Contact() {
    return (
        <div id='contact'>
            <div id='contacts-holder'>
                <div className='commissions'>
                    <span style={{marginBottom: '8px'}}>Commissions available upon request</span>
                    <span>All images property of Katie Kisiel</span>
                </div>
                {/* <div className='link-wrap'>
                    <div className='contact-element'>
                        <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'><SiInstagram className='contact-icon'/> kmkisiel</a>
                    </div>
                    <div className='contact-element'>
                        <a href='mailto:katiekisiel6@gmail.com' target='_blank' rel='noreferrer' className='external-link'><FiMail className='contact-icon'/> katiekisiel6@gmail.com</a>
                    </div>
                    <div className='contact-element'>
                        <a href="" target='_blank' rel='noreferrer' className='external-link'><FaEtsy className='contact-icon' /> Store</a>
                    </div>
                </div> */}
            </div>
        </div>
    )
}