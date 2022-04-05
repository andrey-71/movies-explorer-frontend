import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header() {
  const auth = true;

  return (
    <header className={auth ?
      'header header_type_authorized container__header'
      :
      'header header_type_unauthorized container__header'
    }>
      <Logo />
      <Navigation
        auth={auth}
      />
    </header>
  )
}

export default Header;