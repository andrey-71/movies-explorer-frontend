import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

function Profile(props) {
  const history = useNavigate();

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form name='form-profile' className='profile__form'>
        <label className='profile__input-item'>
          <p className='profile__input-description'>Имя</p>
          <input
            className='profile__input'
            type='text'
            name='name-profile'
            placeholder='Введите имя'
          />
          <span className='profile__input-error'>span</span>
        </label>
        <label className='profile__input-item'>
        <p className='profile__input-description'>E-mail</p>
        <input
          className='profile__input'
          type='text' name='email-profile'
          placeholder='Введите e-mail'
        />
        <span className='profile__input-error'>span</span>
      </label>
        <button className='profile__submit-button' type='submit' onClick={() => {
          history('/movies');
        }}>
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