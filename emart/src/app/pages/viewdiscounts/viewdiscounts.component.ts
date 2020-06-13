import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { WiewSiscountsService } from '../../services/viewdiscounts.service';
import { Router } from '@angular/router';


interface ProductItemResults {
  code:string;
  title: string;
  number: number;
}
const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-viewdiscounts',
  templateUrl: './viewdiscounts.component.html',
  styleUrls: ['./viewdiscounts.component.css']
})

export class ViewDiscountsComponent {

  products: any;
  productsTemp: any;
  moredateflg : boolean;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
    private siewSiscountsService: WiewSiscountsService) {
    
    this.moredateflg = false;

  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
    this.siewSiscountsService.searchResults().subscribe(
      data => {
        const info : any = data;
        this.productsTemp = info;
        if (this.productsTemp.length > PAGE_COUNT) {
          this.products = this.productsTemp.slice(0, this.pageCount.valueOf());
          this.moredateflg = true;
        } else {
          this.products = this.productsTemp;
        }
      }
    );
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
