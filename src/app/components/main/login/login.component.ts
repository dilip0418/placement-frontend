import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  API_URL = 'http://localhost:8081/api/v1/auth';

  loginData = {
    email: '',
    password: '',
    role: 'ROLE_UNIVERSITY',
  };

  constructor(private http: HttpClient, private router: Router) {}

  // Define your login method here
  login() {
    // Send the login data to the backend API
    this.http.post(this.API_URL + '/authenticate', this.loginData).subscribe({
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
          localStorage.setItem('loggedIn', 'true');

          //TODO: close the modal after successful user login

          // Determine the role and navigate to the appropriate dashboard
          if (role === 'ROLE_UNIVERSITY') {
            console.log('Inside university-dashboard');
            location.reload();
            this.router.navigate(['/university-dashboard']);
          } else if (role === 'ROLE_CORPORATE') {
            location.reload();
            console.log('Inside corporate-dashboard');
            this.router.navigate(['/corporate-dashboard']);
          }
        } else {
          alert('Error while logging in' + '\n' + message);
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        // Handle registration errors, e.g., display an error message
      },
    });
  }

  // Define the resetForm method to clear the form fields
  resetForm(form: NgForm) {
    form.resetForm();
  }
}
