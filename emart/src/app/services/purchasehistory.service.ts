import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  searchResults() {
    const username = sessionStorage.getItem('user_name');
    return this.http.post(`${environment.baseProductUrl}/emart/purchasehistory` + `?username=${username}`, null, httpOptions);
  }

}
