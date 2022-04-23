import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import { moviesList, savedMoviesList } from '../../utils/config';

function App() {
  const main = false;
  const movies = true;
  const savedMovies = false;
  // const register = false;
  // const login = false;
  // const profile = false;

  return (
    <div className='page'>
      <Header />
        <main className='content page__content'>

          {main &&
            <Main />
          }

          {movies &&
            <Movies
              movies={moviesList}
            />
          }

          {savedMovies &&
            <SavedMovies
              isPageSavedMovies={savedMovies}
              movies={savedMoviesList}
            />
          }

        </main>
      <Footer />
    </div>
  );
}

export default App;
