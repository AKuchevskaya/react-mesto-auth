import { useState } from "react";

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
                <input className="login__input" id="email" placeholder="Email" name="email" type="email" value={formParams.email} onChange={handleChange} required />
                <span className="login__input-error"></span>
                <input className="login__input" id="password" placeholder="Пароль" name="password" type="password" value={formParams.password} onChange={handleChange} required />
                <span className="login__input-error"></span>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </div>
  )
}

export default Login;