import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  API_URL = "http://localhost:8080/api/v1/auth";

  loginData = {
    email: '',
    password: '',
    role: 'ROLE_UNIVERSITY'
  };

  isLoggedIn: boolean = false;
  userName: string | null = null;



  constructor(private http: HttpClient, private router: Router) {
    // Check if the user is logged in based on local storage data
    this.isLoggedIn = !!localStorage.getItem('jwtToken');

    // If the user is logged in, retrieve the user's name from local storage
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
    }
  }

  // Define your login method here
  login() {
    // Send the login data to the backend API
    this.http.post(this.API_URL + "/authenticate", this.loginData).subscribe(
      {
        next: (response: any) => {
          const { message, status, data } = response;

          console.log(data);
          if (status == '200' && data) {

            // Handle the response from the backend
            const { id, email, role, token } = data;

            // Store the response in local storage
            localStorage.setItem('userId', id);
            localStorage.setItem('email', email);
            localStorage.setItem('role', role);
            localStorage.setItem('jwtToken', token);

            //TODO: close the modal after successful user login

            // location.reload();

            console.log(data);
            // Determine the role and navigate to the appropriate dashboard
            if (role === 'ROLE_UNIVERSITY') {
              console.log('Inside university-dashboard')
              this.router.navigate(['/university-dashboard']);
            } else if (role === 'ROLE_CORPORATE') {
              console.log('Inside corporate-dashboard')
              this.router.navigate(['/corporate-dashboard']);
            }


          } else {
            alert("Error while logging in" + "\n" + message);
          }
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          // Handle registration errors, e.g., display an error message
        }
      }
    );
  }

  // Define the resetForm method to clear the form fields
  resetForm(form: NgForm) {
    form.resetForm();
  }
}
