import { React } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import Fade from 'react-reveal';
import '../styles/greeting.scss';

export default function Bobbing(props) {

    return (
        <div style={{margin: 'auto'}}>
            <Fade top opposite when={props.show}>
                <IoIosArrowDropdownCircle id='down-icon'/>
            </Fade>
        </div>
    )
}