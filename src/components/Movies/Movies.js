import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import AddMovies from '../AddMovies/AddMovies';

function Movies() {

  return (
    <>
      <SearchForm />
      <Preloader />
      <AddMovies />
    </>
  )
}

export default Movies;