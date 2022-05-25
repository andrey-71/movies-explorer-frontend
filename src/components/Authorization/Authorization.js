import './Authorization.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Authorization(props) {
  const pathCurrent = window.location.pathname;

  return (
    <section className='authorization'>
      <div className='authorization__header'>
        <Logo />
        <h1 className='authorization__title'>{props.title}</h1>
      </div>
      <div className='authorization__form-container'>
        <form
          className='authorization__form'
          id='authorization-form'
          name={`form-${props.namePage}`}
        >
          {pathCurrent === '/signup' &&
            <label className='authorization__input-item'>
              <p className='authorization__input-description'>Имя</p>
              <input
                className='authorization__input'
                type='text'
                name={`name-${props.namePage}`}
                placeholder='Введите имя'
              />
            </label>
          }
          <label className='authorization__input-item'>
            <p className='authorization__input-description'>E-mail</p>
            <input
              className='authorization__input'
              type='email'
              name={`email-${props.namePage}`}
              placeholder='Введите e-mail'
            />
          </label>
          <label className='authorization__input-item'>
            <p className='authorization__input-description'>Пароль</p>
            <input
              className='authorization__input authorization__input-error'
              type='password'
              name={`password-${props.namePage}`}
              placeholder='Введите пароль'
            />
          </label>
          <span className='authorization__text-error authorization__text-error_visible'>Что-то пошло не так...</span>
        </form>
      </div>
      <div
        className={pathCurrent === '/signin' ?
          'authorization__footer authorization__footer_login'
          :
          'authorization__footer'}
      >
        <button
          className='authorization__submit-button'
          type='submit'
          form='authorization-form'
          onClick={props.onClick}
        >
          {props.submitTextButton}
        </button>
        <div className='authorization__link-container'>
          <p className='authorization__link-description'>
            {pathCurrent === '/signup' && 'Уже зарегистрированы?'}
            {pathCurrent === '/signin' && 'Ещё не зарегистрированы?'}
          </p>
          <Link className='authorization__link' to={props.redirectPath}>
            {pathCurrent === '/signup' && 'Войти'}
            {pathCurrent === '/signin' && 'Регистрация'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Authorization;