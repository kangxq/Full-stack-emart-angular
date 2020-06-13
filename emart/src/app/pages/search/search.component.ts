import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  title = 'eMart';

  constructor(private router: Router) {
    //this.reset();
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
    }
  }
  
  onSubmit(value: any) {
    this.router.navigate(['/searchresults'], { queryParams: { searchname: value.searchname } });
  }
}
