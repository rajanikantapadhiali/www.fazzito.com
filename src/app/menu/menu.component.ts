import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  data: Object;

  constructor(private homeservice: HomeService) {
   }
   
  ngOnInit() {
    this.homeservice.getItem()
    .subscribe(data => {
      this.data = data;
    });
  }

}
