import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

interface value {
  id : string;
  number: number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {

  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  searchbyid(id : string) {
    return this.http.post(`${environment.baseProductUrl}/emart/specifications/searchbyid` + `?id=${id}`, null, httpOptions);
  }
  checkout(id : string, number:number) {
    const username = sessionStorage.getItem("user_name");
    return this.http.post(`${environment.baseProductUrl}/emart/specifications/checkout` + `?id=${id}&number=${number}&username=${username}`, null, httpOptions);
  }
  addToCart(id : string, number:number) {
    const username = sessionStorage.getItem("user_name");
    return this.http.post(`${environment.baseProductUrl}/emart/specifications/addtocart` + `?id=${id}&number=${number}&username=${username}`, null, httpOptions);
  }
}
