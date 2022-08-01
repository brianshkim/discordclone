import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import DeleteChannelForm from './deletechannelform';
import '../channelmenu.css'


function DeleteChannelModal({channelid}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
    <div className="chmenuitems" onClick={() => setShowModal(true)}>Delete Channel <span><i class="fa-solid fa-trash-can fa-xs"></i></span></div>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <DeleteChannelForm channelId={channelid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default DeleteChannelModal;
