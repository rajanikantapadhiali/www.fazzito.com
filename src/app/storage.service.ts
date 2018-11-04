import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {

    }

    public setSessionStorage(key: string, value: any) {
        value = JSON.stringify(value);
        sessionStorage.setItem(key, value);
    }

    public getSessionStorage(key: string) {
        if (sessionStorage.getItem(key)) {
            return JSON.parse(sessionStorage.getItem(key));
        } else {
            return null;
        }
    }

    public setLocalStorage(key: string, value: any) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    }

    public getLocalStorage(key: string) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return [];
        }
    }
}