import './Movies.css';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import moviesApi from "../../utils/MoviesApi";

function Movies() {
  // Стейт карточек фильмов
  const [movies, setMovies] = useState([]);
  // Стейт данных в поисковой строке
  const [dataSearch, setDataSearch] = useState('');
  // Количество отрисовываемых карточек
  const [renderInitialCardNumber, setRenderInitialCardNumber] = useState(null);
  const [renderMoreCardNumber, setRenderMoreCardNumber] = useState(null);

  // Начальная загрузка карточек, запись в localStorage


  // Установка обработчика отслеживания размеров экрана
  useEffect(() => {
    const handleScreenWidth = () => {
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
      }
    };

    window.addEventListener("resize", handleScreenWidth);
    return () => window.removeEventListener("resize", handleScreenWidth);
  }, [renderInitialCardNumber, renderMoreCardNumber]);

  console.log(renderInitialCardNumber, renderMoreCardNumber);

  // Функция обработки результатов поиска
  function checkMatchMovie(movies) {
    return movies.filter(movie => movie.nameRU.indexOf(dataSearch) >= 0);
  }

  // Получение фильмов и обработка результатов поиска
  function getMovies(e) {
    e.preventDefault();
    moviesApi.getMovies()
      .then((movies) => {
        dataSearch.length !== 0 && setMovies(checkMatchMovie(movies));
      })
      .catch(err => console.log(err));
  }

  return (
    <section className="movies">
      <SearchForm
        onClick={getMovies}
        dataSearch={dataSearch}
        setDataSearch={setDataSearch}
      />
      <MoviesCardList
        movies={movies}
      />
      <AddMovies />
    </section>
  )
}

export default Movies;