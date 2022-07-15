import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  first = 0;
  rows = 10;
  representatives: any[];
  clonedProducts: { [s: string]: any } = {};
  loading: boolean = true;
  contentId: any;
  display = false;
  contentName = '';
  header: string;
  popup: boolean;
  activityValues: number[] = [0, 100];
  cols: { field: string; header: string }[];
  vendorList: any;
  id = 0;
  response: any;
  vendor: any;
  vendorForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'accountNumber', header: 'Account Number' },
    ];
    this.GetAllVendors();
    this.initializeForm();
  }
  get f() {
    return this.vendorForm.controls;
  }
  private initializeForm() {
    if (!this.vendorForm) {
      this.vendorForm = this.buildForm();
    }
  }
  buildForm(): FormGroup {
    const group = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required,Validators.min(10)]],
    });

    return group;
  }
  onInputKeyPress(){
  console.log(this.vendorForm);
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
    return this.vendorList
      ? this.first === this.vendorList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.vendorList ? this.first === 0 : true;
  }
  onRowEditInit(vendorList: any) {
    this.clonedProducts[vendorList.id] = { ...vendorList };
  }

  onRowEditSave(vendorList: any) {
    // if (deliveryMethod.id > 0) {
    //   delete this.clonedProducts[deliveryMethod.id];
    //   this.productService.AddOrUpdateDeliveryMethod(deliveryMethod).subscribe(
    //     (res: ResponseModel) => {
    //       console.log('response from updating type', res);
    //       if (res.statusCode == 200) {
    //         this.toastr.success(res.message);
    //         this.GetAllDeliveryMethods();
    //       } else {
    //         this.toastr.error(res.message);
    //       }
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // } else {
    //   this.toastr.error("Not Found");
    // }
  }
  onRowEditCancel(brand: any, index: number) {
    this.vendorList[index] = this.clonedProducts[brand.id];
    delete this.clonedProducts[brand.id];
  }
  showDialog2() {
    this.popup = true;
    this.header = 'Add';
    this.vendor = {
      name: 'dfd',
      email: 'dfs',
      mobile: 'sdfdsf',
    };
  }
  AddDeliveryMethod() {}
  GetAllVendors() {
    this.vendorService.GetAllVendors().subscribe((res) => {
      this.vendorList = res;
      console.log('All Vendors', res);
    });
  }
}
