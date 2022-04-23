import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        isPageSavedMovies={props.isPageSavedMovies}
        movies={props.movies}
      />
    </section>
  )
}

export default SavedMovies;