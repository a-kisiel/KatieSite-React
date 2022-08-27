import { React } from 'react';
import { BsArrowDownShort } from 'react-icons/bs'
import Fade from 'react-reveal';
import '../styles/greeting.css';

export default function Bobbing(props) {

    return (
        <div style={{margin: 'auto'}}>
            <Fade top opposite when={props.show}>
                <div style={{ color: '#ffe8d6' }}><BsArrowDownShort id='down-icon'/></div>
            </Fade>
        </div>
    )
}