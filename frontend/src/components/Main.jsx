import Card from './Cards.jsx';
import { useContext} from "react"
import CurrentUserContext from '../context/CurentUserContext.js';

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, onCardLike, cards}) {
  const currentUser = useContext(CurrentUserContext);

    return(
      <main>
        <section className="profile">
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
            <img
            className="profile__avatar"
            alt="Аватар"
            src={currentUser.avatar ? currentUser.avatar: '#'}
            />
          </button>
          <div className="profile__info">
            <div className="profile__id">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
              <p className="profile__specialization">{currentUser.about ? currentUser.about : ''}</p>
            </div>
            <button className="profile__pencil" type="button" onClick={onEditProfile}></button>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section id="elements" className="elements">
          {cards.map(data => {
            return (
                <Card 
                key={data._id} 
                card={data} 
                onCardClick={onCardClick} 
                onDelete={onDelete} 
                onCardLike={onCardLike}/>
            )
          })}
        </section>
      </main>
    )
}