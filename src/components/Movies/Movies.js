import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';

function Movies() {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <AddMovies />
    </section>
  )
}

export default Movies;