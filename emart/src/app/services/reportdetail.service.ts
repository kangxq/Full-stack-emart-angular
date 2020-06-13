import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class ReportDetailService {
  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }
  
  searchResultsByDate(id, startdate, enddate) {
    const username = sessionStorage.getItem('user_name');
    console.log(startdate);
    console.log(enddate);
    return this.http.post(`${environment.baseProductUrl}/emart/reportdetails/search` + `?id=${id}&username=${username}&startdate=${startdate}&enddate=${enddate}`, null, httpOptions);
  }
}
