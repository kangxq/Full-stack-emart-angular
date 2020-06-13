import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { PurchaseHistoryService } from '../../services/purchasehistory.service';
import { Router } from '@angular/router';

interface ProductItemResults {
  id: string;
  price: number;
  count: number;
  sumAmt: number;
  title: string;
  details: string;
  buydate: string;
}
const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-purchasehistory',
  templateUrl: './purchasehistory.component.html',
  styleUrls: ['./purchasehistory.component.css']
})
export class PurchaseHistoryComponent {

  products: ProductItemResults[];
  productsTemp: ProductItemResults[];
  searchKey : String;
  moredateflg : boolean;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  constructor(private router: Router, private routeInfo: ActivatedRoute, private purchaseHistoryService: PurchaseHistoryService) {
    
    this.moredateflg = false;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
    this.purchaseHistoryService.searchResults().subscribe(
      data => {
        const info :any = data;
        this.productsTemp = info;
        if (this.productsTemp.length > PAGE_COUNT) {
          this.products = this.productsTemp.slice(0, this.pageCount.valueOf());
          this.moredateflg = true;
        } else {
          this.products = this.productsTemp;
          this.moredateflg = false;
        }
      }
    );
  }
  backTosr() : void {
    this.router.navigate(['/search']);
  }

  viewDetails(value): void {
    this.router.navigate(['/specificationshistory'], { queryParams: {id: value, searchname: this.searchKey} });
  }

  dateShowMore(): void {
    this.pageIndex = this.pageIndex.valueOf() + 1;
    if (this.productsTemp.length > PAGE_COUNT*this.pageIndex.valueOf()) {
      this.products = this.productsTemp.slice(0, PAGE_COUNT*this.pageCount.valueOf());
      this.moredateflg = true;
    } else {
      this.products = this.productsTemp;
      this.moredateflg = false;
    }
  }
}
