import './Profile.css';
import {useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

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

  // Функция отправки формы
  function onSubmit() {
    props.onDataUpdate(getValues());
    reset({
      isValid: false,
    });
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form
        className='profile__form'
        name='form-profile'
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className='profile__input-item'>
          <p className='profile__input-description'>Имя</p>
          <input
            className='profile__input'
            type='text'
            placeholder='Введите имя'
            defaultValue={currentUser.name}
            {...register('nameProfile', {
              required: 'Это поле необходимо заполнить',
              minLength: {
                value: 2,
                message: 'Имя не должно быть короче 2-х символов'
              },
              maxLength: 30
            })}
          />
          <span className={`profile__input-error ${!isValid && `profile__input-error_visible`}`}>
            {errors?.nameProfile?.message || ''}
          </span>
        </label>
        <label className='profile__input-item'>
          <p className='profile__input-description'>E-mail</p>
          <input
            className='profile__input'
            type='email'
            placeholder='Введите e-mail'
            defaultValue={currentUser.email}
            {...register('emailProfile', {
              required: 'Это поле необходимо заполнить',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Укажите адрес электронной почты'
              }
            })}
          />
          <span className={`profile__input-error ${!isValid && `profile__input-error_visible`}`}>
            {errors?.emailProfile?.message || ''}
          </span>
        </label>
        <button
          className='profile__submit-button'
          type='submit'
          disabled={!isValid}
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