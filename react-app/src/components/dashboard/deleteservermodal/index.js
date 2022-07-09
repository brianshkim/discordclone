import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import DeleteServerForm from './deleteserverform';


function DeleteServerModal({serverid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="deleteserver" onClick={() => setShowModal(true)}>Delete Server</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <DeleteServerForm serverid={serverid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default DeleteServerModal;
