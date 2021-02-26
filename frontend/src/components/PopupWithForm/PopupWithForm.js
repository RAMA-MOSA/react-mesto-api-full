import React from 'react';

function PopupWithForm({name, isOpen, title, children, buttonText, onClose, onSubmit}){
  
    return(
        <section className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
          <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
              <fieldset className="popup__content">
                {children}
                <button className="popup__button popup__save-button" type="submit">{buttonText}</button>
              </fieldset>
            </form>
            <button className="popup__close" type="button" onClick={onClose} />
          </div>
        </section>
    )
}

export default PopupWithForm;
