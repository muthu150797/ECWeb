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
}
