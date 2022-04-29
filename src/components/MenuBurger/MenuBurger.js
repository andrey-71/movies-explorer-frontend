import './MenuBurger.css';
import { Link } from 'react-router-dom';
import AccountButton from '../AccountButton/AccountButton';

function MenuBurger(props) {
  const menuBurgerClassName = props.isActive ?
    'menu-burger menu-burger_active'
    :
    'menu-burger';

  const menuBurgerContainerClassName = props.isActive ?
    'menu-burger__container menu-burger__container_active'
    :
    'menu-burger__container';

  return(
    <div className={menuBurgerClassName}>
      <nav className={menuBurgerContainerClassName}>
        <div className='menu-burger__films'>
          <Link
            className='menu-burger__link'
            to='/'
            onClick={props.onClick}
          >
            Главная
          </Link>
          <Link
            className='menu-burger__link menu-burger__link_active'
            to='/movies'
            onClick={props.onClick}
          >
            Фильмы
          </Link>
          <Link
            className='menu-burger__link'
            to='/saved-movies'
            onClick={props.onClick}
          >
            Сохраненные фильмы
          </Link>
        </div>
        <div className='menu-burger__account-button-container'>
          <AccountButton
            isMenuBurgerActive={props.isActive}
            onClick={props.onClick}
          />
        </div>
      </nav>
    </div>
  )
}

export default MenuBurger;