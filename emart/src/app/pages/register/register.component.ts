import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { UserService } from '../../services/user.service';

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  alerts: Alert[];
  
  showBuyer : Boolean = false;
  showSeller : Boolean = false;

  constructor(private registerService: RegisterService, 
                    private userService: UserService, 
                    private router: Router) {
    this.reset();
  }

  onSubmit(value: any) {
    console.log(value)
    if (this.validInput(value)) {
      this.registerService.postRegister(value).subscribe(
        data => {
          this.router.navigate(['/sign-in']);
        },
        error => {
          this.alerts.push({type : 'danger', message: error.error.message});
        }
      );
    }
  }

  selectBuyerOrSeller(value: any) {
    console.log(value)
    if (value) {
      this.showBuyer = false;
      this.showSeller = true;
    } else {
      this.showBuyer = true;
      this.showSeller = false;
    }
  }

  validInput(value: any): boolean {
    this.reset();
    let result = true
    if (!value.username) {
      this.alerts.push({type : 'danger', message: 'username required!'});
      result = false;
    }

    if (!value.password1) {
      this.alerts.push({type : 'danger', message: 'password required!'});
      result =  false;
    }

    if (!value.password2) {
      this.alerts.push({type : 'danger', message: 'confirm password required!'});
      result =  false;
    }

    if (value.password1 != value.password2) {
      this.alerts.push({type : 'danger', message: 'the two passwords are different!'});
      result =  false;
    }

    if (value.password1.length < 6) {
      this.alerts.push({type : 'danger', message: 'password length must be greater than 6!'});
      result =  false;
    }

    if (value.basicSelect != "0" && value.basicSelect != "1" ) {
      this.alerts.push({type : 'danger', message: 'buyer or seller must be selected!'});
      result =  false;
    }

    if (value.basicSelect == "0") {
      if (!value.emalid) {
        this.alerts.push({type : 'danger', message: 'email id required!'});
        result =  false;
      }
      if (!value.mobileNumber) {
        this.alerts.push({type : 'danger', message: 'mobile number required!'});
        result =  false;
      }
    }

    if (value.basicSelect == "1") {
      if (!value.companyname) {
        this.alerts.push({type : 'danger', message: 'company name required!'});
        result =  false;
      }
      if (!value.gstin) {
        this.alerts.push({type : 'danger', message: 'gstin required!'});
        result =  false;
      }
      if (!value.briefaboutcompany) {
        this.alerts.push({type : 'danger', message: 'brief about company required!'});
        result =  false;
      }
      if (!value.postaladdress) {
        this.alerts.push({type : 'danger', message: 'postal address required!'});
        result =  false;
      }
      if (!value.website) {
        this.alerts.push({type : 'danger', message: 'website required!'});
        result =  false;
      }
      if (!value.emalidseller) {
        this.alerts.push({type : 'danger', message: 'email id required!'});
        result =  false;
      }
      if (!value.contactnumber) {
        this.alerts.push({type : 'danger', message: 'contact number required!'});
        result =  false;
      }
    }
    if (value.agree != true) {
      this.alerts.push({type : 'danger', message: 'user agreement required!'});
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
