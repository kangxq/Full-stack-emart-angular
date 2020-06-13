import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  startdate = "";
  enddate = "";
  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  searchResults() {
    const username = sessionStorage.getItem('user_name');
    return this.http.post(`${environment.baseProductUrl}/emart/report/init` + `?username=${username}`, null, httpOptions);
  }
  searchResultsByDate(value) {
    const username = sessionStorage.getItem('user_name');
    if (value.startdate != null) {
       this.startdate = value.startdate.year + '/' + this.leftZero(value.startdate.month) + '/' + this.leftZero(value.startdate.day);
    }
    if (value.enddate != null) {
      this.enddate = value.enddate.year + '/' + this.leftZero(value.enddate.month) + '/' + this.leftZero(value.enddate.day);
    }
    return this.http.post(`${environment.baseProductUrl}/emart/report/search` + `?username=${username}&startdate=${this.startdate}&enddate=${this.enddate}`, null, httpOptions);
  }

  leftZero(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }

  }
}
