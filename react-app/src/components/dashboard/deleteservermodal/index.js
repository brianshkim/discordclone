import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import DeleteServerForm from './createserverform';


function DeleteServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="addserver" onClick={() => setShowModal(true)}><i class="fa-solid fa-plus fa-2x"></i></button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <DeleteServerForm closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default DeleteServerModal;
