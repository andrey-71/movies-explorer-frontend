import {useState} from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import MenuBurger from '../MenuBurger/MenuBurger';

function Header() {
  const isLogged = true; // del
  const [isMenuBurgerActive, setIsMenuBurgerActive] = useState(false);

  function handleMenuBurger() {
    setIsMenuBurgerActive(!isMenuBurgerActive);
  }

  return (
    <header className={isLogged ?
      'header header_type_authorized page__header'
      :
      'header header_type_unauthorized page__header'
    }>
      <Logo />
      <Navigation
        isLogged={isLogged}
      />
      {isLogged && <BurgerButton onClick={handleMenuBurger}/>}
      <MenuBurger isActive={isMenuBurgerActive} />
    </header>
  )
}

export default Header;