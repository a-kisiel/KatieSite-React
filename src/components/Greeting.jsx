import React from 'react';
import { Rotate, Bounce, Fade } from 'react-reveal';
import '../styles/greeting.scss'

function getWallpaper() {
    function importAll(r) {
        return r.keys().map(r);
    }

    let wallpapers = importAll(require.context('../images/wallpapers/', false, /\.(jpe?g)$/));
    let w = wallpapers[Math.floor(Math.random() * wallpapers.length)].default
    return w

}

export default function () {
    return (
        <div id='greeting' style={{ backgroundImage: `url(${getWallpaper()})` }}>
                {/* <Rotate top left>
                    <Bounce top> 
                        <h1 id='say-hello'>Hello!</h1>
                        <div id='brief-bio'>
                            <Fade delay={1000}>
                                <h3>I'm Katie, and I like art and chemistry!</h3>
                            </Fade>
                        </div>
                    </Bounce>
                </Rotate> */}
        </div>
    )
}