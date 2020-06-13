import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { ShoppingCartService } from '../../services/ShoppingCart.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

interface ProductItemResults {
  totalTax: number;
  totalPrice: number;
  viewFlag : boolean;
  productList : ProductItem[];
}

interface ProductItem {
  id: string;
  price: number;
  title: string;
  details: string;
  number: string;
  numberEdit : boolean;
}

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [];

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingCartComponent {

  products: ProductItem[];
  totalTax : any;
  totalPrice : any;
  totalSumPrice : any;
  totalPricesub : any;
  priceTemp : string;
  disflg : boolean;
  viewFlag : boolean;
  closeResult : any;
  discountCode : string;
  alerts: Alert[];
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
          private shoppingCartService: ShoppingCartService,
          private modalService: NgbModal) {
            this.alerts = Array.from(ALERTS);
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }

    this.shoppingCartService.searchResults().subscribe(
      data => {
        const info : any = data;
        console.log(info);
        if (info.viewFlag) {
          this.viewFlag = true;
          this.products = info.productList;
          this.totalSumPrice = info.totalPrice;
          this.totalPrice = this.totalSumPrice;
          this.priceTemp = (this.totalPrice*0.1).toString();
          if (this.priceTemp.indexOf(".") > 0) {
            this.priceTemp = this.priceTemp.substr(0,this.priceTemp.indexOf("."))
          }
          this.totalTax = this.priceTemp;
          this.totalPricesub = 0;
          this.disflg = false;
        } else {
          this.viewFlag = false;
        }
      }
    );
  }

  backToSearch(): void {
    this.router.navigate(['/search']);
  }

  editproduct(value : ProductItem) : void {
    value.numberEdit = true;
  }

  saveproduct(value : ProductItem) : void {
    this.shoppingCartService.saveproduct(value).subscribe(
      data => {
        this.alerts = Array.from(ALERTS);
        this.ngOnInit();
      },
      error => {
        this.alerts = Array.from(ALERTS);
        this.alerts.push({type : 'danger', message: error.error.message});
      }
    );
  }

  deleteproduct(id): void {
    this.shoppingCartService.deleteproduct(id).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  checkout(): void {
    this.shoppingCartService.checkout().subscribe(
      data => {
        this.alerts = Array.from(ALERTS);
        this.alerts.push({type : 'success', message: 'Payment successful!'});
        this.ngOnInit();
      }
    );
  }

  applyDiscount(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
    }, (reason) => {
      this.closeResult = `${reason}`;
    });
  }

  applyDiscountOk(modal): void{
    modal.close();
    console.log(this.discountCode);
    if (this.discountCode != null && this.discountCode != '') {
      this.shoppingCartService.applyDiscountOk(this.discountCode).subscribe(
        data => {
          const info : any = data;
          this.priceTemp = (this.totalSumPrice*(100-info)/100).toString();
          if (this.priceTemp.indexOf(".") > 0) {
            this.priceTemp = this.priceTemp.substr(0,this.priceTemp.indexOf("."))
          }
          this.totalPricesub = this.priceTemp;
          this.totalPrice = this.totalSumPrice - this.totalPricesub;
          this.priceTemp = (this.totalPrice*0.1).toString();
          if (this.priceTemp.indexOf(".") > 0) {
            this.priceTemp = this.priceTemp.substr(0,this.priceTemp.indexOf("."))
          }
          this.totalTax = this.priceTemp;
          this.disflg = true;
        },
        error => {
          this.alerts = Array.from(ALERTS);
          this.alerts.push({type : 'danger', message: error.error.message});
        }
      );
    } else {
      this.totalPrice = this.totalSumPrice
      this.priceTemp = (this.totalPrice*0.1).toString();
      if (this.priceTemp.indexOf(".") > 0) {
        this.priceTemp = this.priceTemp.substr(0,this.priceTemp.indexOf("."))
      }
      this.totalTax = this.priceTemp;
      this.totalPricesub = 0;
      this.disflg = false;
    }
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
