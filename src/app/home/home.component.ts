import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = [];
  select: object;
  toggle: boolean = false;
  toggle2: boolean = true;

  constructor(private _homeservice: HomeService) { }

  ngOnInit() {
    this._homeservice.getItem()
      .subscribe((data: any) => {
        data.data.forEach(item => {
          item.products.forEach(product => {
            if (product.isVisibleOnHome) {
              this.data.push(product);    
            }
          })
        })
      });
  }
  selectedItem(x): void {
    this.select = x.productName;
    console.log('this.select: ', this.select);
    this.toggle = true;
    this.toggle2 = false;
  }

}
