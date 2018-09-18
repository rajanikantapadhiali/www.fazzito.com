import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

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
  newAddressArray: any;
  noOfItem: number;

  constructor(private storageService: StorageService,
    private router: Router, private route: ActivatedRoute,
    private _appService: AppService,
    private httpClient: HttpClient,) { }

  ngOnInit() {
    this.selectedItemArray = this.storageService.getLocalStorage('cartItem');
    this.currentUser = this.storageService.getSessionStorage('current_user').firstname;
    this.phoneNo = this.storageService.getSessionStorage('current_user').phone;

    if (this.route.snapshot.queryParamMap.has('confirmOrder')) {
      this.showDeliveryAddress();
    }
    this.newAddressArray = this.storageService.getLocalStorage('address');

    this._appService.noOfItem.subscribe(data => {
      this.noOfItem = data;
    });

    this._appService.totalPrice.subscribe(data => {
      this.total = data;
    });

    this._appService.changeNoOfItem(this.storageService.getLocalStorage('cartItem').length);

    this.httpClient.get('http://localhost:3000/address').subscribe(data => {
      this.newAddressArray = data;
    });
  }

  increaseQuantity(select): void {
    this.selectedItemArray[this.selectedItemArray.indexOf(select)].quantity++;
    this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    this._appService.changeTotalPrice(this.total += select.price);
  }
  decreaseQuantity(select): void {
    this.selectedItemArray[this.selectedItemArray.indexOf(select)].quantity--;
    this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    if (select.quantity == 0) {
      this.selectedItemArray.splice(this.selectedItemArray.indexOf(select), 1);
      this.selectedItemArray = this.selectedItemArray;
      this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
      this._appService.changeNoOfItem(this.storageService.getLocalStorage('cartItem').length);
    }
    this._appService.changeTotalPrice(this.total -= select.price);

  }
  deleteItem(select): void {
    this.selectedItemArray.splice(this.selectedItemArray.indexOf(select), 1);
    this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
    this._appService.changeTotalPrice(this.total -= select.quantity * select.price);
    this._appService.changeNoOfItem(this.storageService.getLocalStorage('cartItem').length);
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
    this.httpClient.post('http://localhost:3000/address', addNewAddress.value)
      .subscribe(data => {
        console.log(data);
      })
    document.getElementById('ads').style.display = 'none';
  }
  editAddress(address): void {
    document.getElementById('ads').style.display = 'block';
  }
  deleteAddress(address): void {
   this.httpClient.delete(`${'http://localhost:3000/address'}/${address.id}`).subscribe(data => {
     console.log(data);
   });
  }
  addressTab(): void {
    this.showDeliveryAddress();
  }
  paymentTab(): void {
    this.showPayment();
  }
}
