import React from 'react';
import Card from '../Card/Card';
import edit from '../../images/edit.svg';
import add from '../../images/+.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDeleteRequest, cards, onCardLike}){
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="content">
            <section className="profile">
              <div className="profile__avatar-box">
                <img className="profile__avatar" alt={currentUser.name} src={currentUser.avatar} />
                <button className="profile__img-avatar" onClick={onEditAvatar}/>
              </div>
              <div className="profile__info">
                <div className="profile__box">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit" type="button" onClick={onEditProfile}>
                      <img className="profile__img-edit" src={edit} alt="Изменить" />
                    </button>
                </div>
                <p className="profile__description">{currentUser.about}</p>
              </div>
              <button className="profile__button" type="button" onClick={onAddPlace}>
                <img className="profile__img-button" src={add} alt="Добавить фото" />
              </button>
            </section>
            <section className="elements">
              <ul className="elements__box">
                {cards.map(card =>(
                  <Card 
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick} 
                    onCardLike={onCardLike}
                    onCardDeleteRequest={onCardDeleteRequest}
                  />
                  )
                )}  
              </ul>
            </section>
        </main>
    )
}

export default Main;
