import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import CreateChannelForm from './createchannelform';


function CreateChannelModal({serverid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="createchannelbutton" onClick={() => setShowModal(true)}>Create Channel</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <CreateChannelForm serverid={serverid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default CreateChannelModal;
