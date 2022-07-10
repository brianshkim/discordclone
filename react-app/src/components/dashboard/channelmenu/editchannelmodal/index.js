import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import EditChannelForm from './editchannelform';


function EditChannelModal({channelid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <button className="editchannel" onClick={() => setShowModal(true)}>Edit Channel</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <EditChannelForm channelid={channelid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default EditChannelModal;
