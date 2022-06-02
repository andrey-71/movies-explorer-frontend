import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function SavedMovies() {
  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  // Фильмы для рендеринга
  const [renderMovies, setRenderMovies] = useState([]);
  // Стейт данных в поисковой строке
  const [dataSearch, setDataSearch] = useState('');
  // Прелоадер
  const [isPreloader, setIsPreloader] = useState(false);
  // Фильтр короткометражек
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false);
  // Текст при отсутствии результата при поиске фильмов
  const [isMessageNotFoundMovies, setIsMessageNotFoundMovies] = useState('');

  // Загрузка сохраненных фильмов
  useEffect(() => {
    setIsPreloader(true);
    mainApi.getSavedMovies()
      .then(savedMovies => {
        setSavedMovies(savedMovies);
        setRenderMovies(savedMovies);
      })
      .catch(err => console.log(`При загрузке сохраненных фильмов произошла ошибка: ${err}`))
      .finally(() => setIsPreloader(false))
  }, []);

  // Функция обработки данных в поисковой строке
  function handleChangeDataSearch(evt) {
    setDataSearch(evt.target.value);
  }

  // Функция поиска фильмов
  function searchMovies(evt) {
    evt.preventDefault();
    if (dataSearch.length !== 0) {
      try {
        handleFoundSavedMovies(dataSearch);
      }
      catch (err) {
        console.log('Произошла ошибка');
      }
    }
    else {
      setRenderMovies(savedMovies);
    }
  }

  // Функция обработки результатов поиска
  function handleFoundSavedMovies(dataSearch) {
    const foundSavedMoviesList = savedMovies.filter(movie => movie.nameRU.toLowerCase().indexOf(dataSearch.toLowerCase()) >= 0);
    if (isFilterShortMovies && foundSavedMoviesList.length > 0) {
      setRenderMovies(foundSavedMoviesList.filter(movie => movie.duration <= 40))
    } else if (!isFilterShortMovies && foundSavedMoviesList.length > 0) {
      setRenderMovies(savedMovies.filter(movie => movie.nameRU.toLowerCase().indexOf(dataSearch.toLowerCase()) >= 0));
    } else if (foundSavedMoviesList.length === 0) {
      setRenderMovies([]);
      setIsMessageNotFoundMovies('Ничего не найдено');
    }
  }

  // Функция включения/отключения фильтра короткометражных фильмов
  function handleFilteredShortMovies() {
    setIsFilterShortMovies(!isFilterShortMovies);
  }

  // Функция удаления фильма
  function handleDeleteMovies(movie) {
    mainApi.deleteSavedMovies(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
        setRenderMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
      })
      .catch(err => console.log(`При удалении фильма произошла ошибка: ${err}`));
  }

  return (
    <section className='saved-movies'>
      <SearchForm
        dataSearch={dataSearch}
        isFilterShortMovies={isFilterShortMovies}
        onChangeDataSearch={handleChangeDataSearch}
        onSearchMovies={searchMovies}
        onFilteredShortMovies={handleFilteredShortMovies}
      />
      <SavedMoviesCardList
        movies={renderMovies}
        isMessage={isMessageNotFoundMovies}
        onDeleteMovies={handleDeleteMovies}
      />
      <Preloader isPreloaderVisible={isPreloader} />
    </section>
  )
}

export default SavedMovies;