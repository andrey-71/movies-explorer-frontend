import { serverUrl } from "./config";

class MoviesApi {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._headers = options.headers;
  }

  // Получение фильмов
  getMovies() {
    return fetch(this._serverUrl, {
      headers: this._headers
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

const moviesApi = new MoviesApi({
  serverUrl: serverUrl.movies,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;