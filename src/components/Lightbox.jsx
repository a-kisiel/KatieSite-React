import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import '../styles/lightbox.css';

export default function Lightbox(props) {
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // Helper for importing loader
  // function importAll(r) {
  //   return r.keys().map(r);
  // }
  // const loaderUrl = importAll(require.context('../images/icons/', false, /\.(svg)$/))[0].default;

  // const loadingComplete = () => {
  //   setLoaded(true);
  // }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='gallery-img-wrap'>
      <img
        onClick={handleOpen}
        srcSet={props.source}
        className='gallery-img'
        aria-label={props.name}
        alt={props.name}
      />
      <div className='gallery-img-title'>{props.name}</div>
        <div className='lightbox-wrapper'>
          <Modal
              className='lightbox'
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
          >
            <div className="img-lightbox">
              <TransformWrapper doubleClick={{mode: 'reset'}}>
                <TransformComponent>
                  <img srcSet={props.source} className='zoomable' alt=""/>
                </TransformComponent>
              </TransformWrapper>
              <div className='img-description'>
                <h2 className="img-title">{props.name}</h2>
                <h2 className='img-media'>{props.media?.join(', ')}</h2>
                <h2 className='img-date'>{props.date}</h2>
              </div>
            </div>
          </Modal>
        </div>
    </div>
  );
}
