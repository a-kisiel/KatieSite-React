import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import '../styles/lightbox.scss';

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img src={props.source} className='gallery-img' onClick={handleOpen} title={props.name} alt='' />
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
                <img src={props.source} className='img-lightbox' title={props.name} alt="" />
            </Modal>
        </div>
    </div>
  );
}
