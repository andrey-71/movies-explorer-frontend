import './Navigation.css';

function Navigation(props) {

  return (
    <nav className='navigation'>
      {props.isLogged ?
        <div className='navigation__authorized'>
          <div>
            <a href='#' className='navigation__link navigation__link_type_films'>Фильмы</a>
            <a href='#' className='navigation__link navigation__link_type_save-films'>Сохранённые фильмы</a>
          </div>
          <div>
            <button className='navigation__account-button'>Аккаунт</button>
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