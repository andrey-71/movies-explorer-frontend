import './MenuBurger.css'

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
          <a href='#' className='menu-burger__link'>Главная</a>
          <a href='#' className='menu-burger__link'>Фильмы</a>
          <a href='#' className='menu-burger__link'>Сохраненные фильмы</a>
        </div>
        <a href='#' className='menu-burger__link menu-burger__link_account'>Аккаунт</a>
      </nav>
    </div>
  )
}

export default MenuBurger;