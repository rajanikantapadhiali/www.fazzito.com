import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedItem: any;
  quantity: number = 1;

  constructor(private appservice: StorageService) { }

  ngOnInit() {
    this.selectedItem = this.appservice.getSessionStorage('cartItem');
  }

  increaseQuantity(): void {
    this.quantity++;
  }
  decreaseQuantity(): void {
    this.quantity--;
  }
  deleteItem(): void {
    this.selectedItem = false;
  }

}
