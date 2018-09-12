import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

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
    this.selectedItemArray = this.storageService.getLocalStorage('cartItem');
    if (this.selectedItemArray.length > 0) {
        this.plusminus = true;
        this.total = this.storageService.getLocalStorage('total');
    }
    else { 
      this.total = 0;
      this.storageService.setLocaStorage('total', this.total);
    }

    this._appservice.changeNoOfItem(this.storageService.getLocalStorage('cartItem').length);
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
      const isPresent = this.selectedItemArray.find( item => {
        abc = this.selectedItemArray.indexOf(item);
        return item._id === x._id;
      })
      if (isPresent) {
        this.selectedItemArray[abc].quantity++;
        this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
        this.total += x.price;
        this.storageService.setLocaStorage('total', this.total);
      }
      else {
        x.quantity = 1;
        this.selectedItemArray.push(x);
        this.storageService.setLocaStorage('cartItem', this.selectedItemArray);
        this.total += x.price;
        this.storageService.setLocaStorage('total', this.total);
        this.plusminus = true;
        this._appservice.changeNoOfItem(this.storageService.getLocalStorage('cartItem').length);
      }
    }
    else {
      this.logIn();
    }
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
      this._appservice.changeNoOfItem(this.storageService.getLocalStorage('cartItem').length);
    }
    this.total -= select.price;
    this.storageService.setLocaStorage('total', this.total);
  }

  confirmOrder(): void {
    this.router.navigate(['/cart'], {
      queryParams: { 'confirmOrder': true }
    });
  }
}
