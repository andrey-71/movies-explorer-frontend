import './Movies.css';
import { useState } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import moviesApi from "../../utils/MoviesApi";

function Movies() {
  // Стейт карточек фильмов
  const [movies, setMovies] = useState([]);
  // Стейт данных в поисковой строке
  const [dataSearch, setDataSearch] = useState('');

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