import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import JoinServerForm from './joinserverform';


function JoinServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="editserver" onClick={() => setShowModal(true)}>Join Server</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <JoinServerForm closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default JoinServerModal;
