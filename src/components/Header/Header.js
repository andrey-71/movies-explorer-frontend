import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  const auth = false;

  return (
    <header className={auth ?
      'header header_type_authorized container__header'
      :
      'header header_type_unauthorized container__header'
    }>
      <div className='header__logo'> </div>
      <Navigation
        auth={auth}
      />
    </header>
  )
}

export default Header;