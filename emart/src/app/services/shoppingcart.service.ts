import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  searchResults() {
    const username = sessionStorage.getItem("user_name");
    return this.http.get(`${environment.baseProductUrl}/emart/shoppingcart/search?username=${username}`, httpOptions);
  }
  saveproduct(value) {
    return this.http.get(`${environment.baseProductUrl}/emart/shoppingcart/save?id=${value.id}&number=${value.number}`, httpOptions);
  }
  deleteproduct(id) {
    return this.http.get(`${environment.baseProductUrl}/emart/shoppingcart/delete?id=${id}`, httpOptions);
  }
  checkout() {
    const username = sessionStorage.getItem("user_name");
    return this.http.get(`${environment.baseProductUrl}/emart/shoppingcart/checkout?username=${username}`, httpOptions);
  }
  applyDiscountOk(code) {
    const username = sessionStorage.getItem("user_name");
    return this.http.get(`${environment.baseProductUrl}/emart/shoppingcart/applyDiscountOk?username=${username}&discountcode=${code}`, httpOptions);
  }
}
