import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor(private http: HttpClient) { 
    
  }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  allSearchResults1(searchname) {
    return this.http.post(`${environment.baseProductUrl}/emart/search/searchbyname`+ `?searchname=${searchname}`, null, httpOptions);
  }
  allSearchManufacturer() {
    return this.http.post(`${environment.baseProductUrl}/emart/search/manufacturer`, null, httpOptions);
  }
  allSearchResults2(value) {
    const data = {
      searchname:value.searchname,
      startprice:value.startprice,
      endprice:value.endprice,
      manufacturer:value.manufacturer
    }
    return this.http.post(`${environment.baseProductUrl}/emart/search/searchbymorekey`,
      JSON.stringify(data),
      httpOptions);
  }

}
