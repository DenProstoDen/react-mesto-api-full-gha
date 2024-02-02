import React from 'react';
import SignForm from './PopupSignForm';
import { Link } from 'react-router-dom';
import { useState } from "react";

function Register({onSignUp}) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    onSignUp(formValue.email, formValue.password);
  };


    return (
        <SignForm
            name="register"
            title="Регистрация"
            textButton="Зарегистрироваться"
            text="Уже зарегистрировались? "
            link={<Link to="/signin" className="sign__link">Войти</Link>}
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={formValue.email}
            password={formValue.password}
        />
    )
}

export default Register;