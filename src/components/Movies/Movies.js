import './Movies.css';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import moviesApi from "../../utils/MoviesApi";
import mainApi from '../../utils/MainApi';
import { serverUrl } from '../../utils/config'

function Movies() {
  // Все фильмы
  const [allMovies, setAllMovies] = useState([]);
  // Найденные при поиске карточки
  const [foundMovies, setFoundMovies] = useState([]);
  // Карточки с фильмами для рендеринга
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

  // Загрузка всех карточек, запись данных из localStorage
  useEffect(() => {
    setIsPreloader(true);
      moviesApi.getMovies()
        .then((movies) => {
          setAllMovies(movies);
          setLocalStorageInitialData();
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsPreloader(false);
        });
  }, []);

  // Загрузка сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then(savedMovies => {
        setSavedMovies(savedMovies);
      })
  }, []);

  // Функция записи параметров из localStorage при загрузке страницы
  function setLocalStorageInitialData() {
    setRenderMovies(JSON.parse(localStorage.renderMovies));
    setFoundMovies(JSON.parse(localStorage.foundMovies));
    setDataSearch(localStorage.dataSearchMovies);
    setIsFilterShortMovies(JSON.parse(localStorage.filterShortMovies));
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

  // Функция обработки данных в поисковой строке
  function handleChangeDataSearch(evt) {
    setDataSearch(evt.target.value);
    localStorage.setItem('dataSearchMovies', evt.target.value);
  }

  // Функция поиска фильмов
  function searchMovies(evt) {
    evt.preventDefault();
    if (dataSearch.length !== 0) {
      try {
        handleRenderMovies(handleFoundMovies(dataSearch));
        localStorage.setItem('filterShortMovies', JSON.stringify(isFilterShortMovies));
      }
      catch (err) {
        console.log('Произошла ошибка');
      }
    }
    else {
      console.log('Введите название фильма');
    }
  }

  // Функция обработки результатов посика
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
      console.log('Ничего не найдено');
    }
  }

  // Функция включения/отключения фильтра короткометражных фильмов
  function handleFilteredShortMovies() {
    setIsFilterShortMovies(!isFilterShortMovies);
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
      trailerLink: data.trailerLink,
      image: serverUrl.imageMovies + data.image.url,
      thumbnail: serverUrl.imageMovies + data.image.formats.thumbnail.url
    })
      .then((movie) => {
        setSavedMovies(allSavedMovies => {
          return [...allSavedMovies, movie];
        })
        console.log(movie);
      })
      .catch(err => console.log(`При сохранении фильма произошла ошибка: ${err}`));
  }

  // Функция удаления фильма
  function handleDeleteMovies(movie) {
    savedMovies.map((savedMovie) => {
      movie.id === savedMovie.movieId &&
        mainApi.deleteSavedMovies(savedMovie._id)
          .then(() => {
            setSavedMovies(savedMovies.filter(((m) => m._id !== savedMovie._id)));
          })
          .catch(err => console.log(`При удалении фильма произошла ошибка: ${err}`));
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
      <SearchForm
        dataSearch={dataSearch}
        isFilterShortMovies={isFilterShortMovies}
        onChangeDataSearch={handleChangeDataSearch}
        onSearchMovies={searchMovies}
        onFilteredShortMovies={handleFilteredShortMovies}
      />
      <MoviesCardList
        movies={renderMovies}
        savedMovies={savedMovies}
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