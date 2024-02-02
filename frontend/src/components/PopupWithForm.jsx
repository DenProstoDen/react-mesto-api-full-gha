export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isValid=true}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
            <button type="button" className="popup__close-button" onClick={onClose}/>
            <h2 className={`popup__header`}>{title}</h2>
            <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
                {children}
                <button type="submit" className={`popup__save-button ${isValid ? '' : 'popup__save-button_invalid'}`}>
                {titleButton||'Сохранить'}
                </button>
            </form>
            </div>
      </div>
    )
}