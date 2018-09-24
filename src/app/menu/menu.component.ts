import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  data: Object;

  constructor(private homeservice: HomeService, private activatedRoute: ActivatedRoute) {
   }
   
  ngOnInit() {
    this.data = this.activatedRoute.snapshot.data['ram'];
  }

}
