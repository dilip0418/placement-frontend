import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  userName: string | null = null;
  // router: any;

  constructor() {
    // Check if the user is logged in based on local storage data
    this.isLoggedIn = !!localStorage.getItem('jwtToken');

    // If the user is logged in, retrieve the user's name from local storage
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
    }
    // this.router.reload();
  }


  // Add the logout method
  logout() {
    // Clear user data from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('collegeId');
    
    // localStorage.removeItem('userName'); // Remove user name if you store it

    // Set the user as logged out
    this.isLoggedIn = false;

    // Redirect to the home page or another desired page
    window.location.href = '';
  }


}
