import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {SigninGuard} from './guard/signin.guard';
import { RegisterComponent } from '../app/pages/register/register.component';
import { SearchComponent } from '../app/pages/search/search.component';
import { SearchResultsComponent } from '../app/pages/searchresults/searchresults.component';
import { PurchaseHistoryComponent } from '../app/pages/purchasehistory/purchasehistory.component';
import { SellerProductComponent } from '../app/pages/sellerproduct/sellerproduct.component';
import { ReportComponent } from '../app/pages/report/report.component';
import { ReportDetailsComponent } from '../app/pages/reportdetails/reportdetails.component';
import { ShoppingCartComponent } from '../app/pages/shoppingcart/shoppingcart.component';
import { SellerAddEditComponent } from '../app/pages/selleraddedit/selleraddedit.component';
import { SpecificationsComponent } from '../app/pages/specifications/specifications.component';
import { SpecificationsHistoryComponent } from '../app/pages/specificationshistory/specificationshistory.component';
import { BuyItemComponent } from '../app/pages/buyitem/buyitem.component';
import { ViewDiscountsComponent } from '../app/pages/viewdiscounts/viewdiscounts.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },//, canActivate: [SigninGuard]
  { path: 'searchresults', component: SearchResultsComponent },
  { path: 'purchasehistory', component: PurchaseHistoryComponent },
  { path: 'sellerproduct', component: SellerProductComponent },
  { path: 'report', component: ReportComponent },
  { path: 'reportdetails', component: ReportDetailsComponent },
  { path: 'shoppingcart', component: ShoppingCartComponent },
  { path: 'selleraddedit', component: SellerAddEditComponent },
  { path: 'specifications', component: SpecificationsComponent },
  { path: 'specificationshistory', component: SpecificationsHistoryComponent },
  { path: 'buyitem', component: BuyItemComponent },
  { path: 'viewdiscounts', component: ViewDiscountsComponent }
  
];

@NgModule({
  // Registering the RouterModule.forRoot() in the AppModule imports makes the Router service available everywhere in the application.
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
