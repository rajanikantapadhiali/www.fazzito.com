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
  quantity: number = 1;
  plusminus: boolean = false;

  constructor(private homeservice: HomeService, private activatedRoute: ActivatedRoute,
    private _appservice: AppService, private storageService: StorageService) {
    this.id = this.activatedRoute.snapshot.params['_id'];
  }

  ngOnInit() {
    this.homeservice.getItem()
      .subscribe((res: Response) => {
        this.categoryData = res.data;
        this.categoryData.map((item: any) => {
          if (item._id === this.id) {
            this.productData = item.products
          };
        })
      });
  }
  demo() {
    this._appservice.eventGenerate(null);
  }

  showProducts(category): void {
    this.productData = category.products;
  }

  selectedItem(x): void {
    if (this._appservice.isAuthenticated()) {
      this.select = x;
      this.plusminus = true;
      this.storageService.setSessionStorage('cartItem', x);
    } else {
      this.demo();
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }
  decreaseQuantity(): void {
    this.quantity--;
  }
}
