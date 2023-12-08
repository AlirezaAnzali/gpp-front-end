import React from "react";
import "./ExerciseModal.scss";

function ExerciseModal({ children, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target.classList.contains("backdrop")) {
      onClose();
    }
  };

  return (
    <>
      <div className="backdrop" onClick={handleBackdropClick}>
        <div className="modal-container">
          <div className="modal">{children}</div>
        </div>
      </div>
    </>
  );
}


export default ExerciseModal;
