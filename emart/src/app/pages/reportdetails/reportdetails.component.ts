import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { ReportDetailService } from '../../services/ReportDetail.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface ProductItemResults {
  id: string;
  monetofsum: number;
  title: string;
  details: string;
  number: number;
}

const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-reportdetails',
  templateUrl: './reportdetails.component.html',
  styleUrls: ['./reportdetails.component.css']
})
export class ReportDetailsComponent {
  products: ProductItemResults[];
  productsTemp: ProductItemResults[];
  moredateflg : boolean;
  id : string;
  startdate : string;
  enddate : string;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
    private reportDetailService: ReportDetailService, private location: Location) {
    
    this.moredateflg = false;

    routeInfo.queryParams.subscribe(queryParams => {
      if(queryParams!=null){
        this.id = queryParams.id;
        this.startdate = queryParams.startdate;
        this.enddate = queryParams.enddate
      }
    });
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }

    this.reportDetailService.searchResultsByDate(this.id, this.startdate, this.enddate).subscribe(
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
  backClicked() {
    this.location.back();
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
