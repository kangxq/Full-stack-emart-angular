import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';


interface ProductItemResults {
  id: string;
  price: number;
  title: string;
  details: string;
  sellerUser: string;
}
const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-buyitem',
  templateUrl: './buyitem.component.html',
  styleUrls: ['./buyitem.component.css']
})

export class BuyItemComponent {

  products: ProductItemResults[];
  productsTemp: ProductItemResults[];
  moredateflg : boolean;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  constructor(private router: Router, private routeInfo: ActivatedRoute, private searchService: SearchService) {
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
        
    this.moredateflg = false;
    this.searchService.searchResults().subscribe(
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

  viewDetails(value): void {
    this.router.navigate(['/specifications'], { queryParams: {id: value} });
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
