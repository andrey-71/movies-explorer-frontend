import './SavedMoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMoviesCardList(props) {
  const buttonClassName = 'card__saved-button card__saved-button_type_saved-movies';

  return(
    <section className='cards'>
      {props.movies && props.movies.length > 0 ?
        props.movies.map(movie => {
          return(
            <MoviesCard
              key={movie._id}
              name={movie.nameRU}
              duration={movie.duration}
              imageLink={movie.image}
              trailerLink={movie.trailerLink}
              handleAddSavedMovies={props.handleAddSavedMovies}
            >
              <button
                className={buttonClassName}
                onClick={() => props.onDeleteMovies(movie)}
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

export default SavedMoviesCardList;