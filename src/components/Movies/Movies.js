import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';

function Movies() {

  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <AddMovies />
    </>
  )
}

export default Movies;