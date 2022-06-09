import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import UnprotectedRoute from '../../UnprotectedRoute/UnprotectedRoute';
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
import InfoTooltipPopup from '../InfoTooltipPopup/InfoTooltipPopup';

function App() {
  const navigate = useNavigate();
  // Состояние авторизации
  const [isLogged, setIsLogged] = useState(false);
  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Информационный попап
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({});
  // Ошибка регистрации/авторизации
  const [isAuthError, setIsAuthError] = useState({});

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
      .catch(err => {
        handleAuthError(err, 'При регистрации произошла ошибка');
        setTimeout(handleResetAuthError, 3000);
      })
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
      .catch(err => {
        handleAuthError(err, 'При авторизации произошла ошибка');
        setTimeout(handleResetAuthError, 3000);
      })
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
      .catch(err => handleOtherError(err, 'При выходе из учетной записи произошла ошибка'))
  }

  // Получение данных пользователя по id
  function handleGetUserData(id) {
    mainApi.getUserData(id)
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => handleOtherError(err, 'При загрузке данных пользователя произошла ошибка'))
  }

  // Обновление данных пользователя
  function handleUpdateUserData(data) {
    mainApi.updateUserData(data)
      .then(res => {
        setCurrentUser(res);
        handleOtherError('Данные успешно обновлены', '', true);
        setTimeout(closeInfoTooltip, 2000);
      })
      .catch(err => handleOtherError(err, 'При обновлении данных пользователя произошла ошибка'))
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

  // Функция обработки ошибок регистрации/авторизации
  function handleAuthError(err, errMessage) {
    setIsAuthError({
      title: err,
      message: errMessage
    });
  }
  // Сброс ошибки регистрации/авторизации
    function handleResetAuthError() {
      setIsAuthError({});
    }

  // Функция обработки прочих ошибок
  function handleOtherError(err, errMessage, requestResult) {
    setIsInfoTooltip(true);
    setInfoTooltipData({
      state: requestResult,
      title: err,
      message: errMessage
    });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>

          {/*О проекте*/}
          <Route path='/' element={
            <>
              <InfoTooltipPopup
                infoTooltip={{
                  isOpen: isInfoTooltip,
                  state: infoTooltipData.state,
                  title: infoTooltipData.title,
                  message: infoTooltipData.message,
                  onClose: closeInfoTooltip,
                  onCloseOverlay: closeInfoTooltipOverlayClick
                }}
              />
              <Header isLogged={isLogged} />
              <main className='content page__content'>
                <Main />
              </main>
              <Footer />
            </>
          } />

          {/*Регистрация*/}
          <Route path='/signup' element={
            <UnprotectedRoute isLogin={isLogged}>
              <main className='content page__content'>
                <Register
                  isError={isAuthError}
                  onRegister={handleRegister}
                />
              </main>
            </UnprotectedRoute>
          } />

          {/*Авторизация*/}
          <Route path='/signin' element={
            <UnprotectedRoute isLogin={isLogged}>
              <main className='content page__content'>
                <Login
                  isError={isAuthError}
                  onLogin={handleLogin}
                />
              </main>
            </UnprotectedRoute>
          } />

            {/*Фильмы*/}
            <Route path='/movies' element={
              <ProtectedRoute isLogin={isLogged}>
                <Header isLogged={isLogged} />
                <main className='content page__content'>
                  <Movies
                    infoTooltip={{
                      isOpen: isInfoTooltip,
                      state: infoTooltipData.state,
                      title: infoTooltipData.title,
                      message: infoTooltipData.message,
                      onError: handleOtherError,
                      onClose: closeInfoTooltip,
                      onCloseOverlay: closeInfoTooltipOverlayClick
                    }}
                  />
                </main>
                <Footer />
              </ProtectedRoute>
            } />

            {/*Сохраненные фильмы*/}
            <Route path='/saved-movies' element={
              <ProtectedRoute isLogin={isLogged}>
                <Header isLogged={isLogged} />
                <main className='content page__content'>
                  <SavedMovies
                    infoTooltip={{
                      isOpen: isInfoTooltip,
                      state: infoTooltipData.state,
                      title: infoTooltipData.title,
                      message: infoTooltipData.message,
                      onError: handleOtherError,
                      onClose: closeInfoTooltip,
                      onCloseOverlay: closeInfoTooltipOverlayClick
                    }}
                  />
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
