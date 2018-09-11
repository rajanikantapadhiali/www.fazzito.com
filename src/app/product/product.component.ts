import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

interface Product {
  categoryName: string,
  image: any,
  products: any,
  _id: string
}

interface Response {
  code: number,
  data: any,
  message: string
}

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {
  categoryData: Array<Product>;
  productData: any;
  id: number;
  select: object;
  total: number = 0;
  plusminus: boolean = false;
  selectedItemArray: any[] = [];
  selectedItemArray2: any[] = [];

  constructor(private homeservice: HomeService, private activatedRoute: ActivatedRoute,
    private _appservice: AppService, private storageService: StorageService,
    private router: Router) {
    this.id = this.activatedRoute.snapshot.params['_id'];
    this.productData = this.activatedRoute.snapshot.data['ram'];
  }

  ngOnInit() {
    this.homeservice.getItem()
      .subscribe((res: Response) => {
        this.categoryData = res.data;
        this.categoryData.map((item: any) => {
          if (item._id === this.id) {
            this.productData = item.products;
          };
        })
      });
    this.selectedItemArray2 = this.storageService.getSessionStorage('cartItem');
    if (this.selectedItemArray2.length > 0) {
        this.plusminus = true;
        this.total = this.storageService.getSessionStorage('total');
    }
    else { 
      this.total = 0;
      this.storageService.setSessionStorage('total', this.total);
    }
  }
  logIn() {
    this._appservice.eventGenerate(null);
  }

  showProducts(category): void {
    this.productData = category.products;
  }

  selectedItem(x): void {
    let abc: number;
    if (this._appservice.isAuthenticated()) {
      const isPresent = this.selectedItemArray2.find(item => {
        abc = this.selectedItemArray2.indexOf(item);
        return item._id === x._id;
      });
      if (isPresent) {
        this.selectedItemArray2[abc].quantity++;
        this.storageService.setSessionStorage('cartItem', this.selectedItemArray2);
        this.total += x.price;
        this.storageService.setSessionStorage('total', this.total);
      }
      else {
        x.quantity = 1;
        this.selectedItemArray.push(x);
        this.storageService.setSessionStorage('cartItem', this.selectedItemArray);
        this.selectedItemArray2 = this.storageService.getSessionStorage('cartItem');
        this.total += x.price;
        this.storageService.setSessionStorage('total', this.total);
        this.plusminus = true;
      }
    }
    else {
      this.logIn();
    }
  }

  increaseQuantity(select): void {
    this.selectedItemArray2[this.selectedItemArray2.indexOf(select)].quantity++;
    this.storageService.setSessionStorage('cartItem', this.selectedItemArray2);
    this.total += select.price;
    this.storageService.setSessionStorage('total', this.total);
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
    this.storageService.setSessionStorage('total', this.total);
  }

  confirmOrder(): void {
    this.router.navigate(['/cart'], {
      queryParams: { 'confirmOrder': true }
    });
  }
}
