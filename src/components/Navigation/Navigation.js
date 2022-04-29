import './Navigation.css';
import { Link } from 'react-router-dom';
import AccountButton from "../AccountButton/AccountButton";

function Navigation(props) {

  return (
    <nav className='navigation'>
      {props.isLogged ?
        <div className='navigation__authorized'>
          <div>
            <Link className='navigation__link navigation__link_type_films' to='/movies'>Фильмы</Link>
            <Link className='navigation__link navigation__link_type_save-films' to='/saved-movies'>Сохранённые фильмы</Link>
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