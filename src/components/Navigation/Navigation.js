import './Navigation.css';

function Navigation(props) {

  return (
    <nav className='navigation'>
      {props.auth ?
        <div className='navigation__authorized'>
          <div className='navigation__movies'>
            <a href='#' className='navigation__link navigation__link_type_films'>Фильмы</a>
            <a href='#' className='navigation__link navigation__link_type_save-films'>Сохранённые фильмы</a>
          </div>
          <div className='navigation__account'>
            <a href='#' className='navigation__link navigation__link_type_account'>Аккаунт</a>
          </div>
        </div>
        :
        <div className='navigation__unauthorized'>
          <a href='#' className='navigation__link navigation__link_type_singup'>Регистрация</a>
          <button className='navigation__signin-button'>Войти</button>
        </div>
      }
    </nav>
  )
}

export default Navigation;