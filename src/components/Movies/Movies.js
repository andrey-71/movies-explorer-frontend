import './Movies.css';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMovies from '../AddMovies/AddMovies';
import moviesApi from "../../utils/MoviesApi";

function Movies() {
  // Все фильмы
  const [allMovies, setAllMovies] = useState([]);
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
    setRenderMovies(JSON.parse(localStorage.getItem('renderMovies')));
    setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
    // if (foundMovies && foundMovies.length >= renderInitialCardNumber) {
    //   console.log(new Boolean(renderInitialCardNumber));
    //   console.log(new Boolean(foundMovies));
    //   setIsAddButton(true);
    // }
  }, []);

  // Установка обработчика отслеживания размеров экрана
  useEffect(() => {
    window.addEventListener("resize", () => setTimeout(handleScreenWidth, 500));
    return () => window.removeEventListener("resize", () => setTimeout(handleScreenWidth, 500));
  }, [renderInitialCardNumber, renderMoreCardNumber]);

  // Загрузка вех карточек
  useEffect(() => {
    setIsPreloader(true);
      moviesApi.getMovies()
        .then((movies) => {
          setAllMovies(movies);
        })
        .catch(err => console.log(err))
        .finally(() => setIsPreloader(false));
  }, []);

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
        localStorage.setItem('foundMovies', (JSON.stringify(foundMoviesList)));
        // Рендеринг карточек фильмов
        const renderMoviesList = [];
        if (foundMoviesList.length !== 0) {
          foundMoviesList.map(movie => {
            foundMoviesList.indexOf(movie) < renderInitialCardNumber && renderMoviesList.push(movie);
          })
          localStorage.setItem('renderMovies', (JSON.stringify(renderMoviesList)));
          foundMoviesList.length >= renderInitialCardNumber && setIsAddButton(true);
          // Запись в стейт найденных и отрендеринных фильмов
          setFoundMovies(foundMoviesList);
          setRenderMovies(renderMoviesList);
        } else {
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