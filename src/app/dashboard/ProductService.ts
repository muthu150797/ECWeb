import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { ShopService } from '../shop/shop.service';

import { Product } from './product';

@Injectable()
export class ProductService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        "Bamboo Watch",
        "Black Watch",
        "Blue Band",
        "Blue T-Shirt",
        "Bracelet",
        "Brown Purse",
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
    ];
  baseUrl=environment.apiUrl;

    constructor(private shopService:ShopService,private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/products-small.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    getProducts() {
        return this.http.get<any>('assets/products.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/products-orders-small.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    generatePrduct(): Product {
        const product: Product =  {
            id: this.generateId(),
            name: this.generateName(),
            description: "Product Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "Product Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };

        product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return product;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
    GetAllBrands() {
      return this.http.post<any>(this.baseUrl + 'products/brands',null);
    }
    AddOrUpdateBrand(brand:any) {
      return this.http.post<any>(this.baseUrl + 'products/AddOrUpdateBrands',
      {
        "Id":brand.id,
        "Name":brand.name
      });
    }
    DeleteBrand(brandId:any) {
      return this.http.get<any>(this.baseUrl + 'products/DeleteBrand?id='+brandId);
    }

    GetAllProductTypes()
    {
      return this.http.post<any>(this.baseUrl + 'products/Types',null);
    }
    AddOrUpdateProductType(type:any) {
      return this.http.post<any>(this.baseUrl + 'products/AddOrUpdateProductType',
      {
        "Id":type.id,
        "Name":type.name
      });
    }
    DeleteProductType(typeId:any) {
      return this.http.get<any>(this.baseUrl + 'products/DeleteProductType?id='+typeId);
    }
    GetAllDeliveryMethods()
    {
      return this.http.get(this.baseUrl + 'orders/getDeliveryMethods');
    }
    AddOrUpdateDeliveryMethod(delMethod:any) {
      return this.http.post<any>(this.baseUrl + 'products/AddOrUpdateDeliveryMethod',delMethod);
    }
    DeleteDeliveryMethod(typeId:any) {
      return this.http.get<any>(this.baseUrl + 'products/DeleteDeliveryMethod?id='+typeId);
    }
    GetAllProducts()
    {
      return this.http.post(this.baseUrl + 'products/getProducts',null);
    }
    DeleteProduct(productId:any) {
      return this.http.get<any>(this.baseUrl + 'products/deleteProduct?id='+productId);
    }
    upload(formdata:any) {
      return this.http.post<any>(this.baseUrl + 'products/upload',formdata);
    }
    AddOrUpdateProduct(product:any) {
      return this.http.post<any>(this.baseUrl + 'products/AddOrUpdateProduct',[
        {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "pictureUrl": product.pictureUrl,
          "description": product.description,
          "productTypeId": product.productTypeId,
          "productBrandId": product.productBrandId
        }
      ]);
    }
}
