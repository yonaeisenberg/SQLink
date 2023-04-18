import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios";

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
    private router: Router
  ) {}

  onSubmit() {
    this.notFound = false;
    this.buttonText = 'Loading...';
    axios.post('https://localhost:7296/User/login', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        this.buttonText = 'Login';
        localStorage.setItem('token', response.data[0].token);
        this.router.navigate(['/info', { 
          name: response.data[0].personalDetails.name,
          team: response.data[0].personalDetails.team,
          joinedAt: response.data[0].personalDetails.joinedAt,
          avatar: response.data[0].personalDetails.avatar,
        }]);
        return response;
      })
      .catch((error) => {
        console.log(error);
        this.buttonText = 'Login';
        this.notFound = true;
      });
  }
}
