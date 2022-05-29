import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);

  // Загрузка сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
  }, []);

  const pageSavedMovies = true;

  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        isPageSavedMovies={pageSavedMovies}
        movies={savedMovies}
      />
    </section>
  )
}

export default SavedMovies;