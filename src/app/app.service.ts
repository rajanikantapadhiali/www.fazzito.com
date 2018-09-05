import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()

export class AppService {
    constructor(private storageService: StorageService) { }
    private _todo: Subject<any> = new Subject();

    public readonly todo: Observable<any> = this._todo.asObservable();

    public eventGenerate(data) {
        this._todo.next(data);
    }

    public isAuthenticated() {
        if (this.storageService.getSessionStorage('current_user')) {
            return true
        } else {
            return false;
        }
    }
}