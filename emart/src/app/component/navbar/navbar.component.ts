import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  constructor(private router: Router) { }

   isSignin: boolean;
   isBuyerOrSeller : boolean;
  ngOnInit(): void {
    if (sessionStorage.getItem('token')){
      this.isSignin = true;
      if (sessionStorage.getItem('user_type') == "0"){
        this.isBuyerOrSeller = true;
      } else {
        this.isBuyerOrSeller = false;
      }
    } else {
      this.isSignin = false;
      this.isBuyerOrSeller = false;
    }
  }

  ngDoCheck(): void {
    console.log('docheck');
    if (sessionStorage.getItem('token')){
      this.isSignin = true;
      if (sessionStorage.getItem('user_type') == "0"){
        this.isBuyerOrSeller = true;
      } else {
        this.isBuyerOrSeller = false;
      }
    } else {
      this.isSignin = false;
      this.isBuyerOrSeller = false;
    }
  }

  signOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem("user_type");
    this.router.navigate(['/sign-in']);
  }
}
