import './App.css';
import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
  const navigate = useNavigate();
  // Состояние авторизации
  const [isLogged, setIsLogged] = useState(false);
  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});

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
        getUserData(user._id);
        localStorage.setItem('idUser', user._id);
        setIsLogged(true);
        navigate('/movies');
      })
      .catch(err => console.log(`При авторизации произошла ошибка: ${err}`))
  }

  // --- !!! Проверить после полной настройки авторизации
  // Выход из учетной записи
  function handleLogout() {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('idUser');
        localStorage.removeItem('foundMovies');
        localStorage.removeItem('renderMovies');
        localStorage.removeItem('dataSearch');
        localStorage.removeItem('filterShortMovies');
        navigate('/');
      })
      .catch(err => console.log(`При выходе из учетной записи произошла ошибка: ${err}`))
  }
  // --- !!!

  // Получение данных пользователя
  function getUserData(id) {
    mainApi.getUserData(id)
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(`При загрузке данных пользователя произошла ошибка: ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              <Register onRegister={handleRegister} />
            </main>
          } />

          {/*Авторизация*/}
          <Route path='/signin' element={
            <main className='content page__content'>
              <Login onLogin={handleLogin} />
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
                <Profile onLogout={handleLogout} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
