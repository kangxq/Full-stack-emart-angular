import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class SpecificationsHistoryService {

  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  searchbyid(id) {
    return this.http.post(`${environment.baseProductUrl}/emart/specificationshistory/searchbyid` + `?id=${id}`, null, httpOptions);
  }

}
