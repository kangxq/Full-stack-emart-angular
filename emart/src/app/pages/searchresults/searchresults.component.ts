import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { SearchResultsService } from '../../services/searchresults.service';
import { Router } from '@angular/router';


interface ProductItemResults {
  id: string;
  price: number;
  title: string;
  details: string;
  sellerUser: string;
}
interface ItemList {
  value: string;
  name: string;
}
const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})

export class SearchResultsComponent {

  products: ProductItemResults[];
  productsTemp: ProductItemResults[];
  startprice : Number;
  endprice : Number;
  searchKey : String;
  manufacturer : String;
  moredateflg : boolean;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  list : ItemList[];
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
          private searchResultsService: SearchResultsService) {
    
    this.moredateflg = false;

    routeInfo.queryParams.subscribe(queryParams => {
      if(queryParams!=null){
        this.searchKey = queryParams.searchname
      }
    });
    searchResultsService.allSearchResults1(this.searchKey).subscribe(
      data =>{
        const info : any = data;
        this.productsTemp = info;
        console.log(info);
        if (this.productsTemp.length > PAGE_COUNT) {
          this.products = this.productsTemp.slice(0, this.pageCount.valueOf());
          this.moredateflg = true;
        } else {
          this.products = this.productsTemp;
        }
      }
    );

    searchResultsService.allSearchManufacturer().subscribe(
      data =>{
        const info : any = data;
        this.list = info;
      }
    );
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
  }
  
  onSubmit(value: any): void {
    this.searchResultsService.allSearchResults2(value).subscribe(
      data => {
        const info : any = data;
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
  
  reSearch(value: any): void {
    this.searchKey = value.searchname;
    this.startprice = null;
    this.endprice = null;
    this.manufacturer = '';
    this.searchResultsService.allSearchResults1(this.searchKey).subscribe(
      data =>{
        const info : any = data;
        this.productsTemp = info;
        console.log(info);
        if (this.productsTemp.length > PAGE_COUNT) {
          this.products = this.productsTemp.slice(0, this.pageCount.valueOf());
          this.moredateflg = true;
        } else {
          this.products = this.productsTemp;
          this.moredateflg = false;
        }
      }
    );
    this.searchResultsService.allSearchManufacturer().subscribe(
      data =>{
        const info : any = data;
        this.list = info;
      }
    );
  }

  viewDetails(value): void {
    this.router.navigate(['/specifications'], { queryParams: {id: value, searchname: this.searchKey} });
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
