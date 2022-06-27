import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { ProductService } from '../ProductService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any;
  totalCount: number;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.GetAllProducts()
  }
  GetAllProducts()
  {
    this.productService.GetAllProducts().subscribe(response => {
      console.log("All Products",response);
     this.products = response;
      //this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }
}
