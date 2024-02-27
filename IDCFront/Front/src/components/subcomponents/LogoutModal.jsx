import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import styles from './logout.module.css';

function LogoutModal() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleOkClick() {
    localStorage.removeItem("token")
    navigate("/")
    // logout function 
  }

  return (
    <>
      <button onClick={openModal}>Logout</button>
      {showModal ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <p>Are you sure you want to logout?</p>
            <div className={styles.buttons}>
              <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
              <button className={styles.okButton} onClick={() => { handleOkClick(); closeModal(); }}>OK</button>
            </div>
          </div>
        </div>

      ) : null}
    </>
  );
}

export default LogoutModal;