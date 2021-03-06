import './Movies.css';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import InfoTooltipPopup from '../InfoTooltipPopup/InfoTooltipPopup';
import moviesApi from "../../utils/MoviesApi";
import mainApi from '../../utils/MainApi';
import { serverUrl } from '../../utils/config'

function Movies({infoTooltip}) {
  // Все фильмы
  const [allMovies, setAllMovies] = useState([]);
  // Найденные при поиске фильмы
  const [foundMovies, setFoundMovies] = useState([]);
  // Фильмы для рендеринга
  const [renderMovies, setRenderMovies] = useState([]);
  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  // Стейт данных в поисковой строке
  const [dataSearch, setDataSearch] = useState('');
  // Количество отрисовываемых карточек
  const [renderInitialCardNumber, setRenderInitialCardNumber] = useState(null);
  const [renderMoreCardNumber, setRenderMoreCardNumber] = useState(null);
  // Кнопка "Ещё"
  const [isAddButton, setIsAddButton] = useState(false);
  // Прелоадер
  const [isPreloader, setIsPreloader] = useState(false);
  // Фильтр короткометражек
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false);
  // Текст при отсутствии результата при поиске фильмов
  const [isMessageNotFoundMovies, setIsMessageNotFoundMovies] = useState('');

    // Установка кол-ва отрисовываемых (добавляемых) карточек в зависимости от ширины экрана
  useEffect(() => {
    handleScreenWidth();
  }, []);

  // Установка начального состояния кнопки "Ещё"
  useEffect(() => {
    if (foundMovies && foundMovies.length > 0 && foundMovies.length >= renderInitialCardNumber) {
      setIsAddButton(true);
    }
  }, [foundMovies, renderInitialCardNumber]);

  // Установка обработчика отслеживания размеров экрана
  useEffect(() => {
    window.addEventListener("resize", () => setTimeout(handleScreenWidth, 500));
    return () => window.removeEventListener("resize", () => setTimeout(handleScreenWidth, 500));
  }, [renderInitialCardNumber, renderMoreCardNumber]);

  // Загрузка всех фильмов, запись данных из localStorage
  useEffect(() => {
    setIsPreloader(true);
      moviesApi.getMovies()
        .then((movies) => {
          setAllMovies(movies);
          setLocalStorageInitialData();
          !localStorage.renderMovies ?
            setIsMessageNotFoundMovies('Введите ключевое слово')
            :
            setIsMessageNotFoundMovies('');
        })
        .catch(err => infoTooltip.onError(err, 'При загрузке фильмов произошла ошибка'))
        .finally(() => {
          setIsPreloader(false);
        });
  }, []);

  // Загрузка сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies(localStorage.idUser)
      .then(savedMovies => {
        setSavedMovies(savedMovies);
      })
      .catch(err => infoTooltip.onError(err, 'При загрузке сохраненных фильмов произошла ошибка'))
  }, []);

  // Функция записи параметров из localStorage при загрузке страницы
  function setLocalStorageInitialData() {
    localStorage.renderMovies && setRenderMovies(JSON.parse(localStorage.renderMovies));
    localStorage.foundMovies && setFoundMovies(JSON.parse(localStorage.foundMovies));
    localStorage.dataSearchMovies && setDataSearch(localStorage.dataSearchMovies);
    localStorage.filterShortMovies && setIsFilterShortMovies(JSON.parse(localStorage.filterShortMovies));
  }

  // Функция добавления фильмов при нажатии кнопки ещё из списка результатов поиска
  function handleAddMovies() {
    const renderMoviesList = [];
    foundMovies.map(movie => {
      if (foundMovies.indexOf(movie) < renderMovies.length + renderMoreCardNumber) {
        renderMoviesList.push(movie);
        if (foundMovies.indexOf(movie) === foundMovies.length - 1) {
          setIsAddButton(false);
        }
      }
    })
    setRenderMovies(renderMoviesList);
  }

  // Функция поиска фильмов
  function searchMovies(data) {
    if (data.length !== 0) {
      try {
        setDataSearch(data);
        handleRenderMovies(handleFoundMovies(data));
        localStorage.setItem('filterShortMovies', JSON.stringify(isFilterShortMovies));
        localStorage.setItem('dataSearchMovies', data);
      }
      catch(err) {
        infoTooltip.onError(err, 'Произошла ошибка');
      }
    }
  }

  // Функция обработки результатов поиска
  function handleFoundMovies(dataSearch) {
    if (isFilterShortMovies) {
      const foundMoviesList = allMovies.filter(movie => movie.nameRU.toLowerCase().indexOf(dataSearch.toLowerCase()) >= 0);
      return foundMoviesList.filter(foundMovie => foundMovie.duration <= 40);
    } else {
      return allMovies.filter(movie => movie.nameRU.toLowerCase().indexOf(dataSearch.toLowerCase()) >= 0);
    }
  }
  // Функция рендеринга карточек
  function handleRenderMovies(foundMovies) {
    const renderMoviesList = [];
    if (foundMovies.length !== 0) {
      foundMovies.map(movie => {
        foundMovies.indexOf(movie) < renderInitialCardNumber && renderMoviesList.push(movie);
      })
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      localStorage.setItem('renderMovies', JSON.stringify(renderMoviesList));
      // Обновление состояние кнопки при каждом поиске
      foundMovies.length >= renderInitialCardNumber ?
        setIsAddButton(true) : setIsAddButton(false);
      // Запись в стейт найденных и отрендеринных фильмов
      setFoundMovies(foundMovies);
      setRenderMovies(renderMoviesList);
    } else {
      setFoundMovies([]);
      setRenderMovies([]);
      localStorage.removeItem('foundMovies');
      localStorage.removeItem('renderMovies');
      setIsAddButton(false);
      setIsMessageNotFoundMovies('Ничего не найдено');
    }
  }

  // Функция включения/отключения фильтра короткометражных фильмов
  function handleClickFilteredShortMovies() {
      setIsFilterShortMovies(!isFilterShortMovies);
  }

  // Функция поиска короткометражек
  function handleFoundFilteredShortMovies() {
    if (dataSearch.length !== 0) {
      handleRenderMovies(handleFoundMovies(dataSearch));
      localStorage.setItem('filterShortMovies', JSON.stringify(isFilterShortMovies));
    }
  }

  // Функция сохранения фильма
  function handleSaveMovies(data) {
    mainApi.addSavedMovies({
      movieId: data.id,
      nameRU: data.nameRU ? data.nameRU : 'No name',
      nameEN: data.nameEN ? data.nameEN : 'No name',
      director: data.director ? data.director : 'No director',
      country: data.country ? data.country : 'No country',
      year: data.year ? data.year : '0000',
      duration: data.duration ? data.duration : 0,
      description: data.description ? data.description : 'No description',
      trailerLink: data.trailerLink ? data.trailerLink : `${serverUrl.current}/not-found`,
      image: data.image.url ? serverUrl.imageMovies + data.image.url : `${serverUrl.current}/not-found`,
      thumbnail: data.image.formats.thumbnail.url ? serverUrl.imageMovies + data.image.formats.thumbnail.url : `${serverUrl.current}/not-found`
    })
      .then((movie) => {
        setSavedMovies(allSavedMovies => {
          return [...allSavedMovies, movie];
        })
      })
      .catch(err => infoTooltip.onError(err, 'При сохранении фильма произошла ошибка'))
  }

  // Функция удаления фильма
  function handleDeleteMovies(movie) {
    savedMovies.map((savedMovie) => {
      movie.id === savedMovie.movieId &&
        mainApi.deleteSavedMovies(savedMovie._id)
          .then(() => {
            setSavedMovies(savedMovies.filter(((m) => m._id !== savedMovie._id)));
          })
          .catch(err => infoTooltip.onError(err, 'При удалении фильма произошла ошибка'))
    })
  }

  // Функция установки количества отрисовываемых карточек в зависимости от ширины экрана
  function handleScreenWidth() {
    if (document.documentElement.scrollWidth >= 1280) {
      setRenderInitialCardNumber(9);
      setRenderMoreCardNumber(3);
    }
    else if (document.documentElement.scrollWidth >= 728) {
      setRenderInitialCardNumber(6);
      setRenderMoreCardNumber(2);
    }
    else {
      setRenderInitialCardNumber(5);
      setRenderMoreCardNumber(2);
    }
  }

  return (
    <section className="movies">
      <InfoTooltipPopup infoTooltip={infoTooltip} />
      <SearchForm
        dataSearch={dataSearch}
        isFilterShortMovies={isFilterShortMovies}
        onSearchMovies={searchMovies}
        onFoundFiltered={handleFoundFilteredShortMovies}
        onClickFiltered={handleClickFilteredShortMovies}
      />
      <MoviesCardList
        movies={renderMovies}
        savedMovies={savedMovies}
        isMessage={isMessageNotFoundMovies}
        onSaveMovies={handleSaveMovies}
        onDeleteMovies={handleDeleteMovies}
      />
      {isAddButton || isPreloader ?
        <AddMovies
          isPreloaderVisible={isPreloader}
          onClick={handleAddMovies}
        />
        : null
      }
    </section>
  )
}

export default Movies;