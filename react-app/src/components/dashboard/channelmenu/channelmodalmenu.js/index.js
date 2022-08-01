import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import ChannelOverview from './channeloverview';
import "./channelmodalmenu.css"



function CreateChannelModalMenu({channelid}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="channelmenumodalbutton" onClick={() => setShowModal(true)}><i class="fa-solid fa-gear fa-xs"></i></div>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <ChannelOverview channelid={channelid} closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default CreateChannelModalMenu;
