import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

function App() {
  const main = false;
  const movies = true;
  // const savedMovies = false;
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
            <Movies />
          }

        </main>
      <Footer />
    </div>
  );
}

export default App;
