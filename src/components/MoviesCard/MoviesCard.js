import './MoviesCard.css';
import {useState} from 'react';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);
  const buttonMoviesClassName = !isSaved ?
    'card__saved-button card__saved-button_type_movies'
    :
    'card__saved-button card__saved-button_type_movies card__saved-button_active';
  const buttonSavedMoviesClassName = 'card__saved-button card__saved-button_type_saved-movies';

  function handleSavedFilm() {
    return setIsSaved(!isSaved);
  }

  function calcDuration() {
    const hours = props.duration/60;
    const minutes = props.duration%60;
    let resultDuration = '';
    if (hours !== 0) { resultDuration += `${parseInt(hours)}ч ` }
    if (minutes !== 0) { resultDuration += `${minutes}м` }
    return resultDuration;
  }

  const durationMovies = calcDuration();

  return (
    <article className='card'>
      <div className='card__container-info'>
        <h2 className='card__title'>{props.name}</h2>
        <p className='card__duration'>{durationMovies}</p>
        {!props.isPageSavedMovies ?
          <button
            className={buttonMoviesClassName}
            onClick={handleSavedFilm}
          />
          :
          <button
            className={buttonSavedMoviesClassName}
          />
        }
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