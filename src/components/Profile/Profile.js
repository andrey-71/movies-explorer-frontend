import './Profile.css';
import {useContext, useEffect} from 'react';
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
    setValue,
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

  const dataUserInput = getValues();
  useEffect(() => {
    setValue('nameProfile', currentUser.name);
    setValue('emailProfile', currentUser.email);
  },[]);


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
            className={`profile__input ${errors?.nameProfile?.message && 'profile__input-error'}`}
            type='text'
            placeholder='Введите имя'
            {...register('nameProfile', {
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
          <span className={`profile__text-error ${!isValid && `profile__text-error_visible`}`}>
            {errors?.nameProfile?.message || ''}
          </span>
        </label>
        <label className='profile__input-item'>
          <p className='profile__input-description'>E-mail</p>
          <input
            className={`profile__input ${errors?.emailProfile?.message && 'profile__input-error'}`}
            type='email'
            placeholder='Введите e-mail'
            {...register('emailProfile', {
              required: 'Это поле необходимо заполнить',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Укажите адрес электронной почты'
              }
            })}
          />
          <span className={`profile__text-error ${!isValid && `profile__text-error_visible`}`}>
            {errors?.emailProfile?.message || ''}
          </span>
        </label>
        <button
          className={`profile__submit-button ${!errors?.nameProfile || !errors?.emailProfile && 'profile__submit-button_disabled'}`}
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