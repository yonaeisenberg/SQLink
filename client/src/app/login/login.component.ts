import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  buttonText: string = 'Login';
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  onSubmit() {
    this.notFound = false;
    this.buttonText = 'Loading...';
    this.apiService.login(this.email, this.password).then((result: boolean) => {
      if (result){
        this.router.navigate(['/info']);
      }
      else {
        this.buttonText = 'Login';
        this.notFound = true;
      }
    })
  }
}
