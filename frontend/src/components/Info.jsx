import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) {
  const navigate = useNavigate();

  function onClick() {
    props.onClose();
    if (props.reg) {
      navigate('/sign-in', { replace: true });
    }
  }

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className={`popup__container`}>
        <img src={props.src} alt={props.alt} />
        <h2 className='popup__title'>{props.title}</h2>
        <button className="popup__close-button" onClick={onClick} type="button"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;