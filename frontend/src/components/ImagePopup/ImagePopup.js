import React from 'react';

function ImagePopup({card, onClose, isOpen}){

  return(
      <section className={`popup popup-image ${card && isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__window">
          <img className="popup__img" src={`${card.link}`} alt={`${card.name}`} />
          <p className="popup__caption">{card.name}</p>
          <button className="popup__close popup__close_image" type="button" onClick={onClose} />
        </div>
      </section>
  )
}

export default ImagePopup;
