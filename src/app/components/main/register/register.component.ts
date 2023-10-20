import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // registerForm: NgForm | undefined;
  API_URL = "http://localhost:8080/api/v1/auth";

  registerData = {
    name: '',
    email: '',
    password: '',
    role: 'ROLE_UNIVERSITY', // Set a default value if needed
  };

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    // Send the registration data to the backend API
    this.http.post(this.API_URL + "/register", this.registerData).subscribe(
      {
        next: (response: any) => {
          const { message, status, data } = response;

          console.log(data);
          if (status == '201' && data) {

            // Handle the response from the backend
            const { id, email, role, token } = data;

            // Store the response in local storage
            localStorage.setItem('userId', id);
            localStorage.setItem('email', email);
            localStorage.setItem('role', role);
            localStorage.setItem('jwtToken', token);

            // Determine the role and navigate to the appropriate dashboard
            if (role === 'ROLE_UNIVERSITY') {
              console.log('Inside university-dashboard')
              this.router.navigate(['/university-dashboard']);
            } else if (role === 'ROLE_CORPORATE') {
              console.log('Inside corporate-dashboard')
              this.router.navigate(['/corporate-dashboard']);
            }

          } else {
            console.log(message);
          }
        },
        error: (error: any) => {
          const { message, status, data } = error;
          console.error(message);
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
