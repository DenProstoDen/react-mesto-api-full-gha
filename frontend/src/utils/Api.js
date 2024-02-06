class Api {
  constructor (options) {
    this._url = options.baseUrl;
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
    return this._request('cards', {
      method: 'GET'
  })
}

  editProfileInfo(data) {
    return this._request('users/me',  {
      method: 'PATCH',
      body: JSON.stringify({
          name: data.name,
          about: data.info
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
      body: JSON.stringify({ 
        name: data.placename,
        link: data.link })
    })
  }

  // addLike(cardId) {
  //   return this._request(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._authorization,
  //     }
  //   })
  //   .then(this._checkResponse)
  // }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE'
  })
}
// removeLike(cardId) {
//   return this._request(`${this._url}/cards/${cardId}/likes`, {
//     method: 'DELETE',
//     headers: {
//       authorization: this._authorization,
//     }
//   })
//   .then(this._checkResponse)
// }

changeLikeCardStatus(cardId, Isliked) {
  return this._request(`cards/${cardId}/likes`, {
    method: Isliked ? 'PUT' : 'DELETE' 
  })
}
}

const api = new Api({
  baseUrl: 'https://api.denmyname.nomoredomainswork.ru',
});

export default api