import React from 'react';
import '../styles/about.scss';

function getArtistImages() {
    function importAll(r) {
        return r.keys().map(r);
    }
    let artistImages = importAll(require.context('../images/artist/', false, /\.(jpe?g)$/));
    for (let i=0; i<artistImages.length; i++) {
        artistImages[i] = artistImages[i].default
    }
    return artistImages
}

export default function About() {
    return (
        <div id='about-section'>
            <h2 id='about' className='section-header'>About</h2>
            <div className='clear'></div>
            <div className='bio-wrapper'>
                <img id='artist1' src={getArtistImages()[0]} className='artist-image' alt=''></img>
                <p id='artist-bio'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum iaculis eu non diam phasellus vestibulum lorem. Nunc sed id semper risus in hendrerit. Vel quam elementum pulvinar etiam non quam lacus. Pharetra diam sit amet nisl suscipit adipiscing. Ut lectus arcu bibendum at varius vel pharetra. Sagittis eu volutpat odio facilisis mauris sit amet. Magna ac placerat vestibulum lectus mauris ultrices eros in. Ornare arcu odio ut sem nulla pharetra. Curabitur vitae nunc sed velit dignissim.
                    Amet nisl suscipit adipiscing bibendum est. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Bibendum at varius vel pharetra vel turpis. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Odio ut sem nulla pharetra diam sit amet. Tortor id aliquet lectus proin nibh nisl condimentum id. Diam in arcu cursus euismod quis viverra. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Senectus et netus et malesuada fames ac turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Senectus et netus et malesuada fames ac. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Neque ornare aenean euismod elementum nisi. Vulputate odio ut enim blandit. Sapien et ligula ullamcorper malesuada proin libero. Turpis massa tincidunt dui ut ornare. Lobortis feugiat vivamus at augue eget.
                    Fringilla phasellus faucibus scelerisque eleifend. Nascetur ridiculus mus mauris vitae ultricies leo integer. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Adipiscing tristique risus nec feugiat in fermentum. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Semper viverra nam libero justo laoreet sit amet cursus sit. Convallis aenean et tortor at risus viverra adipiscing at. Nibh tellus molestie nunc non blandit massa. Quis varius quam quisque id diam vel quam elementum pulvinar. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Lectus mauris ultrices eros in cursus turpis massa. Fringilla urna porttitor rhoncus dolor purus. Condimentum mattis pellentesque id nibh tortor. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Faucibus interdum posuere lorem ipsum. Velit aliquet sagittis id consectetur. Convallis tellus id interdum velit. Libero enim sed faucibus turpis in eu.
                    A lacus vestibulum sed arcu non. Lectus urna duis convallis convallis tellus id. Diam ut venenatis tellus in metus. Nibh ipsum consequat nisl vel pretium. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Sed euismod nisi porta lorem mollis aliquam. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Justo eget magna fermentum iaculis eu non diam. Adipiscing at in tellus integer feugiat scelerisque. A cras semper auctor neque vitae tempus. Ornare arcu dui vivamus arcu. Id consectetur purus ut faucibus pulvinar elementum integer. Ut ornare lectus sit amet est. Arcu non sodales neque sodales ut etiam sit amet. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit.
                    Vitae tempus quam pellentesque nec nam aliquam sem et. In nibh mauris cursus mattis molestie a iaculis at. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Lectus vestibulum mattis ullamcorper velit sed. Neque viverra justo nec ultrices dui sapien. Mattis pellentesque id nibh tortor id aliquet lectus proin. Tellus molestie nunc non blandit massa. Quam nulla porttitor massa id neque. Eget nunc lobortis mattis aliquam faucibus purus in massa. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Nisl condimentum id venenatis a condimentum. In massa tempor nec feugiat nisl. Pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Pretium quam vulputate dignissim suspendisse in. Id nibh tortor id aliquet lectus proin nibh nisl condimentum.
                </p>
            </div>
            <div className='clear'></div>
        </div>
    )
}