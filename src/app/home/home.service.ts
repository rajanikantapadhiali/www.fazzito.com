import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private _http: HttpClient){
  }
  
  getItem(){
    return this._http.get("https://fazzito.com/api/category");
  }
  
}