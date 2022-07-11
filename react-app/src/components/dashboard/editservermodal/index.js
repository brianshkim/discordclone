import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import EditServerForm from './editserverform';
import "../deleteservermodal/deleteserver.css"


function EditServerModal({serverid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="deleteserver" onClick={() => setShowModal(true)}>Edit Server</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <EditServerForm serverid={serverid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default EditServerModal;
