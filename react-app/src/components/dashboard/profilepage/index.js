import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import ProfilePage from './ProfilePage';
import "./channelmodalmenu.css"



function ProfilePageMenu() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="channelmenumodalbutton" onClick={() => setShowModal(true)}><i class="fa-solid fa-gear fa-xs"></i></div>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <ProfilePage closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default ProfilePageMenu;
