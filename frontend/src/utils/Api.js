class Api {
    constructor({url}) {
      this._url = url
  }

    _request(endpoint, options = {}) {
      const token = localStorage.getItem('jwt')

      return fetch(
          `${ this._url }/${endpoint}`,
          {headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                  }, ...options})
          .then(this._checkResponse)
    }
  
    _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`); 
    }
  
    getName() {
      return this._request('users/me', {
        method: 'GET'
    })
  }
  
    getCards() {
      return  this._request('cards', {
        method: 'GET'
      })
  }
  
    editProfileInfo(data) {
      return this._request('users/me',  {
        method: 'PATCH',
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
  }
  
    setNewAvatar(data) {
      return this._request('users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: data.avatar
      })
    })
  }
  
    addCard(data) {
      return this._request('cards', {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  
    addLike(cardId, like) {
      return this._request(`cards/${cardId}/likes`, {
        method: like ? 'PUT' : 'DELETE'
    })
  }
  
    deleteCard(cardId) {
      return this._request(`cards/${cardId}`, {
        method: 'DELETE'
    })
  }

    changeLikeCardStatus(cardId, like) {
      return this._request(`cards/${cardId}/likes`, {
        method: like ? 'PUT' : 'DELETE'
      })
    }
  }

  const api = new Api({
    url: 'https://api.denmyname.nomoredomainswork.ru',
  });
  
  export default api;