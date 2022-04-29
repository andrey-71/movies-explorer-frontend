import './Navigation.css';
import { Link } from 'react-router-dom';
import AccountButton from "../AccountButton/AccountButton";

function Navigation(props) {
  const path = window.location.pathname;

  return (
    <nav className='navigation'>
      {props.isLogged ?
        <div className='navigation__authorized'>
          <div>
            <Link
              className={path === '/movies' ? 'navigation__link navigation__link_active' : 'navigation__link'}
              to='/movies'
            >
              Фильмы
            </Link>
            <Link
              className={path === '/saved-movies' ? 'navigation__link navigation__link_active' : 'navigation__link'}
              to='/saved-movies'
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <AccountButton />
          </div>
        </div>
        :
        <div className='navigation__unauthorized'>
          <Link className='navigation__link navigation__link_type_singup' to='/signup'>Регистрация</Link>
          <Link className='navigation__link navigation__link_type_signin' to='/signin'>Войти</Link>
        </div>
      }
    </nav>
  )
}

export default Navigation;