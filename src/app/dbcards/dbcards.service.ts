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

    constructor(private http: Http) { }
}
