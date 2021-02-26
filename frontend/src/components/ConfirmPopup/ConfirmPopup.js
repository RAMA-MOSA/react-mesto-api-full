import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onSubmit, title, buttonText }) {

  return (
    <PopupWithForm
      name="confirm"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={onSubmit}
    >
    </PopupWithForm>
  );
}

export default ConfirmPopup;