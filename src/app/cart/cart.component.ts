import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  newAddressArray: any[] = [];

  constructor(private storageService: StorageService, private appService: AppService,
     private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedItemArray2 = this.storageService.getSessionStorage('cartItem');
    this.currentUser = this.storageService.getSessionStorage('current_user').firstname;
    this.phoneNo = this.storageService.getSessionStorage('current_user').phone;

    if(this.route.snapshot.queryParamMap.has('confirmOrder')){
      this.showDeliveryAddress();
    }
    this.newAddressArray = this.storageService.getLocalStorage('address');
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

  showCart(): void {
    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'none';
    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'none';
    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'none';

    let cart = document.getElementById('cart');
    cart.style.display = 'block';

  }

  showDeliveryAddress(): void {
    let cart = document.getElementById('cart');
    cart.style.display = 'none';
    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'none';
    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'none';

    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'block';
  }

  showPayment(): void {
    let PlaceOrder = document.getElementById('PlaceOrder');
    PlaceOrder.style.display = 'none';
    let deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.style.display = 'none';
    let cart = document.getElementById('cart');
    cart.style.display = 'none';

    let showPayment = document.getElementById('Payment');
    showPayment.style.display = 'block';
  }

  showPlaceOreder(): void {
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

  showAddNewAddressModal(raja): void {
    raja.style.display = 'block';
  }
  hideAddNewAddressModal(raja): void {
    raja.style.display = 'none';
  }

  addAddress(addNewAddress: NgForm): void {
    this.newAddressArray.push(addNewAddress.value);
    this.storageService.setLocaStorage('address',this.newAddressArray);
    document.getElementById('ads').style.display = 'none';
  }
  editAddress(address): void {
    document.getElementById('ads').style.display = 'block';
  }
  deleteAddress(address): void {
    this.newAddressArray.splice(this.newAddressArray.indexOf(address),1);
    this.storageService.setLocaStorage('address', this.newAddressArray);
  }
  addressTab(): void {
    this.showDeliveryAddress();
  }
  paymentTab(): void {
    this.showPayment();
  }
}
