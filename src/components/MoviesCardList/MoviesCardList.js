import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { serverUrl } from '../../utils/config';


function MoviesCardList(props) {

  return (
    <section className='cards'>
      {props.movies && props.movies.map(movie => {
        return (
          <MoviesCard
            key={movie.id}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={serverUrl.imageMovies + movie.image.url}
            isPageSavedMovies={props.isPageSavedMovies}
          />
        )
      })}
    </section>
  )
}

export default MoviesCardList;