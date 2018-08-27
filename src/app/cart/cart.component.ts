import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedItem: any;

  constructor(private appservice: StorageService) { }

  ngOnInit() {
    this.selectedItem = this.appservice.getSessionStorage('cartItem');
  }

}
