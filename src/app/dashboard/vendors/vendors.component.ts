import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  constructor(private vendorService:VendorService) { }

  ngOnInit(): void {
    this.GetAllVendors();
  }
  GetAllVendors(){
    this.vendorService.GetAllVendors().subscribe((res)=>{
      console.log("All Vendors",res);
    })
  }

}
