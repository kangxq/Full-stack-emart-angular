import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [];

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  alerts: Alert[];

  constructor(private userService: UserService, private router: Router) {
    this.reset();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/search']);
    }
  }

  /* 登录操作 */
  onSubmit(value: any) {
    if (this.validInput(value)) {
      this.userService.postSignIn(value).subscribe(
        data => {
          console.log("data:" + JSON.stringify(data));
          const info : any = data;
          if (info.access_token != null) {
            sessionStorage.setItem("token", 'Bearer ' + info.access_token);
            this.userService.getBuyerOrSeller(value).subscribe(
              data => {
                const info : any = data;
                console.log(info);
                sessionStorage.setItem("user_type", info.userType);
                sessionStorage.setItem('user_name', info.userName)
                if (info.userType == "0") {
                  this.router.navigate(['/search']);
                } else {
                  this.router.navigate(['/sellerproduct']);
                }
              }
            );
          } else {
            this.alerts.push({type : 'danger', message: 'username or password error!'});
          }
        },
        error => {
           console.log("error:" + JSON.stringify(error));
          this.alerts.push({type : 'danger', message: 'username or password error!'});
        }
      );
    }
  }
  /* 验证输入项 */
  validInput(value: any): boolean {
    this.reset();
    let result = true
    if (!value.username) {
      this.alerts.push({type : 'danger', message: 'username required!'});
      result = false;
    }

    if (!value.password) {
      this.alerts.push({type : 'danger', message: 'password required!'});
      result =  false;
    }

    if (value.password.length < 3) {
      this.alerts.push({type : 'danger', message: 'password length must be greater than 3!'});
      result =  false;
    }
    return result;
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

}
