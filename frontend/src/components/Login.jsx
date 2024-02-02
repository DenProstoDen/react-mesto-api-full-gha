import React from 'react';
import PopupSignForm from './PopupSignForm';
import { useState } from "react";

function Login({onSignIn}) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormValue({
          ...formValue,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
          return;
        }
        onSignIn(formValue.email, formValue.password);
    };

    return (
        <PopupSignForm
            name="login"
            title="Вход"
            textButton="Войти"
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={formValue.email}
            password={formValue.password}
        />
    )
}

export default Login;