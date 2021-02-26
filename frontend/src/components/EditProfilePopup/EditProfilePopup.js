import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup({onUpdateUser, isOpen, onClose}) {
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);//??

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e){
      setName(e.target.value);
    }      

    function handleChangeDescription(e){
      setDescription(e.target.value);
    }
    
    function handleSubmit(e) {
       e.preventDefault();
       onUpdateUser({
         name: name,
         about: description,
       });
    } 

    return(
      <PopupWithForm 
        name='profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input className="popup__item popup__item_name" id='name-input' name="name" type="text" placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
        <span id='name-input-error' className='popup__item-error' />
        <input className="popup__item popup__item_description" id='description-input' name="about" type="text" placeholder="О себе" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
        <span id='description-input-error' className='popup__item-error' />
      </PopupWithForm>
      
    )
}

export default EditProfilePopup;