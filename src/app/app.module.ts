import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import { HomeModule } from './home/home.module';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SharedModule} from "./shared/shared.module";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandsComponent } from './dashboard/brands/brands.component';
import { ProductTypesComponent } from './dashboard/product-types/product-types.component';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerService } from './dashboard/customerService';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import { ProductService } from './dashboard/ProductService';
import { DeliveryMethodsComponent } from './dashboard/delivery-methods/delivery-methods.component';
import { ProductsComponent } from './dashboard/products/products.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
import { VendorsComponent } from './dashboard/vendors/vendors.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BrandsComponent,
    ProductTypesComponent,
    DeliveryMethodsComponent,
    ProductsComponent,
    VendorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
    InputTextareaModule,
		ButtonModule,
    InputNumberModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    HomeModule,

    InputTextModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDropdownModule.forRoot()
  ],
  providers: [CustomerService,ProductService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
