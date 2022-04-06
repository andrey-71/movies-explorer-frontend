import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';

function Header() {
  const isLogged = true; // del

  return (
    <header className={isLogged ?
      'header header_type_authorized container__header'
      :
      'header header_type_unauthorized container__header'
    }>
      <Logo />
      <Navigation
        isLogged={isLogged}
      />
      {isLogged && <BurgerButton />}
    </header>
  )
}

export default Header;