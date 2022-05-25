import './Register.css';
import {useState} from "react";
import Authorization from '../Authorization/Authorization';

function Register(props) {
  // Стейты инпутов
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Функции обработки изменения инпутов
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  // Функция отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister({name, email, password});
  }

  return (
    <section className='register'>
      <Authorization
        namePage='signup'
        redirectPath='/signin'
        title='Добро пожаловать!'
        submitTextButton='Зарегистрироваться'
        isName={name}
        isEmail={email}
        isPassword={password}
        onName={handleChangeName}
        onEmail={handleChangeEmail}
        onPassword={handleChangePassword}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default Register;