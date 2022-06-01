import './Movies.css';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import moviesApi from "../../utils/MoviesApi";
import mainApi from '../../utils/MainApi';

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
    setRenderMovies(JSON.parse(localStorage.getItem('renderMovies')));
    setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
    setDataSearch(localStorage.getItem('dataSearch'));
    setIsFilterShortMovies(JSON.parse(localStorage.getItem('filterShortMovies')));
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

  // Функция поиска фильмов и рендеринга на странице
  function searchMovies(e) {
    e.preventDefault();
    if (dataSearch.length !== 0) {
      try {
        // Обработка результатов поиска
        const foundMoviesList = allMovies.filter(movie => movie.nameRU.toLowerCase().indexOf(dataSearch.toLowerCase()) >= 0);
        localStorage.setItem('foundMovies', JSON.stringify(foundMoviesList));
        console.log(foundMoviesList);
        // Рендеринг карточек фильмов
        const renderMoviesList = [];
        if (foundMoviesList.length !== 0) {
          foundMoviesList.map(movie => {
            foundMoviesList.indexOf(movie) < renderInitialCardNumber && renderMoviesList.push(movie);
          })
          localStorage.setItem('renderMovies', JSON.stringify(renderMoviesList));
          // Обновление состояние кнопки при каждом поиске
          foundMoviesList.length >= renderInitialCardNumber ?
            setIsAddButton(true) : setIsAddButton(false);
          // Запись в стейт найденных и отрендеринных фильмов
          setFoundMovies(foundMoviesList);
          setRenderMovies(renderMoviesList);
        } else {
          setRenderMovies([]);
          localStorage.removeItem('renderMovies');
          console.log('Ничего не найдено');
        }
      }
      catch (err) {
        console.log('Произошла ошибка');
      }
    } else {
      console.log('Введите название фильма');
    }
  }

  // Функция сохранения фильма
  function handleSaveMovies(data) {
    mainApi.addSavedMovies(data)
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
        onClick={searchMovies}
        dataSearch={dataSearch}
        setDataSearch={setDataSearch}
        isFilterShortMovies={isFilterShortMovies}
        setIsFilterShortMovies={setIsFilterShortMovies}
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