import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/* bootstrap 按需导入，可以使我们最终的打包文件更小 */
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TitleComponent } from './component/title/title.component';
import { FooterComponent } from './component/footer/footer.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchResultsComponent } from './pages/searchresults/searchresults.component';
import { PurchaseHistoryComponent } from './pages/purchasehistory/purchasehistory.component';
import { SellerProductComponent } from './pages/sellerproduct/sellerproduct.component';
import { ReportComponent } from './pages/report/report.component';
import { ReportDetailsComponent } from './pages/reportdetails/reportdetails.component';
import { ShoppingCartComponent } from './pages/shoppingcart/shoppingcart.component';
import { SellerAddEditComponent } from './pages/selleraddedit/selleraddedit.component';
import { SpecificationsComponent } from './pages/specifications/specifications.component';
import { SpecificationsHistoryComponent } from './pages/specificationshistory/specificationshistory.component';
import { BuyItemComponent } from './pages/buyitem/buyitem.component';
import { ViewDiscountsComponent } from './pages/viewdiscounts/viewdiscounts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MoneyPipe } from './pipe/money.pipe';
import {JwtInterceptor} from './interceptor/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TitleComponent,
    SignInComponent,
    RegisterComponent,
    SearchComponent,
    SearchResultsComponent,
    PurchaseHistoryComponent,
    SellerProductComponent,
    ReportComponent,
    ReportDetailsComponent,
    ShoppingCartComponent,
    SellerAddEditComponent,
    SpecificationsComponent,
    SpecificationsHistoryComponent,
    BuyItemComponent,
    ViewDiscountsComponent,
    MoneyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  exports: [ReportComponent],
  bootstrap: [AppComponent, ReportComponent]
})
export class AppModule { }
