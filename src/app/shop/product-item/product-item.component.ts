import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../shared/models/product';
import {BasketService} from "../../basket/basket.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  picBaseUrl: string;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.picBaseUrl=environment.picBaseUrl
  }
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }
}
