import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/Model/ResponseModel';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { City } from '../City';
import { ProductService } from '../ProductService';
import {InputTextareaModule} from 'primeng/inputtextarea';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product:any;
  totalCount: number;
  first = 0;
  rows = 10;
  clonedProducts: { [s: string]: IProduct } = {};
  loading: boolean = true;
  productList: any;
  cols: { field: string; header: string; }[];
  contentId: any;
  display=false;
  contentName='';
  header: string;
  cities: City[];
  selectedCity2: City;
  popup: boolean;
  productDialog: boolean;
  constructor(private toastr:ToastrService,private productService:ProductService) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
   }

  ngOnInit(): void {
    this.GetAllProducts();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: 'productBrand', header: 'Product Brand' },
      { field: 'productType', header: 'Product Type' },

      // { field: 'email', header: 'Email' },
    ];
  }

  onRowEditInit(product: any) {
    this.clonedProducts[product.id] = { ...product };
  }
  onRowEditSave(product: any) {
    console.log('prod',product)
    if (product.id > 0) {
      delete this.clonedProducts[product.id];
      this.productService.AddOrUpdateProductType(product).subscribe(
        (res: ResponseModel) => {
          console.log('response from updating product', res);
          if (res.statusCode == 200) {
            this.toastr.success(res.message);
            this.GetAllProducts();
          } else {
            this.toastr.error(res.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastr.error("Not Found");
    }
  }
  onRowEditCancel(product: any, index: number) {
    this.productList[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.productList
      ? this.first === this.productList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.productList ? this.first === 0 : true;
  }
  GetAllProducts()
  {
    this.productService.GetAllProducts().subscribe(response => {
      console.log("All Products",response);
     this.productList = response;
      //this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }
  showDialog1(content){
    this.display=true;
    this.header='Delete Product';
    this.contentName="Are you sure want to delete the "+content.name+"?";
    this.contentId=content.id;
  }
  AddProduct(){
    let prod=[{name:'',description:'',price:0,}];
    this.product=prod;
    this.productDialog=true;

  }
   saveProduct(){
   console.log("adding product",this.product);
   this.productDialog=false;
  }
  hideDialog(){

  }
  DeleteProduct(productId){
    this.productService.DeleteProduct(productId).subscribe(
      (res: any) => {
        console.log('response from deleting product', res);
        if (res.statusCode == 200) {
          this.toastr.success(res.message);
          this.GetAllProducts();
        } else {
          this.GetAllProducts();
          this.toastr.error(res.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.contentName='';
    this.contentId=0;
    this.header='';
    this.display=false;
  }

}
