import { useContext } from "react"
import CurrentUserContext from "../context/CurentUserContext.js"

export default function Card ({card, onCardClick, onDelete, onCardLike}){
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
);

    return(
        <div className="card">
          <img 
          className="card__img" 
          src={card.link} 
          alt={card.name}
          onClick={() => onCardClick({name: card.name, link: card.link})}
          />
          <div className="card__description">
            <h2 className="card__text">{card.name}</h2>
            <button className={cardLikeClassName} type="button" onClick={() => onCardLike(card)}>
              <span className="card__like_numbers">{card.likes.length}</span>
            </button> 
          </div>
          {currentUser._id === card.owner._id &&  <button type="button" className="card__delete" onClick={() => onDelete(card._id)}/>}
        </div>
    )
}