import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import CreateServerForm from './createserverform';


function CreateServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="addserver" onClick={() => setShowModal(true)}><i className="fa-solid fa-plus fa-2x"></i></button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <CreateServerForm closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default CreateServerModal;
