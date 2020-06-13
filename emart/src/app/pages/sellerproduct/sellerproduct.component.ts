import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { SellerProductService } from '../../services/SellerProduct.service';
import { Router } from '@angular/router';


interface ProductItemResults {
  id: string;
  price: number;
  title: string;
  details: string;
  number: string;
}
const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-sellerproduct',
  templateUrl: './sellerproduct.component.html',
  styleUrls: ['./sellerproduct.component.css']
})

export class SellerProductComponent {

  products: ProductItemResults[];
  productsTemp: ProductItemResults[];
  moredateflg : boolean;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
          private sellerProductService: SellerProductService) {
    
    this.moredateflg = false;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
    
    this.sellerProductService.searchResults().subscribe(
      data => {
        console.log(data);
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

  addproduct() : void {
    this.router.navigate(['/selleraddedit']);
  }

  editproduct(value): void {
    console.log("value:" + value);
    this.router.navigate(['/selleraddedit'], { queryParams: {id: value} });
  }

  deleteproduct(id): void {
    //sevices
    this.sellerProductService.deleteResults(id).subscribe(
      data => {
        const info : any = data;
        this.productsTemp = info;
        if (this.productsTemp.length > PAGE_COUNT*this.pageIndex.valueOf()) {
          this.products = this.productsTemp.slice(0, PAGE_COUNT*this.pageCount.valueOf());
          this.moredateflg = true;
        } else {
          this.products = this.productsTemp;
          this.moredateflg = false;
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
