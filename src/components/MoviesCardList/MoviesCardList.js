import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const baseUrl = 'https://api.nomoreparties.co/';

  return (
    <section className='cards'>
      {props.movies.length !== 0 && props.movies.map(movie => {
        return (
          <MoviesCard
            key={movie.id}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={baseUrl + movie.image.url}
            isPageSavedMovies={props.isPageSavedMovies}
          />
        )
      })}
    </section>
  )
}

export default MoviesCardList;