import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import Preloader from '../Preloader/Preloader';
import InfoTooltipPopup from '../InfoTooltipPopup/InfoTooltipPopup';
import mainApi from '../../utils/MainApi';

function SavedMovies({infoTooltip}) {
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
    mainApi.getSavedMovies(localStorage.idUser)
      .then(savedMovies => {
        setSavedMovies(savedMovies);
        setRenderMovies(savedMovies);
      })
      .catch(err => infoTooltip.onError(err, 'При загрузке сохраненных фильмов произошла ошибка'))
      .finally(() => setIsPreloader(false))
  }, []);

  // Функция поиска фильмов
  function searchMovies(data) {
    if (data.length !== 0) {
      try {
        setDataSearch(data);
        handleFoundSavedMovies(data);
      }
      catch (err) {
        infoTooltip.onError(err, 'Произошла ошибка');
      }
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
  function handleClickFilteredShortMovies() {
    setIsFilterShortMovies(!isFilterShortMovies);
  }

  // Функция поиска короткометражек
  function handleFoundFilteredShortMovies() {
    if (savedMovies.length !== 0) {
      handleFoundSavedMovies(dataSearch);
    }
  }

  // Функция удаления фильма
  function handleDeleteMovies(movie) {
    mainApi.deleteSavedMovies(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
        setRenderMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
      })
      .catch(err => infoTooltip.onError(err, 'При удалении фильма произошла ошибка'))
  }

  return (
    <section className='saved-movies'>
      <InfoTooltipPopup infoTooltip={infoTooltip} />
      <SearchForm
        dataSearch={dataSearch}
        isFilterShortMovies={isFilterShortMovies}
        onSearchMovies={searchMovies}
        onFoundFiltered={handleFoundFilteredShortMovies}
        onClickFiltered={handleClickFilteredShortMovies}
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