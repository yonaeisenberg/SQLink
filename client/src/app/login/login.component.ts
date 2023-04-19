import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit() {
    // Clear the local storage every time I get to the login page
    localStorage.clear();
  }

  onSubmit() {
    this.notFound = false;
    this.buttonText = 'Loading...';
    //use the apiService to perform the login, gets a boolean indicating success
    this.apiService.login(this.email, this.password).then((result: boolean) => {
      if (result){
        //if successful, navigate to the info page
        this.router.navigate(['/info']);
      }
      else {
        //if not successful, make the notFound flag true to show error
        this.buttonText = 'Login';
        this.notFound = true;
      }
    })
  }
}
