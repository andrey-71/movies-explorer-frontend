import './MoviesCard.css';

function MoviesCard(props) {

  // Функция для перевода времени
  function calcDuration() {
    const hours = props.duration/60;
    const minutes = props.duration%60;
    let resultDuration = '';
    if (parseInt(hours) > 0) { resultDuration += `${parseInt(hours)}ч ` }
    if (minutes > 0) { resultDuration += `${minutes}м` }
    return resultDuration;
  }

  const durationMovies = calcDuration();

  return (
    <article className='card'>
      <div className='card__container-info'>
        <h2 className='card__title'>{props.name}</h2>
        <p className='card__duration'>{durationMovies}</p>
        {props.children}
      </div>
      <a className='card__image-container' href={props.trailerLink} target='_blank'>
        <img
          className='card__image'
          src={props.imageLink}
          alt='Изображение-превью к фильму'
        />
      </a>
    </article>
  )
}

export default MoviesCard;