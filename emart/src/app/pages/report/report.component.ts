import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/Report.service';
import { Router } from '@angular/router';

interface ProductItemResults {
  id: string;
  title: string;
  details: string;
  monetofsum: number;
  number: number;
}

const PAGE_COUNT : number = 5;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  products: ProductItemResults[];
  productsTemp: ProductItemResults[];
  startdate : Date;
  enddate : Date;
  startdateS : String;
  enddateS : String;
  moredateflg : boolean;
  pageIndex : Number = 1;
  pageCount : Number = 5;
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
    private reportService: ReportService) {
    
    this.moredateflg = false;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
    console.log(this.startdate);
    console.log(this.enddate);
    console.log(this.startdateS);
    console.log(this.enddateS);
    this.startdateS = "";
    this.enddateS = "";
    this.reportService.searchResults().subscribe(
      data => {
        const info :any = data;
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

  onSubmit(value: any): void {
    this.reportService.searchResultsByDate(value).subscribe(
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

  viewDetails(id, value): void {
    if (value.startdate != null) {
      this.startdateS = value.startdate.year + '/' + this.leftZero(value.startdate.month) + '/' + this.leftZero(value.startdate.day);
    }
    if (value.enddate != null) {
      this.enddateS = value.enddate.year + '/' + this.leftZero(value.enddate.month) + '/' + this.leftZero(value.enddate.day);
    }
    this.router.navigate(['/reportdetails'], { queryParams: {id: id, startdate: this.startdateS, enddate:this.enddateS} });
  }

  leftZero(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
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
