import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

    devServerPath = 'http://localhost:3000/api';
    // serverPath = 'mongodb://sanlu:#sanlu@ds141232.mlab.com:41232/dbzcards';

    // Get all greets.
    getGreets() {
        return this.http.get(`${this.devServerPath}/greets`)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Create a greet.
    createGreet(data) {
        return this.http.post(`${this.devServerPath}/greets`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    constructor(private http: Http) { }
}
