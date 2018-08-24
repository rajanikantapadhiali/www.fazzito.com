import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

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
    private _appservice: AppService) {
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

  callme() {
    this._appservice.eventGenerate('clicked');
  }

  showProducts(category): void {
    this.productData = category.products;
  }

  selectedItem(x): void {
    this.callme();
     this.select = x;
     this.plusminus = true;
  }

  increaseQuantity(): void {
    this.quantity++;
  }
  decreaseQuantity(): void {
    this.quantity--;
  }
}
