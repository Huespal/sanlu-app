import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DbCardsService {

    // Get all cards.
    getCards() {
        return this.http.get('/api/cards')
            .toPromise()
            .then(response => response.json().data)
            .catch((error) => Promise.reject(error.message || error));
    }

    constructor(private http: Http) { }
}
