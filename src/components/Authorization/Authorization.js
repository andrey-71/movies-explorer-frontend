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
              <span className='authorization__input-error'>span</span>
            </label>
          }
          <label className='authorization__input-item'>
            <p className='authorization__input-description'>E-mail</p>
            <input
              className='authorization__input'
              type='text'
              name={`email-${props.namePage}`}
              placeholder='Введите e-mail'
            />
            <span className='authorization__input-error'>span</span>
          </label>
          <label className='authorization__input-item'>
            <p className='authorization__input-description'>Пароль</p>
            <input
              className='authorization__input'
              type='text'
              name={`password-${props.namePage}`}
              placeholder='Введите пароль'
            />
            <span className='authorization__input-error'>span</span>
          </label>
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
          {props.submitText}
        </button>
        <div className='authorization__link-container'>
          <p className='authorization__link-description'>
            {props.isRegister && 'Уже зарегистрированы?'}
            {props.isLogin && 'Ещё не зарегистрированы?'}
          </p>
          <a className='authorization__link' href='#'>
            {props.isRegister && 'Войти'}
            {props.isLogin && 'Регистрация'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Authorization;