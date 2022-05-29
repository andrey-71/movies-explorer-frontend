import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  
  return (
    <section className='cards'>
      {props.movies && props.movies.map(movie => {
        return (
          <MoviesCard
            key={props.isPageSavedMovies ? movie._id : movie.id}
            movie={movie}
            isPageSavedMovies={props.isPageSavedMovies}
            handleAddSavedMovies={props.handleAddSavedMovies}
          />
        )
      })}
    </section>
  )
}

export default MoviesCardList;