import {useState} from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import MenuBurger from '../MenuBurger/MenuBurger';

function Header(props) {
  const [isMenuBurgerActive, setIsMenuBurgerActive] = useState(false);

  function handleMenuBurger() {
    setIsMenuBurgerActive(!isMenuBurgerActive);
  }

  return (
    <header className={props.isLogged ?
      'header header_type_authorized page__header'
      :
      'header header_type_unauthorized page__header'
    }>
      <Logo />
      <Navigation
        isLogged={props.isLogged}
      />
      {props.isLogged &&
        <BurgerButton
          isMenuBurgerActive={isMenuBurgerActive}
          onClick={handleMenuBurger}
        />
      }
      <MenuBurger
        isActive={isMenuBurgerActive}
        onClick={handleMenuBurger}
      />
    </header>
  )
}

export default Header;