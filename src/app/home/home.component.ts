import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: object;
  select: object;
  toggle: boolean=false;
  toggle2: boolean=true;

  constructor(private _homeservice: HomeService) { }

  ngOnInit() {
    this._homeservice.getItem()
      .subscribe(data => {
        this.data = data;
      });
  }
  selectedItem(x): void {
      this.select = x;
      this.toggle=true;
      this.toggle2=false;
  }

}
