import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Footer from '../Footer/Footer';
import mainApi from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  // Состояние авторизации
  const [isLogged, setIsLogged] = useState(false);
  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Информационный попап
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({});

  // Автоматическая авторизация при наличии id пользователя в localStorage
  useEffect(() => {
    const idUser = localStorage.idUser;
    if (idUser) {
      handleGetUserData(idUser);
      setIsLogged(true);
      navigate(window.location.pathname);
    }
  }, []);

  // Регистрация пользователя
  function handleRegister(userData) {
    mainApi.register(userData)
      .then(() => {
        handleLogin({emailLogin: userData.emailRegister, passwordLogin: userData.passwordRegister});
      })
      .catch(err => console.log(`При регистрации произошла ошибка: ${err}`));
  }

  // Авторизация пользователя
  function handleLogin(userData) {
    mainApi.login(userData)
      .then(user => {
        setCurrentUser(user);
        localStorage.setItem('idUser', user._id);
        setIsLogged(true);
        navigate('/movies');
      })
      .catch(err => console.log(`При авторизации произошла ошибка: ${err}`))
  }

  // Выход из учетной записи
  function handleLogout() {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('idUser');
        localStorage.removeItem('foundMovies');
        localStorage.removeItem('renderMovies');
        localStorage.removeItem('dataSearchMovies');
        localStorage.removeItem('filterShortMovies');
        setCurrentUser({});
        setIsLogged(false);
        navigate('/');
      })
      .catch(err => console.log(`При выходе из учетной записи произошла ошибка: ${err}`))
  }

  // Получение данных пользователя по id
  function handleGetUserData(id) {
    mainApi.getUserData(id)
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(`При загрузке данных пользователя произошла ошибка: ${err}`))
  }

  // Обновление данных пользователя
  function handleUpdateUserData(data) {
    mainApi.updateUserData(data)
      .then(res => {
        setCurrentUser(res);
        setIsInfoTooltip(true);
        setInfoTooltipData({
          state: true,
          title: 'Данные успешно обновлены'
        })
        setTimeout(closeInfoTooltip, 2000);
      })
      .catch(err => {
        setIsInfoTooltip(true);
        setInfoTooltipData({
          state: false,
          title: 'При обновлении данных пользователя произошла ошибка',
          message: err
        });
      })
  }

  // Закрытие попапа
  function closeInfoTooltip() {
    setIsInfoTooltip(false);
    setInfoTooltipData({});
  }
  // Закрытие попапа при клике на overlay
  function closeInfoTooltipOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeInfoTooltip();
      setInfoTooltipData({});
    }
  }
  // Закрытие попапа при нажатии Esc
  function closeInfoTooltipEscClick(evt) {
    if (evt.key === 'Escape') {
      closeInfoTooltip();
    }
  }
  // Установка слушателя нажатия клавиши Esc при открытом InfoTooltip
  useEffect(() => {
    if (isInfoTooltip) {
      document.addEventListener('keyup', closeInfoTooltipEscClick);
      // Снятие слушателя
      return () => {
        document.removeEventListener('keyup', closeInfoTooltipEscClick);
      };
    }
  }, [isInfoTooltip]);

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
              <ProtectedRoute isLogin={isLogged}>
                <Header isLogged={isLogged} />
                <main className='content page__content'>
                  <Movies />
                </main>
                <Footer />
              </ProtectedRoute>
            } />

            {/*Сохраненные фильмы*/}
            <Route path='/saved-movies' element={
              <ProtectedRoute isLogin={isLogged}>
                <Header isLogged={isLogged} />
                <main className='content page__content'>
                  <SavedMovies />
                </main>
                <Footer />
              </ProtectedRoute>
            } />

            {/*Профиль*/}
            <Route path='/profile' element={
              <ProtectedRoute isLogin={isLogged}>
                <Header isLogged={isLogged} />
                <main className='content page__content'>
                  <Profile
                    infoTooltip={{
                      isOpen: isInfoTooltip,
                      state: infoTooltipData.state,
                      title: infoTooltipData.title,
                      message: infoTooltipData.message,
                      onClose: closeInfoTooltip,
                      onCloseOverlay: closeInfoTooltipOverlayClick
                    }}
                    isInfoTooltipData={infoTooltipData}
                    onDataUpdate={handleUpdateUserData}
                    onLogout={handleLogout}
                    onCloseInfoTooltip
                  />
                </main>
              </ProtectedRoute>
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
