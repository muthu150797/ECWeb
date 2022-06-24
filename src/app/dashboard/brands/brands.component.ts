import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Product } from '../Product';
import { ProductService } from '../ProductService';
import { IBrand } from 'src/app/shared/models/brand';

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
  brandList: IBrand;

constructor(private productService: ProductService, private messageService: MessageService) { }

ngOnInit() {
  this.GetAllBrands();
  this.users = [
    { id: '1', name: 'kiran',email:'kiran@gmail.com' },
    { id: '2', name: 'tom',email:'tom@gmail.com' },
    { id: '3', name: 'john',email:'john@gmail.com' },
    { id: '4', name: 'Frank',email:'frank@gmail.com' },

];
  this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      // { field: 'email', header: 'Email' },
  ];
    this.productService.getProductsSmall().then(data => this.products1 = data);
    this.productService.getProductsSmall().then(data => this.products2 = data);

    this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
}

onRowEditInit(brand: any) {
    this.clonedProducts[brand.id] = {...brand};
}

onRowEditSave(brand: any) {
    if (brand.id > 0) {
        delete this.clonedProducts[brand.id];
        this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    }
}

onRowEditCancel(brand: any, index: number) {
    this.brandList[index] = this.clonedProducts[brand.id];
    delete this.clonedProducts[brand.id];
}
  GetAllBrands() {
  this.productService.GetAllBrands().subscribe((brands: IBrand) =>
  {
    this.brandList=brands;
    console.log("brands",brands);
    //this.toastr.success('Address saved');
    //this.checkoutForm.get('addressForm').reset(address);
  }, error => {
    console.log(error);
  });
}
}
