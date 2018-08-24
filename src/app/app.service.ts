import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    private _todo: Subject<any> = new Subject();

    public readonly todo: Observable<any> = this._todo.asObservable();

    public eventGenerate(data){
        this._todo.next(data);
    }
}