import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './VideoModal.css';

export const VideoModal2 = ({show,handleClose,videoid}) => {
  return (
    <Modal
    show={show}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <iframe 
          id="frameid2"
          src={videoid}
          frameborder="0"
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope; 
          picture-in-picture; 
          web-share" allowfullscreen>
    </iframe>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleClose}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
}

