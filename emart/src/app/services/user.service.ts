import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

const username = 'cloudsimpleservice';
const password = 'mysecret';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ':' + password) })
};
// const httpOptions = {
//   headers: new HttpHeaders().set('Content-Type', 'application/json')
//   .set('Content-Type', 'application/x-www-form-urlencoded')
//   .set('Authorization', 'Basic ' + btoa(username + ':' + password))
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : User;

  constructor(private http: HttpClient) { }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  postSignIn(value) {
    return this.http.post(`${environment.baseTokenUrl}/auth/oauth/token` + `?grant_type=password&scope=mobileclient&username=${value.username}&password=${value.password}`, null, httpOptions);
  }

  getBuyerOrSeller(value) {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') })
    };
    console.log("aaa:" + httpOptions1.headers.get("Authorization"));
    return this.http.post(`${environment.baseUserUrl}/emart/login` + `?userName=${value.username}`, null, httpOptions1);
  }
}
