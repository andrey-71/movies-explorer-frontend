import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { moviesList } from '../../utils/config';

function MoviesCardList() {
  const baseUrl = 'https://api.nomoreparties.co/';

  return (
    <>
      <section className='cards'>
        {moviesList.length !== 0 && moviesList.map(movie => {
          return (
            <MoviesCard
              key={movie.id}
              name={movie.nameRU}
              duration={movie.duration}
              imageUrl={baseUrl + movie.image.url}
            />
          )
        })}
      </section>
      <Preloader />
    </>

  )
}

export default MoviesCardList;