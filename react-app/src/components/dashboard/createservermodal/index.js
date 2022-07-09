import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToList from './addToListForm'
import './addButton.css'

function CreateServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add-to-list' onClick={() => setShowModal(true)} id="editbuttonlist">Add to List</button>

      {showModal &&
        (<Modal onClose={() => setShowModal(false)}>
          <CreateServerForm closeModal={() => setShowModal(false)} />
        </Modal>
        )}
    </>
  );
}

export default CreateServerModal;
