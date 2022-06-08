import './InfoTooltipPopup.css';

function InfoTooltipPopup({infoTooltip}) {

  return(
    <div
      className={`popup ${infoTooltip.isOpen && 'popup_active'}`}
      onMouseDown={infoTooltip.onCloseOverlay}
    >
      <div className='popup__container'>
        <div
          className={`popup__image ${infoTooltip.state ?
            'popup__image_success' : 'popup__image_error'}`}
        />
        <h1 className='popup__title'>{infoTooltip?.title}</h1>
        <p className='popup__message'>{infoTooltip?.message}</p>
        <button className='popup__btn-close' onClick={infoTooltip.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltipPopup;