import { React } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { BsArrowDownShort } from 'react-icons/bs'
import Fade from 'react-reveal';
import '../styles/greeting.scss';

export default function Bobbing(props) {

    return (
        <div style={{margin: 'auto'}}>
            <Fade top opposite when={props.show}>
                <AnchorLink href='#portfolio' style={{ color: '#ffe8d6' }}><BsArrowDownShort id='down-icon'/></AnchorLink>
            </Fade>
        </div>
    )
}