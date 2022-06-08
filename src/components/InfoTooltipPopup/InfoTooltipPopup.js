import './InfoTooltipPopup.css';

function InfoTooltipPopup(props) {

  return(
    <div
      className={`popup ${props.infoTooltip.isOpen && 'popup_active'}`}
      onMouseDown={props.infoTooltip.onCloseOverlay}
    >
      <div className='popup__container'>
        <div
          className={`popup__image ${props.infoTooltip.state ?
            'popup__image_success' : 'popup__image_error'}`}
        />
        <h1 className='popup__title'>{props.infoTooltip?.title}</h1>
        <p className='popup__message'>{props.infoTooltip?.message}</p>
        <button className='popup__btn-close' onClick={props.infoTooltip.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltipPopup;