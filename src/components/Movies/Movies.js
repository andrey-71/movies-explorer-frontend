import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        movies={props.movies}
      />
      <AddMovies />
    </section>
  )
}

export default Movies;