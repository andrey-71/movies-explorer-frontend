import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const pageSavedMovies = true;

  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        isPageSavedMovies={pageSavedMovies}
        movies={props.movies}
      />
    </section>
  )
}

export default SavedMovies;