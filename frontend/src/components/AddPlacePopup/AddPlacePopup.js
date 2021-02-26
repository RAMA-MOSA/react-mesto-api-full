import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({onAddPlace, isOpen, onClose}){
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e){
      setName(e.target.value);
  }      

  function handleChangeLink(e){
      setLink(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault(e);
      onAddPlace({
        name: name,
        link: link,
      })
  } 

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return(
    <PopupWithForm 
        name='newcard'
        title='Новое место'
        buttonText='Создать'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <input className="popup__item popup__item_name-element" id='name-element-input' name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
        <span id='name-element-input-error' className='popup__item-error' />
        <input className="popup__item popup__item_link-element" id='link-element-input' name="link" type="url" placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink} />
        <span id='link-element-input-error' className='popup__item-error' />    
    </PopupWithForm>
  )
}

export default AddPlacePopup;