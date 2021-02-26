import React from 'react';
import union from '../../images/Union.svg';
import unionFailed from '../../images/Union-fail.svg';

const InfoTooltip = (props) => {

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
        <img className="popup__icon" src={props.isSuccess ? union : unionFailed} alt={props.isSuccess ? 'Регистрация прошла успешно.' : 'Регистрации не прошла.'}/>
        <h3 className="popup__text">
          {props.isSuccess ?
            'Вы успешно зарегистрировались!'
          :
            'Что-то пошло не так! Пропробуйте ещё раз.'
          }
        </h3>
      </div>
    </div>
  )
}

export default InfoTooltip;
