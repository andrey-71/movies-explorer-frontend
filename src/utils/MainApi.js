import { serverUrl } from "./config";

class MainApi {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._imageUrrl = options.imageUrl;
    this._headers = options.headers;
  }

  // Регистрация пользователя
  register(data) {
    return fetch(`${this._serverUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._handleResult(res))
  }

  // Авторизация пользователя
  login(data) {
    return fetch(`${this._serverUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._handleResult(res))
  }

  // Выход из учетной записи
  logout() {
    return fetch(`${this._serverUrl}/users/signout`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return;
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
  }

  // Запрос данных пользователя
  getUserData(id) {
    return fetch(`${this._serverUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${id}`
      }
    })
      .then(res => this._handleResult(res));
  }

  // Обновление данных пользователя
  updateUserDara(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(res => this._handleResult(res));
  }

  // Запрос сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this._serverUrl}/movies/`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._handleResult(res));
  }

  // Сохранение фильмов
  addSavedMovies(data, user) {
    return fetch(`${this._serverUrl}/movies/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`
      },
      body: JSON.stringify({
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        director: data.director,
        country: data.country,
        year: data.year,
        duration: data.duration,
        description: data.description,
        trailerLink: data.trailerLink,
        image: this._imageUrrl + data.image.url,
        thumbnail: this._imageUrrl + data.image.formats.thumbnail.url,
        // owner: user._id,
      })
    })
      .then(res => this._handleResult(res));
  }




  // Обработчик запроса
  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status} ${res.statusText}`);
  }
}

const mainApi = new MainApi({
  serverUrl: serverUrl.main,
  imageUrl: serverUrl.imageMovies,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;