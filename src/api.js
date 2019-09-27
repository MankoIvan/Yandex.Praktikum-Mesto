export default class Api {
    constructor({baseUrl, headers}) {
        this.url = baseUrl;
        this.token = headers.authorization;
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: this.token
            }
        })            
            .then(res => this.checkStatus(res))                      
    }  
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
            .then(res => this.checkStatus(res)) 
    }
    changeUserInfo(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => this.checkStatus(res)) 
    }
    addCard(name, link) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link 
            })
        })
            .then(res => this.checkStatus(res)) 
    }
    checkStatus(res) {
        if(res.ok) {
            return Promise.resolve(res.json());
        }
        return Promise.reject(res.status);
    } 


}
