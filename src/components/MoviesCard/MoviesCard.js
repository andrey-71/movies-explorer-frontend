import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { serverUrl } from '../../utils/config';
import mainApi from '../../utils/MainApi';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);
  const buttonMoviesClassName = !isSaved ?
    'card__saved-button card__saved-button_type_movies'
    :
    'card__saved-button card__saved-button_type_movies card__saved-button_active';
  const buttonSavedMoviesClassName = 'card__saved-button card__saved-button_type_saved-movies';

  // Определение сохраненных фильмов
  useEffect(() => {
    if (!props.isPageSavedMovies) {
      mainApi.getSavedMovies()
        .then(savedMovies => {
          if (savedMovies) {
            savedMovies.some(savedMovie => {
              savedMovie.movieId === props.movie.id && setIsSaved(true);
            })
          }
        })
        .catch(err => console.log(`При загрузке фильмов произошла ошибка: ${err}`));
    }
  }, []);

  console.log(isSaved);

  // Функция сохранения фильма
  function handleAddSavedMovies(data) {
    mainApi.addSavedMovies(data)
      .then(() => {
        setIsSaved(true);
        console.log(true);
      })
      .catch(err => console.log(`При сохранении фильма произошла ошибка: ${err}`));
  }

    // Функция сохранения фильмов
  function handleSavedMovie(evt) {
    evt.stopPropagation();
    !isSaved && handleAddSavedMovies(props.movie);
  }

  // Функция для перевода времени
  function calcDuration() {
    const hours = props.movie.duration/60;
    const minutes = props.movie.duration%60;
    let resultDuration = '';
    if (parseInt(hours) > 0) { resultDuration += `${parseInt(hours)}ч ` }
    if (minutes > 0) { resultDuration += `${minutes}м` }
    return resultDuration;
  }

  const durationMovies = calcDuration();

  return (
    <article className='card'>
      <a className='card__container' href={props.movie.trailerLink} target='_blank' />
      <div className='card__container-info'>
        <h2 className='card__title'>{props.movie.nameRU}</h2>
        <p className='card__duration'>{durationMovies}</p>
        {!props.isPageSavedMovies ?
          <button
            className={buttonMoviesClassName}
            onClick={handleSavedMovie}
          />
          :
          <button
            className={buttonSavedMoviesClassName}
          />
        }
      </div>
      <img
        className='card__image'
        src={props.isPageSavedMovies ?
          props.movie.image : serverUrl.imageMovies + props.movie.image.url}
        alt='Изображение-превью к фильму'
      />
    </article>
  )
}

export default MoviesCard;