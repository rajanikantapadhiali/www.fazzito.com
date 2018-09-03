import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedItemArray: any[] = [];
  total: number;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.selectedItemArray = this.storageService.getSessionStorage('cartItem');
    this.total = this.selectedItemArray[0].price;
  }

  increaseQuantity(): void {
  }
  decreaseQuantity(): void {
   
  }
  deleteItem(): void {
  }

}
