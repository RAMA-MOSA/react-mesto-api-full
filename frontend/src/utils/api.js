class Api {
    constructor(options) {
      this._headers = options.headers;
      this._url = options.baseUrl;
    }; 
  
    getInitialData(token) {
      return Promise.all([this.getUserInfo(token), this.getCards(token)]);
    };
  
    _handleResponse(res){
        if(!res.ok){
            return Promise.reject(`Ошибка:${res.status}.`);
        }
        return res.json();
    };

    setUserAvatar(data, token){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._handleResponse)
    };

    changeLikeCardStatus(id, isLiked, token){
        if(isLiked){
            return this.deleteLike(id, token);
        }else{
            return this.addLike(id, token);
        }
    };

    deleteLike(id, token){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        }).then(this._handleResponse)
    };

    addLike(id, token){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        }).then(this._handleResponse)
    };

    deleteCard(id, token){
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        }).then(this._handleResponse)
    };

    postCard(data, token){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        }).then(this._handleResponse)
    };

    setUserInfo(data, token){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        }).then(this._handleResponse)
    };

    getCards(token){
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
          }).then(this._handleResponse)
    };

    getUserInfo(token){
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: { ...this._headers, Authorization: `Bearer ${token}` },
        }).then(this._handleResponse)
    };
};

const api = new Api({
    baseUrl: 'https://api.m-s.students.nomoredomains.icu',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
}); 

export default api
