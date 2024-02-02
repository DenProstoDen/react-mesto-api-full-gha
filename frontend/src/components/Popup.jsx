import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose])

    const handleOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            className={`popup ${isOpen ? "popup_opened" : ""} popup_${name}`}
            onClick={handleOverlay}
        >
            <div className="popup__container">
                {children}
                <button
                    aria-label="закрыть"
                    className='popup__close'
                    type='button'
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Popup;