import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Product } from '../Product';
import { ProductService } from '../ProductService';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  providers: [MessageService],
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {



  users: User[];

  cols: any[];
products1: Product[];

products2: Product[];

statuses: SelectItem[];

clonedProducts: { [s: string]: Product; } = {};

constructor(private productService: ProductService, private messageService: MessageService) { }

ngOnInit() {
  this.users = [
    { id: '1', name: 'kiran',email:'kiran@gmail.com' },
    { id: '2', name: 'tom',email:'tom@gmail.com' },
    { id: '3', name: 'john',email:'john@gmail.com' },
    { id: '4', name: 'Frank',email:'frank@gmail.com' },

];
  this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
  ];
    this.productService.getProductsSmall().then(data => this.products1 = data);
    this.productService.getProductsSmall().then(data => this.products2 = data);

    this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
}

onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = {...product};
}

onRowEditSave(product: Product) {
    if (product.price > 0) {
        delete this.clonedProducts[product.id];
        this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    }
}

onRowEditCancel(product: Product, index: number) {
    this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
}
}
