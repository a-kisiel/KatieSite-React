import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import '../styles/lightbox.css';

export default function Lightbox(props) {
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // Helper for importing loader
  function importAll(r) {
    return r.keys().map(r);
  }
  const loaderUrl = importAll(require.context('../images/icons/', false, /\.(svg)$/))[0].default;

  const loadingComplete = () => {
    setLoaded(true);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='gallery-img loader'>
        <img
          src={loaderUrl}
          data-src={props.source}
          title={props.name}
          style={{display: !loaded ? 'flex' : 'none'}}
          onClick={handleOpen}
          alt='' />
      </div>
      <img
        srcSet={props.source}
        className='gallery-img'
        title={props.name}
        style={{display: loaded ? 'flex' : 'none'}}
        onClick={handleOpen}
        onLoad={loadingComplete}
        alt='' />
      <div className='lightbox-wrapper'>
        <Modal
            aria-labelledby={props.source}
            aria-describedby="transition-modal-description"
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
              <h2 className='img-medium'>{props.medium}</h2>
              <h2 className='img-date'>{props.date}</h2>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
