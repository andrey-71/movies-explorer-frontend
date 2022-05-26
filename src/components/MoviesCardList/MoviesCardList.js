import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { serverUrl } from '../../utils/config';


function MoviesCardList(props) {
  
  return (
    <section className='cards'>
      {props.movies && props.movies.map(movie => {
        return (
          <MoviesCard
            key={props.isPageSavedMovies ? movie._id : movie.id}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={
              props.isPageSavedMovies ?
                movie.image
                :
                serverUrl.imageMovies + movie.image.url
            }
            trailerUrl={movie.trailerLink}
            isPageSavedMovies={props.isPageSavedMovies}
          />
        )
      })}
    </section>
  )
}

export default MoviesCardList;