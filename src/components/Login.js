import { useState, useContext, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Login({ handleLogin, tokenCheck }) {
    const [formParams, setFormParams] = useState({
        password: '',
        email: ''
    })

    function handleChange(e) {
       const {name, value} = e.target;
       setFormParams((prev) => ({
        ...prev,
        [name]: value
        }))
    }
function handleSubmit(e) {
    e.preventDefault();
    if (!formParams.password || !formParams.email) {
        return
    }
    handleLogin({
        password: formParams.password, 
        email: formParams.email
    })
    .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
    })
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
                <input className="login__input" id="email" name="email" type="email" value={formParams.email} onChange={handleChange} required />
                <label className="login__password" htmlFor="password">
                    Пароль
                </label>
                <input className="login__input" id="password" name="password" type="password" value={formParams.password} onChange={handleChange} required />
                <div className="login__button-container">
                    <button className="login__button" type="submit">Войти</button>
                </div>
            </form>
            <div className="login__signup">
                <Link to="/signup" className="login__link">
                    Регистрация
                </Link>
            </div>
        </div>
  )
}

export default Login;