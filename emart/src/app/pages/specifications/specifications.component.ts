import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { SpecificationsService } from '../../services/specifications.service';
import { Router } from '@angular/router';

interface ProductItemResults {
  id: string;
  price: number;
  details: string;
  sellerUser: string;
  screenResolution: string;
  networkType: string;
  withlength: string;
  memoryStorage: string;
  numOfStockItems : number;
  img1: string,
  img2: string,
  img3: string,
  img4: string
}

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [];

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})
export class SpecificationsComponent implements OnInit {
  id : string
  searchKey : string;
  numbercnt : number;
  searchKeyFlg : boolean = false;
  imgPath : string;
  products: ProductItemResults;
  alerts: Alert[];
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
    private specificationsService: SpecificationsService) {
    
      this.alerts = Array.from(ALERTS);
      routeInfo.queryParams.subscribe(queryParams => {
      if(queryParams!=null){
        this.searchKey = queryParams.searchname;
        this.id = queryParams.id;
      }
    });
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
    if (this.searchKey != null) {this.searchKeyFlg = true;}
    this.numbercnt = 1;
    this.specificationsService.searchbyid(this.id).subscribe(
      data => {
        const info : any = data;
        this.products = info;
        this.imgPath = this.products.img1;
      }
    );
  }

  getPath(value) : void {
    if (value == 1) {this.imgPath = this.products.img1;}
    if (value == 2) {this.imgPath = this.products.img2;}
    if (value == 3) {this.imgPath = this.products.img3;}
    if (value == 4) {this.imgPath = this.products.img4;}
  }

  onSubmit(value: any) {
    this.router.navigate(['/searchresults'], { queryParams: { searchname: value.searchname } });
  }

  checkout(value) : void {
    this.specificationsService.checkout(this.id, value.number).subscribe(
      data => {
        this.alerts = Array.from(ALERTS);
        this.alerts.push({type : 'success', message: 'Payment successful!'});
        this.ngOnInit();
      },
      error => {
        this.alerts = Array.from(ALERTS);
        console.log(error);
        this.alerts.push({type : 'danger', message: error.error.message});
      }
    );
  }

  addToCart(value) : void {
    this.specificationsService.addToCart(this.id, value.number).subscribe(
      data => {
        this.alerts = Array.from(ALERTS);
        this.alerts.push({type : 'success', message: 'Item successfully added to cart!'});
      }
    );
  }

  backTosr() : void {
    this.router.navigate(['/searchresults'], { queryParams: { searchname: this.searchKey } });
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
