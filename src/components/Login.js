import { useState, useContext, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';
import Auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Login({ handleLogin }) {
function handleSubmit(e) {
    e.preventDefault();

}

Auth.authorize(password, email)
if (data.jwt) {
    handleLogin(data)
}
  return (
    <div className="login">
            <p className="login__title">
                Вход
            </p>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__email" htmlFor="email">
                    Email
                </label>
                <input className="login__input" id="email" name="email" type="email" value={email} onChange={handleChange} required />
                <label className="login__password" htmlFor="password">
                    Пароль
                </label>
                <input className="login__input" id="password" name="password" type="password" value={password} onChange={handleChange} required />
                <div className="login__button-container">
                    <button className="login__button" type="submit">Войти</button>
                </div>
            </form>
            <div className="login__signup">
                <Link to="/sign-up" className="login__link">
                    Регистрация
                </Link>
            </div>
        </div>
  )
}

export default withRouter(Login);