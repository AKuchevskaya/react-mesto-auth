import React, { Button } from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register () {
    handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className="register">
            <p className="register__title">
                Регистрация
            </p>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__email" htmlFor="email">
                    Email
                </label>
                <input className="register__input" id="email" name="email" type="email" value={email} onChange={handleChange} required />
                <label className="register__password" htmlFor="password">
                    Пароль
                </label>
                <input className="register__input" id="password" name="password" type="password" value={password} onChange={handleChange} required />
                <div className="register__button-container">
                    <button className="register__button" type="submit">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__link">
                    Войти
                </Link>
            </div>
        </div>
    )
}

export default withRouter(Register);
