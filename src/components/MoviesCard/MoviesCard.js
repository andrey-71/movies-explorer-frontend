import './MoviesCard.css';
import {useState} from 'react';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);
  const savedButtonClassName = !isSaved ? 'card__saved-button'
    : 'card__saved-button card__saved-button_active';

  function handleSavedFilm() {
    return setIsSaved(!isSaved);
  }

  function calcDuration() {
    const hours = props.duration/60;
    const minutes = props.duration%60;
    let resultDuration = '';
    if (hours !== 0) { resultDuration += `${parseInt(hours)}ч ` }
    if (minutes !== 0) { resultDuration += `${minutes}m` }
    return resultDuration;
  }

  const durationMovies = calcDuration();

  return (
    <article className='card'>
      <div className='card__container-info'>
        <h2 className='card__title'>{props.name}</h2>
        <p className='card__duration'>{durationMovies}</p>
        <button
          className={savedButtonClassName}
          onClick={handleSavedFilm}
        />
      </div>
      <img
        className='card__image'
        src={props.imageUrl}
        alt='Изображение-превью к фильму'
      />
    </article>
  )
}

export default MoviesCard;