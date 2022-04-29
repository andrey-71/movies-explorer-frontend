import './AccountButton.css';
import { Link } from "react-router-dom";

function AccountButton(props) {

  return (
    <Link className='account-button'
      to='/profile'
      onClick={() => {
        props.isMenuBurgerActive && props.onClick();
      }}
    >
      Аккаунт
    </Link>
  )
}

export default AccountButton;