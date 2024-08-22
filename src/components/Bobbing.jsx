import { React } from 'react';
import { BsArrowDownShort } from 'react-icons/bs'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Fade from 'react-reveal';
import '../styles/greeting.css';

export default function Bobbing(props) {

    return (
        <div style={{margin: 'auto'}}>
            <Fade top opposite when={props.show}>
                <AnchorLink href='#atlas' style={{ color: '#F8F9FA' }}><BsArrowDownShort id='down-icon'/></AnchorLink>
            </Fade>
        </div>
    )
}