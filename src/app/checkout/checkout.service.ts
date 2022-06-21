import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IDeliveryMethod} from '../shared/models/deliveryMethod';
import {map} from 'rxjs/operators';
import {IOrderToCreate} from "../shared/models/order";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders/createOrder', order);
  }
  getDeliveryMethods () {
    return this.http.get(this.baseUrl + 'orders/getDeliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
