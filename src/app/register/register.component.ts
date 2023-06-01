import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registrationType = 'candidate';
  email = '';
  password = '';
  username = ''; // new field for user registration
  name = ''; // new field for company registration
  constructor(private http: HttpClient,private router: Router) { }

  Login(){

    this.router.navigate(['/login']);
  }
  Home(){
   this.router.navigate(['/home']);
  }
  
  onSubmit(): void {
    let endpoint = '';
    let formData = {};
    if (this.registrationType === 'candidate') {
      endpoint = 'http://localhost:8000/api/users';
      formData = {
        email: this.email,
        password: this.password,
        username: this.username
      };
    } else if (this.registrationType === 'company') {
      endpoint = 'http://localhost:8000/api/companies';
      formData = {
        name: this.name,
        password: this.password
      };
    }

   

    this.http.post(endpoint, formData,).subscribe(response => {
      alert('ADDEDD YOU CAN LOG IN NOW!!!!')
      console.log("okkky"+response);
      this.router.navigate(['/login']);

      // handle success
    }, error => {
      console.log("nahhi"+error);
      // handle error
    });
  }

// constructor(private http: HttpClient) {}

// onSubmit(): void {
//   const formData = new FormData();
  
//   if (this.registrationType === 'candidate') {
//     formData.append('email', this.email);
//     formData.append('password', this.password);
//     formData.append('username', this.username);
//   } else if (this.registrationType === 'company') {
//     formData.append('name', this.name);
//     formData.append('password', this.password);
//   }
  
//   const endpoint = this.registrationType === 'candidate' ? 'http://localhost:8000/api/users' : 'http://localhost:8000/api/companies';
  
//   const headers = new HttpHeaders({
//     'Content-Type': 'multipart/form-data',
//   });

//   this.http
//     .post(endpoint, JSON.stringify(headers), { headers })
//     .subscribe(
//       (response) => {
//         console.log("trr"+response);
//         // handle success
//       },
//       (error) => {
//         console.log("tfalse"+error);
//         // handle error
//       }
//     );

// }
}