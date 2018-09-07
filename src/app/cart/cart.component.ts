import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedItemArray: any[] = [];
  selectedItemArray2: any[] = [];
  total: number = 0;
  currentUser: string;
  phoneNo: number;

  constructor(private storageService: StorageService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.selectedItemArray2 = this.storageService.getSessionStorage('cartItem');
    this.currentUser = this.storageService.getSessionStorage('current_user').firstname;
    this.phoneNo = this.storageService.getSessionStorage('current_user').phone;
  }

  increaseQuantity(select): void {
    this.selectedItemArray2[this.selectedItemArray2.indexOf(select)].quantity++;
    this.storageService.setSessionStorage('cartItem', this.selectedItemArray2);
    this.total += select.price;
  }
  decreaseQuantity(select): void {
    this.selectedItemArray2[this.selectedItemArray2.indexOf(select)].quantity--;
    this.storageService.setSessionStorage('cartItem', this.selectedItemArray2);
    if (select.quantity == 0) {
      this.selectedItemArray2.splice(this.selectedItemArray2.indexOf(select), 1);
      this.selectedItemArray = this.selectedItemArray2;
      this.storageService.setSessionStorage('cartItem', this.selectedItemArray);
    }
    this.total -= select.price;

  }
  deleteItem(select): void {
    this.selectedItemArray2.splice(this.selectedItemArray2.indexOf(select), 1);
    this.storageService.setSessionStorage('cartItem', this.selectedItemArray);
  }

  showCart(x): void {
    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'none';
    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'none';
    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'none';

    let cart = document.getElementById('cart');
    cart.style.display = 'block';

  }

  showDeliveryAddress(x): void {
    let cart = document.getElementById('cart');
    cart.style.display = 'none';
    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'none';
    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'none';

    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'block';
  }

  showPayment(x): void {
    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'none';
    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'none';
    let cart = document.getElementById('cart');
    cart.style.display = 'none';

    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'block';
  }

  showPlaceOreder(x): void {
    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'none';
    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'none';
    let cart = document.getElementById('cart');
    cart.style.display = 'none';

    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'block';
  }

  addMoreItems(): void {
    this.router.navigate(['/menu']);
  }

}
