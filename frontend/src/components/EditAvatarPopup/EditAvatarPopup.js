import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}){
  const avatarRef = React.useRef('');
      
  function handleSubmit(e) {
      e.preventDefault();
      onUpdateAvatar({
        avatar: avatarRef.current.value
      });
  } 

  return(
    <PopupWithForm 
    name='avatar'
    title='Обновить аватар'
    buttonText='Сохранить'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
        <input className="popup__item popup__item_avatar" id='avatar-input' name="avatar" type="url" placeholder="Ссылка на аватар" required ref={avatarRef} />
        <span id='avatar-input-error' className='popup__item-error' role="status" />
  </PopupWithForm>
  )
}

export default EditAvatarPopup;