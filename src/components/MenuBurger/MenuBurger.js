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
          <h2 className='menu-burger__title'>Главная</h2>
          <a href='#' className='menu-burger__link menu-burger__link_active'>Фильмы</a>
          <a href='#' className='menu-burger__link'>Сохраненные фильмы</a>
        </div>
        <button className='menu-burger__account-button'>Аккаунт</button>
      </nav>
    </div>
  )
}

export default MenuBurger;