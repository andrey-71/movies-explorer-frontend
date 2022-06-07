import './ResultRequestPopup.css';

function ResultRequestPopup() {

  return(
    <div className='popup'>
      <div className='popup__container'>
        <div className='popup__image'></div>
        <h1 className='popup__title'>Всё прошло успешно</h1>
        <p className='popup__message'>Ошибок нет</p>
        <button className='popup__btn-close'></button>
      </div>
    </div>
  )
}

export default ResultRequestPopup;