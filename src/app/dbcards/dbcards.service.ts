import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DbCardsService {

    devServerPath = 'http://localhost:3000/api';
    // serverPath = 'mongodb://sanlu:#sanlu@ds141232.mlab.com:41232/dbzcards';

    // Get all cards.
    getCards() {
        return this.http.get(`${this.devServerPath}/cards`)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Delete a card by id.
    deleteCard(id) {
        return this.http.delete(`${this.devServerPath}/cards/${id}`)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Create a card.
    createCard(data) {
        return this.http.post(`${this.devServerPath}/cards`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Edit a card.
    editCard(id, data) {
        return this.http.put(`${this.devServerPath}/cards/${id}`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    constructor(private http: Http) { }
}
