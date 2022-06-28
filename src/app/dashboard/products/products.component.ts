import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/Model/ResponseModel';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { City } from '../City';
import { ProductService } from '../ProductService';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IBrand } from 'src/app/shared/models/brand';
import { IProductType } from 'src/app/Model/Brands';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  product: any;
  totalCount: number;
  first = 0;
  rows = 10;
  clonedProducts: { [s: string]: IProduct } = {};
  loading: boolean = true;
  productList: any;
  cols: { field: string; header: string }[];
  contentId: any;
  display = false;
  contentName = '';
  header: string;
  popup: boolean;
  productDialog: boolean;
  cities: City[];
  selectedBrandId: number;
  brands: IBrand[];
  selectedProductId: number;
  productTypes: any[];
  files: any;
  uploadedFiles: any[] = [];
  constructor(
    private toastr: ToastrService,
    private productService: ProductService
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  ngOnInit(): void {
    this.GetAllProducts();
    this.GetBrands();
    this.GetProductTypes();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: 'productBrand', header: 'Product Brand' },
      { field: 'productType', header: 'Product Type' },

      // { field: 'email', header: 'Email' },
    ];
  }
  GetProductTypes() {
    this.productService.GetAllProductTypes().subscribe((res) => {
      this.productTypes = res;
      this.selectedProductId = this.productTypes[0].id;
      console.log('Product Types', this.selectedProductId);
    });
  }
  GetBrands() {
    this.productService.GetAllBrands().subscribe((res: IBrand[]) => {
      this.brands = res;
      this.selectedBrandId = this.brands[0].id;
      console.log('brands', this.brands);
    });
  }

  onRowEditInit(product: any) {
    this.clonedProducts[product.id] = { ...product };
  }
  onRowEditSave(product: any) {
    console.log('prod', product);
    if (product.id > 0) {
      delete this.clonedProducts[product.id];
      this.productService.AddOrUpdateProductType(product).subscribe(
        (res: ResponseModel) => {
          console.log('response from updating product', res);
          if (res.statusCode == 200) {
            this.toastr.success(res.message);
            this.GetAllProducts();
          } else {
            this.toastr.error(res.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastr.error('Not Found');
    }
  }
  onRowEditCancel(product: any, index: number) {
    this.productList[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
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
    return this.productList
      ? this.first === this.productList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.productList ? this.first === 0 : true;
  }
  GetAllProducts() {
    this.productService.GetAllProducts().subscribe(
      (response) => {
        console.log('All Products', response);
        this.productList = response;
        //this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  showDialog1(content) {
    this.display = true;
    this.header = 'Delete Product';
    this.contentName = 'Are you sure want to delete the ' + content.name + '?';
    this.contentId = content.id;
  }
  onUpload(event) {
    console.log('event', event);
    let formData = new FormData();
    for (let file of event.files) {
      formData.append('files', file);
      this.uploadedFiles.push(file);
    }
    console.log('upload file', this.uploadedFiles);
    this.productService.upload(formData).subscribe((res) => {
      if (res.fileUrls != '') {
        this.product.pictureUrl = res.fileUrls;
      }
    });
    console.log('call from onUpload method', this.product);
  }
  setBrandId(val: any, val2: any) {
    //this.product.productBrandId=this.selectedBrandId;
    console.log('setBrandId', this.product.productBrandId);
  }
  InitializeProduct() {
    let prod = {
      id: 0,
      name: '',
      description: '',
      pictureUrl: '',
      price: 0.0,
      productType: '',
      productBrand: '',
      productTypeId: this.selectedProductId,
      productBrandId: this.selectedBrandId,
    };
    this.product = prod;
    console.log('Initialize product', this.product);
    this.productDialog = true;
  }
  EditProduct(product:any){
    this.selectedBrandId= product.productBrandId;
    this.selectedProductId=product.productTypeId;
    let prod = {
      id: product.id,
      name: product.name,
      description: product.description,
      pictureUrl: product.pictureUrl,
      price: product.price,
      // productType: '',
      // productBrand: '',
      productTypeId: this.selectedProductId,
      productBrandId:  this.selectedBrandId,
    };

    this.product = prod;
    console.log('Editing product', this.product);
    this.productDialog = true;
  }
  SaveProduct() {
    if(this.product.pictureUrl=='')
    {
      this.toastr.warning("Please Upload Product File");
      return false;
    }
    console.log('going to save product', this.product);
    this.product.productBrandId=this.selectedBrandId;
    this.product.productTypeId=this.selectedProductId;
    this.productService
      .AddOrUpdateProduct(this.product)
      .subscribe((res: ResponseModel) => {
        if (res.statusCode == 200)
        {
          this.toastr.success(res.message);
          this.GetAllProducts();
        } else
        {
          this.GetAllProducts();
          this.toastr.error(res.message);
        }
        console.log('response from server', res);
      });
    this.productDialog = false;
  }
  hideDialog() {}
  DeleteProduct(productId) {
    this.productService.DeleteProduct(productId).subscribe(
      (res: any) => {
        console.log('response from deleting product', res);
        if (res.statusCode == 200) {
          this.toastr.success(res.message);
          this.GetAllProducts();
        } else {
          this.GetAllProducts();
          this.toastr.error(res.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.contentName = '';
    this.contentId = 0;
    this.header = '';
    this.display = false;
  }
}
