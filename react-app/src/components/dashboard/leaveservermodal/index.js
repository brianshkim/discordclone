import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import LeaveServerForm from './leaveserverform';
import "../deleteservermodal/deleteserver.css"


function LeaveServerModal({serverid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="deleteserver leave" onClick={() => setShowModal(true)}>Leave Server</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <LeaveServerForm serverid={serverid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default LeaveServerModal;
