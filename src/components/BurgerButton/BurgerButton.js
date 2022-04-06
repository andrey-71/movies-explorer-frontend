import './BurgerButton.css';

function BurgerButton(props) {

  return(
    <div className='burger'>
      <input id='burger__toggle' className='burger__toggle' type='checkbox' />
      <label
        className='burger__button'
        htmlFor='burger__toggle'
        onClick={props.onClick}
      >
        <span className='burger__button-item' />
      </label>
    </div>
  )
}

export default BurgerButton;