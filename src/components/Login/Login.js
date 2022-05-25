import './Login.css';
import { useState } from "react";
import Authorization from "../Authorization/Authorization";

function Login(props) {
  // Стейты инпутов
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Функции обработки изменения инпутов
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  // Функция отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin({email, password});
  }

  return (
    <section className='login'>
      <Authorization
        namePage='signin'
        redirectPath='/signup'
        title='Рады видеть!'
        submitTextButton='Войти'
        isEmail={email}
        isPassword={password}
        onEmail={handleChangeEmail}
        onPassword={handleChangePassword}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default Login;