import './Profile.css';
import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  // Стейты инпутов
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  // Функции обработки изменения инпутов
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  // Функция отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDataUpdate({name, email})
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form name='form-profile' className='profile__form'>
        <label className='profile__input-item'>
          <p className='profile__input-description'>Имя</p>
          <input
            className='profile__input'
            type='text'
            name='name-profile'
            placeholder='Введите имя'
            value={name}
            onChange={handleChangeName}
          />
          <span className='profile__input-error'>span</span>
        </label>
        <label className='profile__input-item'>
          <p className='profile__input-description'>E-mail</p>
          <input
            className='profile__input'
            type='text' name='email-profile'
            placeholder='Введите e-mail'
            value={email}
            onChange={handleChangeEmail}
          />
          <span className='profile__input-error'>span</span>
        </label>
        <button
          className='profile__submit-button'
          type='submit'
          onClick={handleSubmit}
        >
          Редактировать
        </button>
      </form>
      <Link className='profile__link-signout' to='#' onClick={props.onLogout}>
        Выйти из аккаунта
      </Link>
    </section>
  )
}

export default Profile;