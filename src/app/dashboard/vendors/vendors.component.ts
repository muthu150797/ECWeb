import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
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
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.min(10)]],
      accountNumber: ['', [Validators.required]],
      ifsc: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      state: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });

    return group;
  }
  onInputKeyPress() {
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
    // this.clonedProducts[vendorList.id] = { ...vendorList };
    console.log('editing vendor', vendorList);
    this.vendorForm.patchValue({
      id: vendorList.id,
      name: vendorList.name,
      email: vendorList.email,
      mobile: vendorList.mobile,
      accountNumber: vendorList.accountNumber,
      ifsc: vendorList.ifsc,
      branch: vendorList.branch,
      firstName: vendorList.vendorAddress.firstName,
      lastName: vendorList.vendorAddress.lastName,
      state: vendorList.vendorAddress.state,
      street: vendorList.vendorAddress.street,
      city: vendorList.vendorAddress.city,
      zipCode: vendorList.vendorAddress.zipCode,
    });
    this.popup = true;
  }
  SaveVendor() {
    this.vendorService.AddOrUpdateVendor(this.vendorForm).subscribe((res) => {
      this.response = res;
      console.log('add or vendor', res);
      if (this.response.statusCode == 200) {
        this.GetAllVendors();
        this.toastr.success(this.response.message);
      }
       else this.toastr.error(this.response.message);
    });
    this.popup = false;
  }

  showDialog2() {
    this.vendorForm.reset();
    this.vendorForm.patchValue({ id: 0 });
    this.popup = true;
    //this.vendorForm=null;
    this.header = 'Add';
    // this.vendor = {
    //   name: 'dfd',
    //   email: 'dfs',
    //   mobile: 'sdfdsf',
    // };
  }
  AddDeliveryMethod() {}
  GetAllVendors() {
    this.vendorService.GetAllVendors().subscribe((res) => {
      this.vendorList = res;
      console.log('All Vendors', res);
    });
  }
}
