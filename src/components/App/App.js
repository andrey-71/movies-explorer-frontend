import './App.css';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
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
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className='page'>
      <Routes>

        {/*О проекте*/}
        <Route path='/' element={
          <>
            <Header isLogged={isLogged} />
            <main className='content page__content'>
              <Main />
            </main>
            <Footer />
          </>

        } />

        {/*Регистрация*/}
        <Route path='/signup' element={
          <main className='content page__content'>
            <Register />
          </main>
        } />

        {/*Авторизация*/}
        <Route path='/signin' element={
          <main className='content page__content'>
            <Login />
          </main>
        } />

        {/*Фильмы*/}
        <Route path='/movies' element={
          <>
            <Header isLogged={!isLogged} />
            <main className='content page__content'>
              <Movies
                movies={moviesList}
              />
            </main>
            <Footer />
          </>
        } />

        {/*Сохраненные фильмы*/}
        <Route path='/saved-movies' element={
          <>
            <Header isLogged={!isLogged} />
            <main className='content page__content'>
              <SavedMovies
                movies={savedMoviesList}
              />
            </main>
            <Footer />
          </>
        } />

        {/*Профиль*/}
        <Route path='/profile' element={
          <>
            <Header isLogged={!isLogged} />
            <main className='content page__content'>
              <Profile />
            </main>
          </>
        } />

        {/*404 Страница не найдена*/}
        <Route path='*' element={
          <main className='content page__content'>
            <NotFoundPage />
          </main>
        } />

      </Routes>
    </div>
  );
}

export default App;
