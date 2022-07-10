import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import DeleteChannelForm from './deletechannelform';


function DeleteChannelModal({channelid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="deletechannel" onClick={() => setShowModal(true)}>Delete Channel</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <DeleteChannelForm channelid={channelid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default DeleteChannelModal;
