import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import DeleteChannelForm from './deletechannelform';
import '../channelmenu.css'


function DeleteChannelModal({channelid}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
    <button className="channelbutton delete" onClick={() => setShowModal(true)}>Delete</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <DeleteChannelForm channelId={channelid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default DeleteChannelModal;
