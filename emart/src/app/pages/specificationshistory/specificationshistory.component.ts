import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { SpecificationsHistoryService } from '../../services/SpecificationsHistory.service';
import { Router } from '@angular/router';

interface ProductItemResults {
  id: string;
  price: number;
  details: string;
  sellerUser: string;
  buydate: string;
  count : number;
  sumAmt : number;
  screenResolution: string;
  networkType: string;
  withlength: string;
  memoryStorage: string;
  img1: string,
  img2: string,
  img3: string,
  img4: string,
}

@Component({
  selector: 'app-specificationshistory',
  templateUrl: './specificationshistory.component.html',
  styleUrls: ['./specificationshistory.component.css']
})
export class SpecificationsHistoryComponent {
  id : string
  searchKey : string;
  imgPath : string;
  products: ProductItemResults;
  
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
          private specificationsHistoryService: SpecificationsHistoryService) {
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
    this.specificationsHistoryService.searchbyid(this.id).subscribe(
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

  backToph() : void {
    this.router.navigate(['/purchasehistory']);
  }
}
