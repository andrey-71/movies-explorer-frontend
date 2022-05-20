import './Movies.css';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import moviesApi from "../../utils/MoviesApi";

function Movies() {
  // Найденные при поиске карточки
  const [foundMovies, setFoundMovies] = useState([]);
  // Карточки с фильмами для рендеринга
  const [renderMovies, setRenderMovies] = useState([]);
  // Стейт данных в поисковой строке
  const [dataSearch, setDataSearch] = useState('');
  // Количество отрисовываемых карточек
  const [renderInitialCardNumber, setRenderInitialCardNumber] = useState(null);
  const [renderMoreCardNumber, setRenderMoreCardNumber] = useState(null);
  // Кнопка "Ещё"
  const [isAddButton, setIsAddButton] = useState(false);
  // Прелоадер
  const [isPreloader, setIsPreloader] = useState(false);

  // Установка кол-ва отрисовываемых (добавляемых) карточек в зависимости от ширины экрана
  useEffect(() => {
    handleScreenWidth();
  }, []);

  // Установка обработчика отслеживания размеров экрана
  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
    return () => window.removeEventListener("resize", handleScreenWidth);
  }, [renderInitialCardNumber, renderMoreCardNumber]);

  // Запись всех карточек в localStorage,
  useEffect(() => {
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
        })
        .catch(err => console.log(err))
  }, []);

  // Функция добавления фильмов при нажатии кнопки ещё из списка результатов поиска
  function handleAddMovies() {
    const renderMoviesList = [];
    foundMovies.map(movie => {
      if (foundMovies.indexOf(movie) < renderMovies.length + renderMoreCardNumber) {
        console.log(foundMovies.indexOf(movie));
        renderMoviesList.push(movie);
        if (foundMovies.indexOf(movie) === foundMovies.length - 1) {
          setIsAddButton(false);
        }
      }
    })
    setRenderMovies(renderMoviesList);
  }

  // Функция создания списка фильмов для первичного рендеринга
  function renderingMoviesList(movies) {
    const renderMoviesList = [];
    movies.length !== 0 &&
    movies.map(movie => {
      if (movies.indexOf(movie) < renderInitialCardNumber) {
        renderMoviesList.push(movie);
      }
    })
    if (foundMovies.length >= renderInitialCardNumber) {
      setIsAddButton(true);
    }
    setRenderMovies(renderMoviesList);
  }

  // Функция обработки результатов поиска
  function checkMatchMovie(movies) {
    const foundMoviesList = movies.filter(movie => movie.nameRU.indexOf(dataSearch) >= 0);
    foundMoviesList.length !==0 && setFoundMovies(foundMoviesList);
  }

  // Получение фильмов и обработка результатов поиска
  function searchMovies(e) {
    e.preventDefault();
    if (dataSearch.length !== 0) {
      try {
        const allMoviesList = JSON.parse(localStorage.allMovies);
        checkMatchMovie(allMoviesList);
        renderingMoviesList(foundMovies);
      } catch (err) {
        console.log('Ничего не найдено');
      }
    } else {
      console.log('Введите название фильма');
    }
  }

  // Функция установки количества отрисовываемых карточек в зависимости от разрешения
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
      />
      <MoviesCardList
        movies={renderMovies}
        renderInitialCardNumber={renderInitialCardNumber}
        renderMoreCardNumber={renderMoreCardNumber}
      />
      {isAddButton ?
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