import './Authorization.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../Logo/Logo';

function Authorization(props) {
  const path = window.location.pathname;

  // Hook-form валидация
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const errorMessage = {
    name: errors?.nameRegister?.message,
    email: path === '/signup' ? errors?.emailRegister?.message : errors?.emailLogin?.message,
    password: path === '/signup' ? errors?.passwordRegister?.message : errors?.passwordLogin?.message,
  };

  // Функция отправки формы
  function onSubmit() {
    props.onSubmit(getValues());
    reset({
      isValid: false,
    });
  }

  return (
    <section className='authorization'>
      <div className='authorization__header'>
        <Logo />
        <h1 className='authorization__title'>{props.title}</h1>
      </div>
      <div className='authorization__form-container'>
        <form
          className='authorization__form'
          name={`form${props.namePage}`}
          id='authorization-form'
          noValidate={true}
          onSubmit={handleSubmit(onSubmit)}
        >
          {path === '/signup' &&
            <label className='authorization__input-item'>
              <p className='authorization__input-description'>Имя</p>
              <input
                className={`authorization__input ${errorMessage?.name?.length && 'authorization__input-error'}`}
                type='text'
                placeholder='Введите имя'
                {...register(`name${props.namePage}`,{
                  required: 'Это поле необходимо заполнить',
                  minLength: {
                    value: 2,
                    message: 'Имя не должно быть короче 2-х символов'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Имя не должно превышать 30 символов'
                  },
                  pattern: {
                    value: /^[а-яёa-z\-\s]+$/i,
                    message: 'Только латиница, кирилица, пробел или дефис'
                  }
                })}
              />
              <span className={`authorization__text-error ${!isValid && `authorization__text-error_visible`}`}>
                {errorMessage.name}
              </span>
            </label>
          }
          <label className='authorization__input-item'>
            <p className='authorization__input-description'>E-mail</p>
            <input
              className={`authorization__input ${errorMessage?.email?.length && 'authorization__input-error'}`}
              type='email'
              placeholder='Введите e-mail'
              {...register(`email${props.namePage}`,{
                required: 'Это поле необходимо заполнить',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Укажите адрес электронной почты'
                }
              })}
            />
            <span className={`authorization__text-error ${!isValid && `authorization__text-error_visible`}`}>
              {errorMessage.email}
            </span>
          </label>
          <label className='authorization__input-item'>
            <p className='authorization__input-description'>Пароль</p>
            <input
              className={`authorization__input ${errorMessage?.password?.length && 'authorization__input-error'}`}
              type='password'
              placeholder='Введите пароль'
              {...register(`password${props.namePage}`,{
                required: 'Это поле необходимо заполнить',
              })}
            />
            <span className={`authorization__text-error ${!isValid && `authorization__text-error_visible`}`}>
              {errorMessage.password}
            </span>
          </label>
        </form>
      </div>
      <div
        className={path === '/signin' ?
          'authorization__footer authorization__footer_login'
          :
          'authorization__footer'}
      >
        <div>
          <h2 className="authorization__error-title">{props.isError.title}</h2>
          <p className="authorization__error-message">
            {props.isError.message}
          </p>
        </div>
        <button
          className={`authorization__submit-button ${!isValid && `authorization__submit-button_disabled`}`}
          type='submit'
          form='authorization-form'
          disabled={!isValid}
        >
          {props.submitTextButton}
        </button>
        <div className='authorization__link-container'>
          <p className='authorization__link-description'>
            {path === '/signup' && 'Уже зарегистрированы?'}
            {path === '/signin' && 'Ещё не зарегистрированы?'}
          </p>
          <Link className='authorization__link' to={props.redirectPath}>
            {path === '/signup' && 'Войти'}
            {path === '/signin' && 'Регистрация'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Authorization;