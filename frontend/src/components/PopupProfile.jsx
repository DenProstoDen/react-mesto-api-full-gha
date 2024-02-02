import { useContext, useEffect } from "react";
import useFormValidation from "../utils/FormValidation.js";
import PopupWithForm  from "./PopupWithForm.jsx";
import CurrentUserContext from "../context/CurentUserContext.js";

export default function PopupProfile ({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const { values, error, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation();
    
    useEffect(() => {
        setValue("name", currentUser.name)
        setValue("info", currentUser.about)
    },[currentUser, setValue])
    
    function resetClose() {
        onClose()
        reset({name: currentUser.name, info: currentUser.about})
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({ name: values.name, info: values.info }, reset)
    }
    return (
    <PopupWithForm 
        name='edit-profile' 
        title='Редактировать профиль'
        isOpen = {isOpen}
        onClose = {resetClose}
        isValid={isValid}
        onSubmit={handleSubmit}
    >
        <input
          id="name"
          type="text"
          name="name"
          className={`popup__input popup__input_type_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_state_invalid'}`}
          required
          placeholder="Ваше имя"
          minLength={2}
          maxLength={40}
          value={values.name ? values.name : ''}
          onChange={handleChange}
        />
        <span id="name-error" className="error">{error.name}</span>
        <input
          id="info"
          type="text"
          name="info"
          className={`popup__input popup__input_type_info ${isInputValid.info === undefined || isInputValid.info ? '' : 'popup__input_state_invalid'}`}
          required=""
          placeholder="Расскажите о себе"
          minLength={2}
          maxLength={200}
          value={values.info ? values.info : ''}    
          onChange={handleChange}
        />
        <span id="job-error" className="error">{error.info}</span>
    </PopupWithForm>
    )
}   