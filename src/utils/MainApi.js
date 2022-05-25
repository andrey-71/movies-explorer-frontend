import { serverUrl } from "./config";

class MainApi {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._headers = options.headers;
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