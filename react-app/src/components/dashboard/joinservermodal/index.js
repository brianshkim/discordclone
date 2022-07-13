import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import JoinServerForm from './joinserverform';
import './joinserver.css'


function JoinServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="joinserver" onClick={() => setShowModal(true)}><i className="fa-solid fa-compass fa-2x"></i></button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <JoinServerForm closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default JoinServerModal;
