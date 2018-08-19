import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productData: any;

  constructor(private homeservice: HomeService) { }

  ngOnInit() {
    this.homeservice.getItem()
      .subscribe((res: any) => {
        this.productData = res.data;
      })
}

}
