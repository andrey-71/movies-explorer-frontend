import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Footer from '../Footer/Footer';
import { moviesList, savedMoviesList } from '../../utils/config';

function App() {
  const main = false;
  const movies = false;
  const savedMovies = false;
  const profile = false;
  const register = false;
  const login = false;
  const notFoundPage = true;

  return (
    <div className='page'>
      {!register && !login && !notFoundPage &&
        <Header />
      }

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

        {register &&
          <Register isRegister={register} />
        }

        {login &&
          <Login isLogin={login} />
        }

        {notFoundPage &&
          <NotFoundPage />
        }
      </main>

      {!profile && !register && !login && !notFoundPage &&
        <Footer />
      }
    </div>
  );
}

export default App;
