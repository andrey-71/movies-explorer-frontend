import './Profile.css';

function Profile() {

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form name='form-profile' className='profile__form'>
        <label className='profile__input-item'>
          <p className='profile__input-description'>Имя</p>
          <input type='text' name='name-profile' placeholder='Имя' className='profile__input'/>
          <span className='profile__input-error'>span</span>
        </label><label className='profile__input-item'>
        <p className='profile__input-description'>E-mail</p>
        <input type='text' name='name-profile' placeholder='E-mail' className='profile__input'/>
        <span className='profile__input-error'>span</span>
      </label>
        <button type='submit' className='profile__submit-button'>Редактировать</button>
      </form>
      <a href='#' className='profile__link-signout'>Выйти из аккаунта</a>
    </section>
  )
}

export default Profile;