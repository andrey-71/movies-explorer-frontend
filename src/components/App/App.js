import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from '../Footer/Footer';
import { moviesList, savedMoviesList } from '../../utils/config';

function App() {
  const main = false;
  const movies = false;
  const savedMovies = false;
  const profile = false;
  const register = false;
  const login = true;

  return (
    <div className='page'>
      {!register && !login &&
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
      </main>

      {!profile && !register && !login &&
        <Footer />
      }
    </div>
  );
}

export default App;
