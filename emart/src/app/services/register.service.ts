import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Register} from '../models/register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }

  public get currentUserToken(): string {
    return sessionStorage.getItem('token');
  }

  postRegister(value) {
    const user = 
    {
      userName: value.username,
      password: value.password1,
      basicSelect: value.basicSelect,
      emalid: value.emalid,
      mobileNumber: value.mobileNumber,
      companyname: value.companyname,
      gstin: value.gstin,
      briefaboutcompany: value.briefaboutcompany,
      postaladdress: value.postaladdress,
      website: value.website,
      emalidseller: value.emalidseller,
      contactnumber: value.contactnumber
    };

    return this.http.post(`${environment.baseUrl}/emart/register`, JSON.stringify(user), httpOptions);
  }
}
