import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { moviesList, savedMoviesList } from '../../utils/config';

function App() {
  const main = false;
  const movies = false;
  const savedMovies = false;
  const profile = true;
  // const register = false;
  // const login = false;

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

        {profile &&
          <Profile />
        }

        {!profile &&
        <Footer />
        }
      </main>
    </div>
  );
}

export default App;
