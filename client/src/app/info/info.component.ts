import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('token');

    //if no token is in local storage, navigate back to login
    if (!token) {
      this.router.navigate(['/']);
    }
  }
}
