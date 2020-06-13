import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, DoCheck {

  constructor(private router: Router) { }

  isBuyer: boolean;
  isSeller : boolean;
  ngOnInit(): void {
    if (sessionStorage.getItem('user_type') == "0"){
      this.isBuyer = true;
    } else if (sessionStorage.getItem('user_type') == "1"){
      this.isSeller = true;
    }else {
      this.isBuyer = false;
      this.isSeller = false;
    }
  }

  ngDoCheck(): void {
    if (sessionStorage.getItem('user_type') == "0"){
      this.isBuyer = true;
    } else if (sessionStorage.getItem('user_type') == "1"){
      this.isSeller = true;
    }else {
      this.isBuyer = false;
      this.isSeller = false;
    }
  }
}
