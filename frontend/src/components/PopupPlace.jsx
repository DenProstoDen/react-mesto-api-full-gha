import PopupWithForm from "./PopupWithForm.jsx";
import useFormValidation from "../utils/FormValidation.js";

export default function PopupPlace ({isOpen, onClose, onAddPlace}) {
    const { values, error, isValid, isInputValid, handleChange, reset } = useFormValidation();

    function resetClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({placename: values.placename, link: values.link}, reset)
    }
    return (
        <PopupWithForm
        name="add-card"
        title='Новое место'
        titleButton='Создать'
        isOpen={isOpen}
        onClose = {resetClose}
        isValid={isValid}
        onSubmit={handleSubmit}
      >
        <input
          id="placename"
          type="text"
          title='Создать'
          className={`popup__input popup__input_type_place ${isInputValid.placename === undefined || isInputValid.placename ? '' : 'popup__input_state_invalid'}`}
          name="placename"
          required
          placeholder="Место"
          minLength={2}
          maxLength={30}
          value={values.placename ? values.placename : ''}
          onChange={handleChange}
        />
        <span id="placename-error" className="error">{error.placename}</span>
        <input
          id="link"
          type="url"
          className={`popup__input popup__input_type_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_state_invalid'}`}
          name="link"
          required
          placeholder="Ссылка"
          value={values.link ? values.link : ''}
          onChange={handleChange}
        />
        <span id="placeLink-error" className="error">{error.link}</span>
      </PopupWithForm>
    )   
}