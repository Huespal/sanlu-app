import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DbCardsService {

    devServerPath = 'http://localhost:3000/api';
    // serverPath = 'mongodb://sanlu:#sanlu@ds141232.mlab.com:41232/dbzcards';

    // Get all characters.
    getCharacters() {
        return this.http.get(`${this.devServerPath}/characters`)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Delete a character by id.
    deleteCharacter(id) {
        return this.http.delete(`${this.devServerPath}/characters/${id}`)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Create a character.
    createCharacter(data) {
        return this.http.post(`${this.devServerPath}/characters`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Edit a character.
    editCharacter(id, data) {
        return this.http.put(`${this.devServerPath}/characters/${id}`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Get all skills.
    getSkills() {
        return this.http.get(`${this.devServerPath}/skills`)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Create an skills.
    createSkill(data) {
        return this.http.post(`${this.devServerPath}/skills`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    // Edit an skill.
    editSkill(id, data) {
        return this.http.put(`${this.devServerPath}/skills/${id}`, data)
            .toPromise()
            .then(response => {return response.json(); })
            .catch((error) => Promise.reject(error.message || error));
    }

    constructor(private http: Http) { }
}
