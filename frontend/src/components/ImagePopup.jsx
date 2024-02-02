export default function ImagePopup({card, isOpen, onClose}) {
  return(
    <div className={`popup popup_type_img ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup-image__container"onClick={(evt) => evt.stopPropagation()}>
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <img className="popup-image__picture" name="link" src={card.link} alt={`Изображение ${card.name}`} />
        <h2 className="popup-image__text">{card.name}</h2>
      </div>
    </div>
  )
}