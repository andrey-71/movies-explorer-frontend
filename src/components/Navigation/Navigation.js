import './Navigation.css';

function Navigation() {
  const auth = true;

  return (
    <nav className='navigation header__navigation'>
      <div className='navigation__movies'>
        <a href='#' className='navigation__link navigation__link_type_films'>Фильмы</a>
        <a href='#' className='navigation__link navigation__link_type_save-films'>Сохранённые фильмы</a>
      </div>
      <div className='navigation__auth'>
        <a href='#' className='navigation__link navigation__link_type_singup'>Регистрация</a>
        <button className='navigation__signin-button'>Войти</button>
      </div>
    </nav>
  )
}

export default Navigation;