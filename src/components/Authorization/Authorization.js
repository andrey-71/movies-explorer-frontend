import './Authorization.css';
import Logo from '../Logo/Logo';

function Authorization(props) {

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
          {props.isRegister &&
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
        className={props.isLogin ?
          'authorization__footer authorization__footer_login'
          :
          'authorization__footer'}
      >
        <button
          className='authorization__submit-button'
          type='submit'
          form='authorization-form'>
          {props.submitTextButton}
        </button>
        <div className='authorization__link-container'>
          <p className='authorization__link-description'>
            {props.namePage === 'register' && 'Уже зарегистрированы?'}
            {props.namePage === 'login' && 'Ещё не зарегистрированы?'}
          </p>
          <a className='authorization__link' href='#'>
            {props.namePage === 'register' && 'Войти'}
            {props.namePage === 'login' && 'Регистрация'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Authorization;