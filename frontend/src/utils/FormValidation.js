import {useCallback, useState} from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [error, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputValid, setIsInputValid] = useState({})

  function handleChange(evt) {
    const name = evt.target.name
    const form = evt.target.form
    const valid = evt.target.validity.valid
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage

    setIsInputValid((IsInputValid) => {
      return { ...IsInputValid, [name]: valid}
    })

    setValues((values) => {
      return { ...values, [name]: value}
    })

    setErrors((errors) => {
      return { ...errors, [name]: validationMessage}
    })


    setIsValid(form.checkValidity())

  }

  function reset(data={}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((values) => {
      return {...values, [name]: value}
    })
  }, [])

  return { values, error, isValid, isInputValid, handleChange, reset, setValue }

}