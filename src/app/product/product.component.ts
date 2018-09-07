import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { StorageService } from '../storage.service';

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
    private _appservice: AppService, private storageService: StorageService) {
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
  }
  logIn() {
    this._appservice.eventGenerate(null);
  }

  showProducts(category): void {
    this.productData = category.products;
  }

  selectedItem(x): void {
    let isPresent: boolean;
    if (this._appservice.isAuthenticated()) {
      this.selectedItemArray2.forEach(element => {
        if (element._id == x._id) {
          isPresent = true;
        } else { isPresent = false; }
      });
      if (isPresent) {
        this.selectedItemArray2[this.selectedItemArray2.indexOf(x)].quantity++;
        this.storageService.setSessionStorage('cartItem', this.selectedItemArray2);
        this.total += x.price;
      }
      else {
        x.quantity = 1;
        this.selectedItemArray.push(x);
        this.storageService.setSessionStorage('cartItem', this.selectedItemArray);
        this.selectedItemArray2 = this.storageService.getSessionStorage('cartItem');
        this.total += x.price;
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
}
