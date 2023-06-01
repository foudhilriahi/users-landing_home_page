import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface LoginResponse {
  message: string;
  token: string;
 
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loggedInAs = '';

  constructor(private http: HttpClient, private router: Router) {}
   Login(){}
   Register(){
    this.router.navigate(['/register']);
   }
   Home(){}
  onSubmit(): void {
    const loginData = {
      username: this.username,
      password: this.password
    };

    const endpoint = 'http://localhost:8000/login';

    this.http.post<LoginResponse>(endpoint, loginData).subscribe(
      (response) => {
        console.log("Authenticated: " + response);

        localStorage.setItem('token', response.token);
        
        const decodedToken: any = jwt_decode(response.token);
        const username = decodedToken.username;

        if (decodedToken.roles.includes('ROLE_COMPANY')) {
          const companyId = decodedToken.companyId;
          console.log('Company Username:', username);
          console.log('Company ID:', companyId);
          
          if (companyId) {
            console.log('Company ID (String):', companyId.toString());
            localStorage.setItem('companyId', companyId.toString());
          }
          localStorage.setItem('username', username); // Store the username in local storage

          this.router.navigate(['/company-home']);
        } else {
          this.router.navigate(['/candidate-home']);
          console.log('User Username:', username);
        }
      },
      (error) => {
          alert('PLEASE ENETR VALID INFORMATION OR CONTACT US TO GET YOUR PASSWORD BACK')
        console.log(error);
        // Handle error
      }
    );
  }









  Contact(){

alert("success!! you will go to home page. ")

  } 
}
