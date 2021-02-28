import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({onCardClick, card, onCardLike, onCardDeleteRequest}){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwnCard = card.owner === currentUser._id;
  const isLiked = card.likes.find(i => i === currentUser._id);
  const cardDeleteButtonClassName = isOwnCard ? 'element__trash element__trash_on' : 'element__trash element__trash_none';
  const cardLikeButtonClassName = isLiked ? 'element__like element__like_on' : 'element__like';
    
  function handleCardClick(){
    onCardClick(card);
  }

  function handleLikeClick(){
    onCardLike(card, isLiked);
  }

  function handleDeleteRequest(){
    onCardDeleteRequest(card);
  }
  
  return(   
    <li className="element">
      <img className="element__photo" onClick={handleCardClick} src={card.link} alt={card.name} />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteRequest} type="button" />
      <div className="element__box">
        <p className="element__caption">{card.name}</p>
        <div className="element__like-box">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
          <p className="element__count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card