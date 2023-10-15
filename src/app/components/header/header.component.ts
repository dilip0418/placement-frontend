import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  loggedIn = localStorage.getItem('loggedIn');
  logout() {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('jwtToken');
    location.reload();
    this.router.navigate(['/about']);
  }
}
// localStorage.setItem('loggedIn', 'false');
