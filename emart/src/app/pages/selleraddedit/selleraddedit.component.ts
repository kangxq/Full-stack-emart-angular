import { Component } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { SellerAddEditService } from '../../services/SellerAddEdit.service';
import { Router } from '@angular/router';

interface ItemList {
  value: string;
  name: string;
}

interface ProductItem {
  category: string;
  listCategory : ItemList[];
  subcategory: string;
  listSubcategory:ItemList[];
  itemname: string;
  price: number;
  numOfStockItems: number;
  nwtype: string;
  nwTypeList :ItemList[]; 
  memorystorage: string;
  memoryList:ItemList[]; 
  screenresolution: string;
  weight: string;
  withlength: string;
}
@Component({
  selector: 'app-selleraddedit',
  templateUrl: './selleraddedit.component.html',
  styleUrls: ['./selleraddedit.component.css']
})

export class SellerAddEditComponent {

    id :string;
    product : ProductItem;
  constructor(private router: Router, private routeInfo: ActivatedRoute, 
                private sellerAddEditService: SellerAddEditService) {
    this.routeInfo.queryParams.subscribe(queryParams => {
      if(queryParams!=null){
        this.id = queryParams.id;
      }
    });
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
    if (this.id == undefined) {this.id = '';}
    console.log("id" + this.id);
    this.sellerAddEditService.getProduct(this.id).subscribe(
      data => {
        console.log(JSON.stringify(data));
        const info : any = data;
        this.product = info
      }
    );
  }

  onSubmit(value: any) {
    this.sellerAddEditService.saveProduct(value, this.id).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.router.navigate(['/sellerproduct']);
      }
    );
  }

}
