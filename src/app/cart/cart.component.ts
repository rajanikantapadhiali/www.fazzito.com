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
  total: number;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.selectedItem = this.storageService.getSessionStorage('cartItem');
    this.total = this.selectedItem.price;
  }

  increaseQuantity(): void {
    this.quantity++;
    this.total = this.selectedItem.price * this.quantity;
  }
  decreaseQuantity(): void {
    this.quantity--;
    if(this.quantity == 0){
    this.selectedItem = false;
    this.storageService.setSessionStorage('cartItem', null);
    }
    this.total = this.selectedItem.price * this.quantity;
  }
  deleteItem(): void {
    this.selectedItem = false;
  }

}
