import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { IProductType } from 'src/app/Model/Brands';
import { ResponseModel } from 'src/app/Model/ResponseModel';
import { IProduct } from 'src/app/shared/models/product';
import { Customer, Representative } from '../customer';
import { CustomerService } from '../customerService';
import { ProductService } from '../ProductService';
@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss'],
})
export class ProductTypesComponent implements OnInit {
  customers: Customer[];
  first = 0;

  rows = 10;
  representatives: Representative[];
  clonedProducts: { [s: string]: IProductType } = {};

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  cols: { field: string; header: string; }[];
  productTypeList: any;
  contentId: any;
  display=false;
  contentName='';
  header: string;
  popup: boolean;
  productTypeName: string;
  constructor(private productService:ProductService,private toastr: ToastrService,private customerService: CustomerService) {}
  ngOnInit() {
    this.GetAllProductTypes();
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;
      this.customers.forEach(
        (customer) => (customer.date = new Date(customer.date))
      );
    });
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      // { field: 'email', header: 'Email' },
    ];
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];
    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];
    console.log('table', this.customers);
  }

  clear(table: any) {
    table.clear();
  }
  onRowEditInit(brand: any) {
    this.clonedProducts[brand.id] = { ...brand };
  }

  onRowEditSave(type: any) {
    if (type.id > 0) {
      delete this.clonedProducts[type.id];
      this.productService.AddOrUpdateProductType(type).subscribe(
        (res: ResponseModel) => {
          console.log('response from updating type', res);
          if (res.statusCode == 200) {
            this.toastr.success(res.message);
            this.GetAllProductTypes();
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

  onRowEditCancel(brand: any, index: number) {
    this.productTypeList[index] = this.clonedProducts[brand.id];
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
    return this.productTypeList
      ? this.first === this.productTypeList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.productTypeList ? this.first === 0 : true;
  }
  GetAllProductTypes()
  {
     this.productService.GetAllProductTypes().subscribe((res:IProductType)=>{
      this.productTypeList=res;
      console.log("res from product types",res)
     })
  }
  AddProductType() {
    let type = {
      id: 0,
      name: this.productTypeName,
    };
    this.productService.AddOrUpdateProductType(type).subscribe(
      (res: ResponseModel) => {
        console.log('response from adding type', res);
        if (res.statusCode == 200) {
          this.toastr.success(res.message);
          this.GetAllProductTypes();
        } else {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.header='';
    this.productTypeName='';
    this.popup=false;
  }
  showDialog2(){
    this.popup=true;
    this.header='Add Product Type';
  }
  showDialog1(content){
    this.display=true;
    this.header='Delete Product Type';
    this.contentName="Are you sure want to delete the "+content.name+"?";
    this.contentId=content.id;
  }
  DeleteProductType(typeId:any){
    this.productService.DeleteProductType(typeId).subscribe(
      (res: any) => {
        console.log('response from deleting product type', res);
        if (res.statusCode == 200) {
          this.toastr.success(res.message);
          this.GetAllProductTypes();
        } else {
          this.GetAllProductTypes();
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
