import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/Model/ResponseModel';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { Representative } from '../customer';
import { ProductService } from '../ProductService';

@Component({
  selector: 'app-delivery-methods',
  templateUrl: './delivery-methods.component.html',
  styleUrls: ['./delivery-methods.component.scss'],
})
export class DeliveryMethodsComponent implements OnInit {
  first = 0;

  rows = 10;
  representatives: Representative[];
  clonedProducts: { [s: string]: IDeliveryMethod } = {};
  loading: boolean = true;
  contentId: any;
  display=false;
  contentName='';
  header: string;
  popup: boolean;
  activityValues: number[] = [0, 100];
  cols: { field: string; header: string; }[];
  deliveryMethodList: IDeliveryMethod[];
  deliveryTime='';
  id=0;
  price=0;
  shortName='';
  response: any;
  constructor(private productService: ProductService,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'deliveryTime', header: 'Delivery Time' },
      { field: 'shortName', header: 'Short Name' },
      { field: 'price', header: 'Price' },
      { field: 'description', header: 'Description' },
    ];
    this.GetAllDeliveryMethods();
  }

  onRowEditInit(deliveryMethod: any) {
    this.clonedProducts[deliveryMethod.id] = { ...deliveryMethod };
  }

  onRowEditSave(deliveryMethod: any) {
    if (deliveryMethod.id > 0) {
      delete this.clonedProducts[deliveryMethod.id];
      this.productService.AddOrUpdateDeliveryMethod(deliveryMethod).subscribe(
        (res: ResponseModel) => {
          console.log('response from updating type', res);
          if (res.statusCode == 200) {
            this.toastr.success(res.message);
            this.GetAllDeliveryMethods();
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
    this.deliveryMethodList[index] = this.clonedProducts[brand.id];
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
    return this.deliveryMethodList
      ? this.first === this.deliveryMethodList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.deliveryMethodList ? this.first === 0 : true;
  }
  showDialog2(){
    this.popup=true;
    this.header='Add Delivery Method';
  }
  showDialog1(content){
    this.display=true;
    this.header='Delete Delivery Method';
    this.contentName="Are you sure want to delete the "+content.shortName+"?";
    this.contentId=content.id;
  }
  DeleteDeliveryMethod(dlMethodId:any){
    this.productService.DeleteDeliveryMethod(dlMethodId).subscribe(
      (res: any) => {
        console.log('response from deleting product type', res);
        if (res.statusCode == 200) {
          this.GetAllDeliveryMethods();
          this.toastr.success(res.message);
        } else {
          this.GetAllDeliveryMethods();
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
  AddDeliveryMethod(){
    let item;
   item={shortName:this.shortName,deliveryTime:this.deliveryTime,price:Number(this.price)};
    console.log("additem",item);
    this.productService.AddOrUpdateDeliveryMethod(item).subscribe((res:ResponseModel)=>
    {
      this.response=res;
      if(res.statusCode==200){
        this.toastr.success(res.message);
      }
      else{
        this.toastr.error(res.message);
      }
      this.GetAllDeliveryMethods();
      this.popup=false;
      this.deliveryTime='';
      this.price=0;
      this.shortName='';
      console.log("adding or update res",res);
    })
  }
  GetAllDeliveryMethods()
  {
     this.productService.GetAllDeliveryMethods().subscribe((res:IDeliveryMethod[])=>
     {
      this.deliveryMethodList=res;
      console.log("deliverymethods",res)
     });

  }
}
