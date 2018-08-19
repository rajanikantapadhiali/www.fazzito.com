import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private homeservice: HomeService, private activatedRoute: ActivatedRoute) {
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

  showProducts(category): void {
    this.productData = category.products;
  }

  selectedItem(x): void {
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
