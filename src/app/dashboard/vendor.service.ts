import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  baseUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }
  GetAllVendors(){
    return this.http.post(this.baseUrl + 'vendor/getAllVendors',null);
  }
  AddOrUpdateVendor(vendorFrom:any){
    return this.http.post(this.baseUrl+'vendor/addOrUpdateVendor',
      {
        "id": Number(vendorFrom.value.id),
        "name": vendorFrom.value.name,
        "email": vendorFrom.value.email,
        "accountNumber": vendorFrom.value.accountNumber,
        "ifsc": vendorFrom.value.ifsc,
        "branch": vendorFrom.value.branch,
        "mobile": vendorFrom.value.mobile,
        "vendorAddress": {
          "id": 0,
          "firstName": vendorFrom.value.firstName,
          "lastName": vendorFrom.value.lastName,
          "street": vendorFrom.value.street,
          "state": vendorFrom.value.state,
          "city": vendorFrom.value.city,
          "zipCode": vendorFrom.value.zipCode,
          "vendorId": 0
        }
      });
  }
}
