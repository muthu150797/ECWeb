import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Product } from '../Product';
import { ProductService } from '../ProductService';
import { IBrand } from 'src/app/shared/models/brand';
import { ResponseModel } from 'src/app/Model/ResponseModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  providers: [MessageService],
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  first = 0;

  rows = 10;
  users: User[];

  cols: any[];
  products1: Product[];

  products2: Product[];

  statuses: SelectItem[];
  contentId: any;
  popup=false;
  display=false;
  brandName='';
  contentName='';
  header: string;
  clonedProducts: { [s: string]: IBrand } = {};
  brandList: any;
  customers: any;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.GetAllBrands();
    this.users = [
      { id: '1', name: 'kiran', email: 'kiran@gmail.com' },
      { id: '2', name: 'tom', email: 'tom@gmail.com' },
      { id: '3', name: 'john', email: 'john@gmail.com' },
      { id: '4', name: 'Frank', email: 'frank@gmail.com' },
    ];
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      // { field: 'email', header: 'Email' },
    ];
    this.productService
      .getProductsSmall()
      .then((data) => (this.products1 = data));
    this.productService
      .getProductsSmall()
      .then((data) => (this.products2 = data));

    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];
  }

  onRowEditInit(brand: any) {
    this.clonedProducts[brand.id] = { ...brand };
  }

  onRowEditSave(brand: any) {
    if (brand.id > 0) {
      delete this.clonedProducts[brand.id];
      this.productService.AddOrUpdateBrand(brand).subscribe(
        (res: ResponseModel) => {
          console.log('response from updating brand', res);
          if (res.statusCode == 200) {
            this.toastr.success(res.message);
            this.GetAllBrands();
          } else {
            this.toastr.error(res.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Price',
      });
    }
  }

  onRowEditCancel(brand: any, index: number) {
    this.brandList[index] = this.clonedProducts[brand.id];
    delete this.clonedProducts[brand.id];
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
    return this.brandList
      ? this.first === this.brandList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.brandList ? this.first === 0 : true;
  }
  showDialog1(content){
    this.display=true;
    this.header='Delete Brand';
    this.contentName="Are you sure want to delete the "+content.name;
    this.contentId=content.id;
  }
  GetAllBrands() {
    this.productService.GetAllBrands().subscribe(
      (brands: IBrand) => {
        this.brandList = brands;
        console.log('brands', brands);
        //this.toastr.success('Address saved');
        //this.checkoutForm.get('addressForm').reset(address);
      },
      (error) => {
        console.log(error);
      }
    );

  }
  DeleteBrand(brandId:any){
    this.productService.DeleteBrand(brandId).subscribe(
      (res: any) => {
        console.log('response from deleting brand', res);
        if (res.statusCode == 200) {
          this.toastr.success(res.message);
          this.GetAllBrands();
        } else {
          this.GetAllBrands();
          this.toastr.error(res.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.header='';
    this.contentName='';
    this.contentId=0;
    this.display=false;
  }
  showDialog2(){
    this.popup=true;
    this.header='Add Brand';
  }
  AddBrand() {
    let brand = {
      id: 0,
      name: this.brandName,
    };
    this.productService.AddOrUpdateBrand(brand).subscribe(
      (res: ResponseModel) => {
        console.log('response from adding brand', res);
        if (res.statusCode == 200) {
          this.toastr.success(res.message);
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: 'brand is added',
          // });
          this.GetAllBrands();
        } else {
          this.toastr.error(res.message);
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: res.message
          // });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.header='';
    this.brandName='';
    this.popup=false;
  }

}
