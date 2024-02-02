class Api {
    constructor (options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
      this._authorization = options.headers.authorization;
    }
  
    _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`); 
    }
  
    getName() {
      return fetch(`${this._url}/users/me`, {
         headers: {
          authorization: this._authorization
         }
      })
      .then(this._checkResponse)
    }
  
    getCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization
         }
      })
      .then(this._checkResponse)
    }
  
    editProfileInfo(data) {
      return fetch(`${this._url}/users/me`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({
            name: data.name,
            about: data.info,
          })
        })
    .then(this._checkResponse)
    }
  
    setNewAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
    .then(this._checkResponse)
    }
  
    addCard(data) {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ 
          name: data.placename,
          link: data.link })
      })
      .then(this._checkResponse)
    }
  
    addLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
        }
      })
      .then(this._checkResponse)
    }
  
    removeLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
        }
      })
      .then(this._checkResponse)
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
        }
      })
      .then(this._checkResponse)
    }
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse)
    }
  }

  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
      authorization: '35b6e574-0c40-4e25-8a93-de8f952c7688',
      'Content-Type': 'application/json'
    }
  });
  
  export default api