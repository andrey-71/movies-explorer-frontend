import './BurgerButton.css';

function BurgerButton(props) {

  return(
    <div className='burger'>
      <label
        className={props.isMenuBurgerActive ?
          'burger__button burger__button_active'
          :
          'burger__button'
      }
        onClick={props.onClick}
      >
        <span className='burger__button-item' />
      </label>
    </div>
  )
}

export default BurgerButton;