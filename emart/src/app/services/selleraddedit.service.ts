import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/Product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class SellerAddEditService {

  product : Product;

  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  getProduct(value) {
    return this.http.post(`${environment.baseProductUrl}/emart/selleraddedit/getproduct` + `?id=${value}`, null, httpOptions);
  }

  saveProduct(value, id) {
    const product = {
      id : id,
      category:value.category,
      subcategory:value.subcategory,
      itemname:value.itemname,
      price:value.price,
      numOfStockItems:value.numOfStockItems,
      nwtype:value.nwtype,
      memorystorage:value.memorystorage,
      screenresolution:value.screenresolution,
      weight:value.weight,
      withlength:value.withlength,
      userName : sessionStorage.getItem('user_name')
    }
    console.log("id" + id);
    console.log(JSON.stringify(product));
    return this.http.post(`${environment.baseProductUrl}/emart/selleraddedit/saveproduct`, JSON.stringify(product), httpOptions);
  }
}
