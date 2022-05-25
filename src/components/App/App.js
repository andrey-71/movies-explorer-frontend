import './App.css';
import { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Footer from '../Footer/Footer';
import { savedMoviesList } from '../../utils/config';
import mainApi from "../../utils/MainApi";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  // Регистрация пользователя
  function handleRegister(userData) {
    mainApi.register(userData)
      .then(user => {
        console.log(user);
        navigate('/signin');
      })
      .catch(err => console.log(`При регистрации произошла ошибка: ${err}`));
  }

  // Авторизация пользователя
  function handleLogin(userData) {
    mainApi.login(userData)
      .then(user => {
        console.log(user._id);
        localStorage.setItem('idUser', user._id);
        setIsLogged(true);
        navigate('/movies');
      })
      .catch(err => console.log(`При авторизации произошла ошибка: ${err}`))
  }

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
            <Register
              onRegister={handleRegister}
            />
          </main>
        } />

        {/*Авторизация*/}
        <Route path='/signin' element={
          <main className='content page__content'>
            <Login
              onLogin={handleLogin}
            />
          </main>
        } />

        {/*Фильмы*/}
        <Route path='/movies' element={
          <>
            <Header isLogged={isLogged} />
            <main className='content page__content'>
              <Movies />
            </main>
            <Footer />
          </>
        } />

        {/*Сохраненные фильмы*/}
        <Route path='/saved-movies' element={
          <>
            <Header isLogged={isLogged} />
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
            <Header isLogged={isLogged} />
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
