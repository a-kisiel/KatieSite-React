import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import '../styles/lightbox.css';

export default function Lightbox(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img srcSet={props.source} className='gallery-img' onClick={handleOpen} title={props.name} alt='' />
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
