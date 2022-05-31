import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register ({handleRegister}) {
    const [formParams, setFormParams] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormParams((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formParams

        handleRegister(formParams)
    }
    return (
        <div className="register">
            <p className="register__title">
                Регистрация
            </p>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" placeholder="Email" id="email" name="email" type="email" value={formParams.email} onChange={handleChange} required />
                <span className="register__input-error"></span>
                <input className="register__input" placeholder="Пароль" id="password" name="password" type="password" value={formParams.password} onChange={handleChange} required />
                <span className="register__input-error"></span>
                <button className="register__button" type="submit">Зарегистрироваться</button>
                <p className="register__question">Уже зарегистрированы? 
                    <Link className="register__link" to="/signin"> Войти</Link>
                </p>
                
            </form>
        </div>
    )
}

export default Register;
