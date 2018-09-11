import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
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
  total: number = 0;
  currentUser: string;
  phoneNo: number;
  newAddressArray: any[] = [];

  constructor(private storageService: StorageService,
     private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedItemArray = this.storageService.getLocalStorage('cartItem');
    this.currentUser = this.storageService.getSessionStorage('current_user').firstname;
    this.phoneNo = this.storageService.getSessionStorage('current_user').phone;
    this.total = this.storageService.getLocalStorage('total');

    if(this.route.snapshot.queryParamMap.has('confirmOrder')){
      this.showDeliveryAddress();
    }
    this.newAddressArray = this.storageService.getLocalStorage('address');
  }

  increaseQuantity(select): void {
    this.selectedItemArray[this.selectedItemArray.indexOf(select)].quantity++;
    this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    this.total += select.price;
    this.storageService.setLocaStorage('total', this.total);
  }
  decreaseQuantity(select): void {
    this.selectedItemArray[this.selectedItemArray.indexOf(select)].quantity--;
    this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    if (select.quantity == 0) {
      this.selectedItemArray.splice(this.selectedItemArray.indexOf(select), 1);
      this.selectedItemArray = this.selectedItemArray;
      this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    }
    this.total -= select.price;
    this.storageService.setLocaStorage('total', this.total);

  }
  deleteItem(select): void {
    this.selectedItemArray.splice(this.selectedItemArray.indexOf(select), 1);
    this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    this.total -= select.quantity * select.price;
    this.storageService.setLocaStorage('total', this.total);
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
