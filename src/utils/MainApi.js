import { serverUrl } from "./config";

class MainApi {
  constructor(options) {
    this._serverUrl = options.serverUrl;
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
      .then(res => this._handleResult(res))
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
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;