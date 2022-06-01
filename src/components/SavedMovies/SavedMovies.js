import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);

  // Загрузка сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then(savedMovies => {
        setSavedMovies(savedMovies);
      })
      .catch(err => console.log(`При загрузке сохраненных фильмов произошла ошибка: ${err}`))
  }, []);

  // Функция удаления фильма
  function handleDeleteMovies(movie) {
    mainApi.deleteSavedMovies(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
      })
      .catch(err => console.log(`При удалении фильма произошла ошибка: ${err}`));
  }

  return (
    <section className='saved-movies'>
      <SearchForm />
      <SavedMoviesCardList
        savedMovies={savedMovies}
        onDeleteMovies={handleDeleteMovies}
      />
    </section>
  )
}

export default SavedMovies;