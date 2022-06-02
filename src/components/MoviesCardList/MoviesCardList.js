import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { serverUrl } from '../../utils/config';

function MoviesCardList(props) {
  const buttonClassName = 'card__saved-button card__saved-button_type_movies';
  const buttonClassNameActive = 'card__saved-button card__saved-button_type_movies card__saved-button_active';
  console.log(props.isMessage);

  return (
    <section className='cards'>
      {props.movies && props.movies.length > 0 ?
        props.movies.map(movie => {
          const isSaved = props.savedMovies.some(savedMovie => savedMovie.movieId === movie.id);

          return(
            <MoviesCard
              key={movie.id}
              name={movie.nameRU}
              duration={movie.duration}
              imageLink={serverUrl.imageMovies + movie.image.url}
              trailerLink={movie.trailerLink}
            >
              <button
                className={isSaved ? buttonClassNameActive : buttonClassName}
                onClick={() => {
                  isSaved ? props.onDeleteMovies(movie) : props.onSaveMovies(movie);
                }}
              />
            </MoviesCard>
          )
        })
        :
        <p className='cards__message'>{props.isMessage}</p>
      }
    </section>
  )
}

export default MoviesCardList;